import {Component, Event, EventEmitter, Prop, h, Element, Host, Method, State} from '@stencil/core';

/**
 * @slot default - Text of your radio
 */
@Component({
    tag: 'joy-radio',
    styleUrl: 'radio.scss',
    shadow: true,
})
export class Radio {
    private inputId = `joy-radio-${radioButtonIds++}`;
    private radioGroup: any | null = null;

    @Element() el!: HTMLJoyRadioElement;

    /**
     * If `true`, the radio is selected.
     */
    @Prop({reflect: true, mutable: true}) checked = false;
    /**
     * If `true`, the radio is invalid.
     */
    @State() invalid = false;

    /**
     * The tabindex of the radio button.
     * @internal
     */
    @State() buttonTabindex = -1;

    /**
     * The name of the control, which is submitted with the form data.
     */
    @Prop() name: string = this.inputId;

    /**
     * If `true`, the user cannot interact with the radio.
     */
    @Prop() disabled = false;

    /**
     * the value of the radio.
     */
    @Prop({mutable: true}) value?: any | null;

    /** When radio is selected **/
    @Event() joyRadioClick!: EventEmitter<void>;
    /** When radio is focused **/
    @Event() joyRadioFocus!: EventEmitter<void>;
    /** When radio is blurred **/
    @Event() joyRadioBlur!: EventEmitter<void>;

    /**
     * @internal
     * @param {any} ev
     */
    @Method()
    async setFocus(ev: any) {
        ev.stopPropagation();
        ev.preventDefault();

        this.el.focus();
    }

    /**
     * @internal
     * @param {number} value
     */
    @Method()
    async setButtonTabindex(value: number) {
        this.buttonTabindex = value;
    }

    connectedCallback() {
        if (this.value === undefined) {
            this.value = this.inputId;
        }
        const radioGroup = (this.radioGroup = this.el.closest('joy-radio-group'));
        if (radioGroup) {
            this.updateState();
            // Emit event
            radioGroup.addEventListener('valueChange', this.updateState);
        }
    }

    disconnectedCallback() {
        const radioGroup = this.radioGroup;
        if (radioGroup) {
            radioGroup.removeEventListener('valueChange', this.updateState);
            this.radioGroup = null;
        }
    }

    private updateState = () => {
        if (this.radioGroup) {
            this.checked = this.radioGroup.value === this.value;
            this.invalid = this.radioGroup.hasAttribute('invalid');
        }
    };

    private onClick = () => {
        this.joyRadioClick.emit();
    };

    private handleFocus = () => {
        this.joyRadioFocus.emit();
    };

    private handleBlur = () => {
        this.joyRadioBlur.emit();
    };

    render() {
        const {buttonTabindex, checked, disabled, inputId, invalid} = this;

        return (
            <Host
                aria-checked={`${checked}`}
                aria-hidden={disabled ? 'true' : null}
                role="radio"
                tabindex={buttonTabindex}
                onClick={this.onClick}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                <label
                    class={{
                        'joy-radio': true,
                        'joy-radio-checked': checked,
                        'joy-radio-disabled': disabled,
                        'joy-radio-invalid': invalid,
                    }}
                    htmlFor={this.inputId}
                >
                    <input type="radio" value={this.value} checked={checked} disabled={disabled} tabindex="-1" id={inputId} />
                    <span>
                        <slot />
                    </span>
                </label>
            </Host>
        );
    }
}

let radioButtonIds = 0;
