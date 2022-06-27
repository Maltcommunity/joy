import {Component, Event, EventEmitter, Prop, h, Element, Host, Method, State} from '@stencil/core';
import {FormPickerTypes} from '@/types';

/**
 * @slot default - Text of your radio
 */
@Component({
    tag: 'joy-radio',
    styleUrl: 'radio.scss',
    scoped: true,
})
export class Radio {
    private inputId = `joy-radio-${radioButtonIds++}`;
    private radioGroup: any | null = null;
    private isExpanded = false;
    private expandableElement!: HTMLElement;

    @Element() el!: HTMLJoyRadioElement;

    /**
     * Field is required
     */
    @Prop({reflect: true}) required = false;
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
     * Field name. Given by parent component
     */
    @Prop({reflect: true}) name!: string;

    /**
     * If `true`, the user cannot interact with the radio.
     */
    @Prop() disabled = false;

    /**
     * the value of the radio.
     */
    @Prop({mutable: true}) value?: any | null;

    /**
     * Defines the type of the radio 'default' or 'outline'
     */
    @Prop({reflect: true}) type: FormPickerTypes = 'default';

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

        this.setExpandableState();
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
        this.setExpandableState();
    };

    private onClick = () => {
        this.joyRadioClick.emit();
        this.setExpandableState();
    };

    private handleFocus = () => {
        this.joyRadioFocus.emit();
    };

    private handleBlur = () => {
        this.joyRadioBlur.emit();
    };

    private setExpandableState() {
        this.isExpanded = !!this.el.querySelector('[slot="expandable-content"]') && this.checked;
    }

    render() {
        const {buttonTabindex, checked, disabled, inputId, invalid, name, required} = this;

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
                        [`joy-radio--${this.type}`]: true,
                    }}
                    htmlFor={this.inputId}
                >
                    <input
                        type="radio"
                        value={this.value}
                        checked={checked}
                        disabled={disabled}
                        required={required}
                        name={name}
                        tabindex="-1"
                        id={inputId}
                    />
                    <span class="joy-radio-label">
                        <slot />
                    </span>

                    <div
                        class={{
                            'joy-radio-expandable': true,
                            'joy-radio-expandable--expanded': this.isExpanded,
                        }}
                        ref={(el) => (this.expandableElement = el as HTMLElement)}
                    >
                        <slot name="expandable-content" />
                    </div>
                </label>
            </Host>
        );
    }
}

let radioButtonIds = 0;
