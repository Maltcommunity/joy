import {Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch} from '@stencil/core';
import {renderInputOutsideShadowRoot, dispatchEvent, createBackDrop, preventBodyScroll, destroyBackdrop} from '../../utils';

@Component({
    tag: 'joy-select',
    styleUrl: 'select.scss',
    shadow: true,
})
export class Select {
    private nextOption!: HTMLJoySelectOptionElement | null;
    private innerOptions!: HTMLElement;
    private fallbackPlaceholder = '-';
    private get optionsElements(): Array<HTMLJoySelectOptionElement> {
        return Array.from(this.el.querySelectorAll('joy-select-option'));
    }

    @Element() el!: HTMLJoySelectElement;

    /** Pick an icon displayed before the label. **/
    @Prop() icon?: string;
    /** Disabled state. **/
    @Prop() disabled = false;
    /** Invalid state. **/
    @Prop({mutable: true}) invalid = false;
    /** Invalid state message. **/
    @Prop() invalidMessage = 'Field is required';
    /** Select name attribute to be found by parent form. **/
    @Prop() name = 'select';
    /** Select actual value. **/
    @Prop({mutable: true, reflect: true}) value = '';
    /** Mandatory or not. **/
    @Prop() required = false;
    /** By default, the dropdown is closed if you focusout the select. For debugging purpose or specific behavior, you can toggle off this option. **/
    @Prop() closeOnBlur = true;

    @State() open = false;
    @State() selectedLabel!: string;

    @Event() valueChange!: EventEmitter<{value: string}>;

    @Watch('value')
    watchValue(newValue: string) {
        this.createPlaceholder();
        const selected = this.optionsElements.find((option) => option.value === newValue);

        if (selected) {
            this.selectOption(selected);
        }
    }

    @Listen('backdropClick', {target: 'document'})
    backdropClick(event: CustomEvent) {
        if (event.detail !== 'select') {
            return;
        }

        this.open = false;
        destroyBackdrop();
    }

    @Listen('click', {target: 'document'})
    handleClick(event: MouseEvent & {target: HTMLElement | HTMLJoySelectOptionElement}) {
        const target = event.target;

        if (this.disabled || !this.el.contains(event.target)) {
            return;
        }

        if (target?.tagName === 'JOY-SELECT') {
            this.open = !this.open;
            this.createMobileOptionsView();
        }

        if (target.tagName === 'JOY-SELECT-OPTION') {
            const typedTarget = target as HTMLJoySelectOptionElement;
            if (!typedTarget.disabled) {
                this.value = typedTarget.value;
                this.selectOption(typedTarget);
                this.open = false;
                this.invalid = false;
                this.emitValueChangeEvent();
                this.destroyMobileOptionsView();
            }
        }
    }

    /**
     * *******************************
     * KEYBOARD EVENTS HANDLERS
     * *******************************
     */

    @Listen('keydown', {target: 'document'})
    onKeydown(ev: KeyboardEvent & {target: Element}) {
        if ((ev.target && !this.el.contains(ev.target)) || ev.target.tagName === 'JOY-FORM-ERROR') {
            return;
        }

        const optionsAllowed = this.optionsElements.filter((option: HTMLJoySelectOptionElement) => !option.disabled);
        // Only move the option if the current focus is in the option group
        const indexSelected = optionsAllowed.findIndex((option) => option.selected) || 0;

        this.navigateInOptions(ev, optionsAllowed, indexSelected);
        this.toggleOptionsDropdown(ev);

        if (ev.code === 'Enter' && this.open && this.value) {
            this.open = false;
            this.emitValueChangeEvent();
        }

        if (ev.code === 'Tab') {
            this.nextOption = null;
        }

        if (this.nextOption && optionsAllowed.includes(this.nextOption)) {
            ev.preventDefault();
            ev.stopPropagation();
            this.selectOption(this.nextOption);
            this.value = this.nextOption.value;
        }
    }

    private navigateInOptions(ev: KeyboardEvent, optionsAllowed: HTMLJoySelectOptionElement[], indexSelected: number) {
        if (['ArrowDown'].includes(ev.code)) {
            if (indexSelected !== optionsAllowed.length - 1) {
                this.nextOption = optionsAllowed[indexSelected + 1];
                this.triggerOptionsWrapperScroll(this.nextOption);
            }
        }

        if (['ArrowUp'].includes(ev.code)) {
            if (indexSelected !== 0) {
                this.nextOption = optionsAllowed[indexSelected - 1];
                this.triggerOptionsWrapperScroll(this.nextOption, false);
            }
        }
    }

