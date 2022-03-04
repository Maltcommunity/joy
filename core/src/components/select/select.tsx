import {Component, Element, h, Host, Listen, Prop, State} from '@stencil/core';
import {renderSelectOutsideShadowRoot} from '../../utils';

@Component({
    tag: 'joy-select',
    styleUrl: 'select.scss',
    shadow: true,
})
export class Select {
    private nextOption!: HTMLJoySelectOptionElement;
    private fallbackPlaceholder = '-';

    @Element() el!: HTMLJoySelectElement;

    @Prop() disabled = false;
    @Prop() invalid = false;
    @Prop() name = 'select';
    @Prop({mutable: true, reflect: true}) value = '';
    @Prop() required = false;

    @State() open = false;
    @State() selectedLabel!: string;
    private options: Array<HTMLJoySelectOptionElement> = [];

    @Listen('change')
    handleChange(event: Event & {target: HTMLElement}) {
        const target = event.target;
        if (target?.tagName === 'SELECT') {
            this.onChangeNativeSelect(event);
        }
    }

    @Listen('mousedown', {})
    handleClick(event: MouseEvent & {target: HTMLElement | HTMLJoySelectOptionElement}) {
        const target = event.target;
        if (target?.tagName === 'JOY-SELECT') {
            if (!this.isMobileDevice()) {
                this.open = !this.open;
            }
        }

        if (target.tagName === 'JOY-SELECT-OPTION') {
            const typedTarget = target as HTMLJoySelectOptionElement;
            this.value = typedTarget.value;
            this.selectOption(typedTarget);
            this.setSelectText();
            this.open = false;
        }
    }

    @Listen('keydown', {target: 'document'})
    onKeydown(ev: KeyboardEvent & {target: Element}) {
        if (ev.target && !this.el.contains(ev.target)) {
            return;
        }

        const optionsAllowed = this.options.filter((option: HTMLJoySelectOptionElement) => !option.disabled);
        // Only move the option if the current focus is in the option group
        const indexSelected = optionsAllowed.findIndex((option) => option.selected) || 0;

        // If hitting arrow down or arrow right, move to the next option
        // If we're on the last option, move to the first option
        if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
            this.nextOption = indexSelected === optionsAllowed.length - 1 ? optionsAllowed[0] : optionsAllowed[indexSelected + 1];
        }

        // If hitting arrow up or arrow left, move to the previous option
        // If we're on the first option, move to the last option
        if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
            ev.preventDefault();
            ev.stopPropagation();
            this.nextOption = indexSelected <= 0 ? optionsAllowed[optionsAllowed.length - 1] : optionsAllowed[indexSelected - 1];
        }

        if (ev.code === 'Enter' && this.open && this.value) {
            this.open = false;
        }

        if (ev.code === 'Space' && !this.open) {
            this.open = true;
        }
        if (this.nextOption && optionsAllowed.includes(this.nextOption)) {
            ev.preventDefault();
            ev.stopPropagation();
            this.selectOption(this.nextOption);
            this.value = this.nextOption.value;
            this.setSelectText();
        }
    }

    private selectOption(option: HTMLJoySelectOptionElement) {
        this.options.map((option) => option.removeAttribute('selected'));
        option.setAttribute('selected', 'true');
    }

    private getJoyOptionsElements(): Array<HTMLJoySelectOptionElement> {
        return Array.from(this.el.querySelectorAll('joy-select-option'));
    }

    private generatePlaceholder(): void {
        if (!this.value) {
            const defaultPlaceholder = this.options.filter((option) => option.disabled);

            if (!defaultPlaceholder[0]) {
                this.selectedLabel = this.fallbackPlaceholder;
                return;
            }

            this.selectedLabel = defaultPlaceholder[0].textContent || this.fallbackPlaceholder;
        }
    }

    private setSelectText(): void {
        const selectedOption = this.options.find((option) => option.value === this.value);

        if (!selectedOption) {
            return;
        }

        this.selectedLabel = selectedOption.textContent || this.fallbackPlaceholder;
    }

    private onBlur = () => {
        this.open = false;
    };

    private onChangeNativeSelect = (ev: Event) => {
        if (!ev || !ev.target) {
            return;
        }

        this.value = (ev.target as HTMLSelectElement).value;
        this.setSelectText();
    };

    private isMobileDevice(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    private syncOptionsToSelectValue() {
        const optionToBeSelected = this.options.find((option) => option.value === this.value);
        if (optionToBeSelected) {
            this.selectOption(optionToBeSelected);
        }
    }

    private refreshSelectValue() {
        const optionSelected = this.options.filter((option) => !option.disabled).find((option) => option.selected);
        if (optionSelected) {
            this.value = optionSelected && optionSelected.value;
        }
    }

    connectedCallback() {
        // Get all options inside of the option group and then
        // filter out disabled options since we need to skip those
        this.options = this.getJoyOptionsElements();

        if (this.value) {
            this.syncOptionsToSelectValue();
        } else {
            this.refreshSelectValue();
        }
        this.generatePlaceholder();
        this.setSelectText();
    }

    render() {
        renderSelectOutsideShadowRoot(this.el, this.name, `${this.value}`, this.disabled, this.required, this.options);

        return (
            <Host
                class={{
                    'joy-select': true,
                    'joy-select_invalid': this.invalid,
                    'joy-select_open': this.open,
                    'joy-select_native': this.isMobileDevice(),
                }}
                tabindex="0"
                aria-disabled={this.disabled}
                aria-invalid={this.invalid}
                onBlur={this.onBlur}
            >
                <div class="joy-select__input">
                    <span>{this.selectedLabel}</span>
                    <joy-icon name="chevron-down" color="grey"></joy-icon>
                </div>
                <div class="joy-select__options" hidden={!this.open} tabindex="1">
                    <slot />
                </div>
                <slot name="native-select" />
            </Host>
        );
    }
}
