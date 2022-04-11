import {Component, Event, EventEmitter, h, Element, Host, Prop, State, Method} from '@stencil/core';
import {InputSizes} from '../../types';
import {generatedInputNameAndId, renderInputOutsideShadowRoot} from '../../utils';

@Component({
    tag: 'joy-input',
    styleUrl: 'style/input.scss',
    shadow: true,
})
export class Input {
    @Element() host!: HTMLJoyInputElement;
    private input!: HTMLInputElement;

    /** Input types. List is not exhaustive, this component does not deal with checkboxes, radios, files, dates. */
    @Prop({mutable: true}) type: 'hidden' | 'text' | 'number' | 'search' | 'email' | 'password' | 'tel' = 'text';

    /** Input types. List is not exhaustive, this component does not deal with checkboxes, radios, files, dates. */
    @Prop() name = '';

    /** If the field is of type number, you can specify a unit like %, days, hours, whatever you want */
    @Prop() unit?: string;

    /** The input's placeholder text. */
    @Prop() placeholder = '';

    /** Makes the field disabled or not */
    @Prop() disabled = false;

    /** Makes the field readonly or not */
    @Prop() readonly = false;

    /** Makes the field readonly or not */
    @Prop() invalid = false;

    /** Makes the field required */
    @Prop() required = false;

    /** Field value */
    @Prop({reflect: true, mutable: true}) value = '';

    /** If the type is "number" then you can use min property. */
    @Prop() min?: number;

    /** If the type is "number" then you can use max property. */
    @Prop() max?: number;

    /** The input's size. */
    @Prop({reflect: true}) size: InputSizes = 'medium';

    /** The input's autocomplete policy. */
    @Prop() autocomplete = 'off';

    /** Add an icon on the left side before the value */
    @Prop() icon?: string;

    @State() inputType!: string;
    @State() passwordShown = false;
    @State() focusing = false;

    /** Custom event that returns the component instance and its actual value. Binded to input native event **/
    @Event() valueChange!: EventEmitter<{element: HTMLJoyInputElement; value?: string}>;

    /**
     * At the moment, for E2E purpose
     */
    @Method()
    async setFocus() {
        this.input.focus();
    }

    private updateValue = () => {
        this.value = this.input.value;

        this.valueChange.emit({
            element: this.host,
            value: this.value,
        });
    };

    private onFocus = () => (this.focusing = true);
    private onBlur = () => (this.focusing = false);

    componentWillLoad() {
        this.type = this.unit ? 'number' : this.type;
        this.inputType = this.type;
    }

    render() {
        renderInputOutsideShadowRoot(this.host, this.name, this.value, this.disabled, this.required);

        return (
            <Host
                class={{
                    [`joy-input--${this.size}`]: true,
                }}
                aria-invalid={this.invalid}
            >
                <div
                    class={{
                        'joy-input': true,
                        'joy-input--focusing': this.focusing,
                        'joy-input--disabled': this.disabled,
                        'joy-input--invalid': this.invalid,
                        'joy-input--valid': !this.invalid && !this.disabled,
                    }}
                >
                    <joy-label id={this.inputAriaLabel}>
                        <slot />
                    </joy-label>
                    <div
                        class={{
                            'joy-input--wrapper': true,
                            'joy-input--wrapper-has-icon': !!this.icon,
                            'joy-input--wrapper-unit': !!this.unit && this.type === 'number',
                        }}
                    >
                        <input
                            id={generatedInputNameAndId(this.host)}
                            aria-labelledby={this.inputAriaLabel}
                            ref={(el) => (this.input = el as HTMLInputElement)}
                            type={this.inputType}
                            aria-invalid={this.invalid}
                            onInput={this.updateValue}
                            name={this.name || generatedInputNameAndId(this.host)}
                            autoComplete={this.autocomplete}
                            disabled={this.disabled}
                            placeholder={this.placeholder}
                            value={this.value}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            required={this.required}
                            class={{
                                'joy-input--field-disabled': this.disabled,
                                'joy-input--field-invalid': this.invalid,
                            }}
                        />
                        {this.icon && <joy-icon role="img" class="joy-input--decorative-icon" name={this.icon} />}
                        {this.passwordIcon()}
                        {this.unit && <div data-unit={this.unit} class="joy-input--unit" />}
                    </div>
                </div>
            </Host>
        );
    }

    private onPasswordIconClick = (ev: Event) => {
        ev.preventDefault();

        this.passwordShown = !this.passwordShown;
        if (this.passwordShown) {
            this.inputType = 'text';
        } else {
            this.inputType = 'password';
        }
    };

    private get displayPasswordIcon() {
        return this.type === 'password' && this.value.length > 0;
    }

    private passwordIcon() {
        if (this.displayPasswordIcon) {
            return <joy-icon class="joy-input--password-icon" onClick={this.onPasswordIconClick} name={this.passwordShown ? 'eye-masked' : 'eye'} />;
        }
    }

    private get inputAriaLabel(): string {
        return 'label-' + generatedInputNameAndId(this.host);
    }
}
