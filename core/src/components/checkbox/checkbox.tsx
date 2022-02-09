import {Component, Prop, h, Element, Event, EventEmitter, Host, Method} from '@stencil/core';
import {renderInputOutsideShadowRoot, generatedInputNameAndId} from '../../utils';

@Component({
    tag: 'joy-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: true,
})
export class Checkbox {
    @Element() el!: HTMLJoyCheckboxElement;

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

    private onClick = () => {
        /**
         * As the the actual checkbox is hidden is order to style the toggle
         * We can't change it's value with default behavior, so we simply bind its checked attribute to our component Prop value
         */
        if (!this.disabled) {
            this.checked = !this.checked;
            this.value = `${this.checked}`;
            this.joyCheckboxChange.emit(this.checked);
        }
    };

    render() {
        /**
         * here for third param, we don't want to return 'false' as a string, as it will set value="false" that can be
         * considered as an actual value. We prefer setting an empty value
         */
        renderInputOutsideShadowRoot(this.el, this.name, `${this.checked}`, this.disabled);

        return (
            <Host>
                <label
                    class={{
                        'joy-checkbox': true,
                        'joy-checkbox__checked': this.checked,
                        'joy-checkbox__disabled': this.disabled,
                    }}
                    onClick={this.onClick}
                    htmlFor={this.name || generatedInputNameAndId(this.el)}
                >
                    <input
                        type="checkbox"
                        class="joy-checkbox__input"
                        role="checkbox"
                        disabled={this.disabled}
                        checked={this.checked}
                        aria-checked={`${this.checked}`}
                    />
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