    private toggleOptionsDropdown(ev: KeyboardEvent) {
        if (ev.code === 'Space') {
            ev.preventDefault();
            this.open = !this.open;
        }
    }
    /**
     * *******************************
     * END OF KEYBOARD EVENTS HANDLERS
     * *******************************
     */

    /**
     * ***************************************
     * PLACEHOLDER AND VALUE DISPLAY UTILITIES
     * ***************************************
     */
    private createPlaceholder(): void {
        if (!this.value) {
            const defaultPlaceholder = this.optionsElements.find((option) => option.disabled);

            if (!defaultPlaceholder) {
                this.selectedLabel = this.fallbackPlaceholder;
                return;
            }

            this.selectedLabel = defaultPlaceholder.textContent || this.fallbackPlaceholder;
        }
    }

    private setSelectText(): void {
        const selectedOption = this.optionsElements.find((option) => option.value === this.value);

        if (!selectedOption) {
            return;
        }

        this.selectedLabel = selectedOption.textContent || this.fallbackPlaceholder;
    }
    /**
     * ***************************************
     * END OF PLACEHOLDER AND VALUE DISPLAY UTILITIES
     * ***************************************
     */

    /**
     * ******************************
     * MOBILE DEVICE UTILITIES
     * ******************************
     */
    private get isMobileDevice(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    private createMobileOptionsView() {
        if (!this.isMobileDevice) {
            return;
        }

        createBackDrop('select').then(() => preventBodyScroll(true));
    }

    private destroyMobileOptionsView() {
        if (!this.isMobileDevice) {
            return;
        }

        destroyBackdrop();
        preventBodyScroll(false);
    }
    /**
     * ******************************
     * END OF MOBILE DEVICE UTILITIES
     * ******************************
     */

    private emitValueChangeEvent() {
        this.valueChange.emit({value: this.value});
        /** As we don't have a native select, we trigger a fake change event, mocking the native one **/
        dispatchEvent(this.el, 'change', {value: this.value});
    }

    private triggerOptionsWrapperScroll(option: HTMLJoySelectOptionElement, increase = true) {
        const scrollable = this.innerOptions.scrollHeight > this.innerOptions.clientHeight;
        if (scrollable) {
            const height = option.offsetHeight;
            increase ? (this.innerOptions.scrollTop += height) : (this.innerOptions.scrollTop -= height);
        }
    }

    private selectOption(option: HTMLJoySelectOptionElement) {
        this.optionsElements.map((option) => option.removeAttribute('selected'));
        option.setAttribute('selected', 'true');
        this.setSelectText();
    }

    private onBlur = () => {
        if (this.closeOnBlur) {
            this.open = false;
        }
    };

    connectedCallback() {
        this.createPlaceholder();
        this.setSelectText();
    }

    render() {
        renderInputOutsideShadowRoot(this.el, this.name, `${this.value}`, this.disabled, this.required);

        return (
            <Host
                class={{
                    'joy-select': true,
                    'joy-select--disabled': this.disabled,
                    'joy-select--invalid': this.invalid,
                    'joy-select--open': this.open,
                }}
                tabindex={!this.disabled && 0}
                aria-disabled={this.disabled}
                aria-invalid={this.invalid}
                onBlur={this.onBlur}
            >
                <div class="joy-select--wrapper">
                    <div
                        class={{
                            'joy-select__input': true,
                            'joy-select__input--open': this.open,
                            'joy-select__input--filled': !!this.value,
                            'joy-select__input--disabled': this.disabled,
                            'joy-select__input--with-icon': !!this.icon,
                            'joy-select__input-mobile': this.isMobileDevice,
                        }}
                    >
                        {this.icon && <joy-icon name={this.icon} class="joy-select__decorative-icon" />}
                        <span class="joy-select__input-placeholder">{this.selectedLabel}</span>
                        <joy-icon class="joy-select__chevron" name="chevron-down" />
                        <div class="joy-select__options">
                            <div class="joy-select__options-inner" ref={(el) => (this.innerOptions = el as HTMLElement)}>
                                <slot />
                            </div>
                        </div>
                    </div>
                    <div class="joy-select--form-error">{this.invalid && <joy-form-error no-html-error-text={this.invalidMessage} />}</div>
                </div>
            </Host>
        );
    }
}
