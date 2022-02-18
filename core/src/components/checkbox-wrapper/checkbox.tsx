import {Component, Prop, h, Element, Event, EventEmitter, Host, Method, Listen, State} from '@stencil/core';
import {renderInputOutsideShadowRoot, generatedInputNameAndId} from '../../utils';

@Component({
    tag: 'joy-checkbox-wrapper',
    styleUrl: 'checkbox.scss',
    shadow: true,
})
export class Checkbox {
    private lightDomInput?: HTMLInputElement | null;
    @Element() el!: HTMLJoyCheckboxElement;

    @State() focus = false

    /** Input value. TODO : check if we really need it as we use a checkbox system */
    @Prop({mutable: true}) value?: string;

    /** It will be applied as the hidden input name attribute (for the actual form) */
    @Prop() name = '';

    /** Disabled state */
    @Prop({reflect: true}) disabled = false;

    /** Checkbox activated or not */
    @Prop({mutable: true, reflect: true}) checked = false;

    /** Clicking on the component will fire this customEvent. use @joyCheckboxChange in Vue apps, and onJoyCheckboxChange for plain JavaScript. */
    @Event() joyCheckboxChange!: EventEmitter<boolean>;

    /**
     * Update checkbox value from outside the component
     * @param {Boolean} newValue true or false...
     */
    @Method()
    async updateValue(newValue: boolean): Promise<void> {
        this.value = `${newValue}`;
        this.checked = newValue;
    }

    @Listen('focus', {target: 'document', capture: true})
    setFocus(ev: Event) {
        console.log(ev)
        const input = this.el.querySelector('input');

        if (!input) {
            return;
        }

        if (input === ev.target) {
            this.focus = true;
        }
    }

    @Listen('focusout', {target: 'document', capture: true})
    setFocusOut(ev: Event) {
        const input = this.el.querySelector('input');

        if (!input) {
            return;
        }

        if (input === ev.target) {
            this.focus = false;
        }
    }

    private onClick = (ev: Event) => {
        /**
         * As the the actual checkbox is hidden is order to style the toggle
         * We can't change it's value with default behavior, so we simply bind its checked attribute to our component Prop value
         */

        if (ev.target === this.lightDomInput && this.disabled) {
            ev.preventDefault();
            return;
        }

        if (!this.disabled) {
            this.checked = !this.checked;
            // this.value = `${this.checked}`;
            if (ev.target !== this.lightDomInput) {
                this.lightDomInput!.checked = !this.lightDomInput!.checked;
            }

            this.joyCheckboxChange.emit(this.checked);
        }
    };

    private onFocus = () => this.focus = true;
    private onBlur = () => this.focus = false;

    connectedCallback() {
        this.lightDomInput = this.el.querySelector('input');
        this.value = this.value || this.lightDomInput?.value;

        if (!this.lightDomInput) {
            return;
        }

        // this.lightDomInput.addEventListener('change', () => {
        //    this.checked = this.lightDomInput?.checked || false;
        // });
        this.checked = this.lightDomInput?.checked || this.lightDomInput.value === 'true' || false;
    }

    render() {
        /**
         * here for third param, we don't want to return 'false' as a string, as it will set value="false" that can be
         * considered as an actual value. We prefer setting an empty value
         */

        renderInputOutsideShadowRoot(this.el, this.name, `${this.value}`, this.disabled);

        return (
            <Host>
                <label
                    class={{
                        'joy-checkbox': true,
                        'joy-checkbox__checked': this.checked,
                        'joy-checkbox__disabled': this.disabled,
                        'joy-checkbox__focus': this.focus,
                    }}
                    onClick={this.onClick}
                    htmlFor={this.name || generatedInputNameAndId(this.el)}
                >
                    <slot name="checkbox-input">
                        <input
                            type="checkbox"
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            class="joy-checkbox__input"
                            role="checkbox"
                            disabled={this.disabled}
                            checked={this.checked}
                            aria-checked={`${this.checked}`}
                        />
                    </slot>
                    <div class="joy-checkbox__wrapper">
                        <slot />
                        <div class="joy-checkbox__content">
                            <slot name="checkbox-content" />
                        </div>
                    </div>
                </label>
            </Host>
        );
    }
}
