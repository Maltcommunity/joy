import {Component, Prop, h, Element, Event, EventEmitter, Host, Method} from '@stencil/core';
import {renderInputOutsideShadowRoot, generatedInputNameAndId} from '../../utils';

@Component({
    tag: 'joy-toggle',
    styleUrl: 'toggle.scss',
    shadow: true,
})
export class Toggle {
    @Element() el!: HTMLJoyToggleElement;

    /** Input value. TODO : check if we really need it as we use a checkbox system */
    @Prop({mutable: true}) value?: string;

    /** It will be applied as the hidden input name attribute (for the actual form) */
    @Prop() name = '';

    /** Disabled state */
    @Prop({reflect: true}) disabled = false;

    /** Toggle activated or not */
    @Prop({mutable: true, reflect: true}) checked = false;

    /** Clicking on the component will fire this customEvent. */
    @Event({eventName: 'joy-toggle-change'}) joyToggleChange!: EventEmitter<boolean>;

    /** Clicking on the component will fire this customEvent. */
    @Event({eventName: 'value-change'}) valueChange!: EventEmitter<boolean>;

    /**
     * Update toggle value from outside the component
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
            this.valueChange.emit(this.checked);
            this.joyToggleChange.emit(this.checked);
        }
    };

    render() {
        /**
         * here for third param, we don't want to return 'false' as a string, as it will set value="false" that can be
         * considered as an actual value. We prefer setting an empty value
         */
        renderInputOutsideShadowRoot(this.el, this.name, this.checked ? `${this.checked}` : '', this.disabled);

        return (
            <Host>
                <label
                    class={{
                        'joy-toggle': true,
                        'joy-toggle__checked': this.checked,
                        'joy-toggle__disabled': this.disabled,
                    }}
                    onClick={this.onClick}
                    htmlFor={this.name || generatedInputNameAndId(this.el)}
                >
                    <input
                        type="checkbox"
                        class="joy-toggle__input"
                        role="checkbox"
                        disabled={this.disabled}
                        checked={this.checked}
                        aria-checked={`${this.checked}`}
                    />
                    <p class="joy-toggle__content">
                        <slot />
                    </p>
                </label>
            </Host>
        );
    }
}
