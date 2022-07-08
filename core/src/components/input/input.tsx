import {Component, Event, EventEmitter, h, Element, Host, Prop, State, Method} from '@stencil/core';
import {InputSizes, LabelSizes} from '../../types';
import {generatedInputNameAndId, inheritAttributes} from '../../utils';

@Component({
    tag: 'joy-input',
    styleUrl: 'style/input.scss',
    scoped: true,
})
export class Input {
    private inheritedAttributes: {[k: string]: any} = {};

    @Element() host!: HTMLJoyInputElement;
    private input!: HTMLInputElement;

    /** Input types. List is not exhaustive, this component does not deal with checkboxes, radios, files, dates.
     * The type=number state is not appropriate for input that happens to only consist of numbers but isn’t strictly speaking a number (credit card number for example)
     */
    @Prop({mutable: true}) type: 'hidden' | 'text' | 'number' | 'search' | 'email' | 'password' | 'tel' = 'text';

    /** A hint to the browser for which keyboard to display. */
    @Prop() inputmode?: 'none' | 'decimal' | 'text' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

    /**
     * A hint to the browser for which enter key to display.
     */
    @Prop() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

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
    @Prop({mutable: true}) invalid = false;

    /** Makes the field required */
    @Prop() required = false;
    /** Display the required mark or not. Default to false. */
    @Prop() requiredMark = false;
    /** Inject the right wording if your field is not required. the "-" separator is already handled internally. **/
    @Prop() optionalLabel?: string;

    /** Max character number. https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/maxlength */
    @Prop() maxlength?: number;

    /** Max character number. https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/minlength */
    @Prop() minlength?: number;

    /** If the type is "number" then you can use min property. */
    @Prop() min?: number;

    /** If the type is "number" then you can use max property. */
    @Prop() max?: number;

    /** If the type is "number" then you can use step property. */
    @Prop() step: number | 'any' = 'any';

    /** Field value */
    @Prop({reflect: true, mutable: true}) value = '';

    /** The input's size. */
    @Prop({reflect: true}) size: InputSizes = 'medium';

    /** The label input's size. */
    @Prop() labelSize: LabelSizes = 'medium';

    /** The input's autocomplete policy. */
    @Prop() autocomplete = 'off';

    /** Add an icon on the left side before the value */
    @Prop() icon?: string;
    /**
     * A regular expression that the value is checked against. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information.
     */
    @Prop() pattern?: string;

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
    private onBlur = () => {
        this.focusing = false;
        this.invalid = !this.input.checkValidity();
    };

    private getIfTypeNumber = (value: number | string | undefined) => {
        if (this.type === 'number' && value) {
            return value;
        }
    };

    private hasSlot(): boolean {
        return !!this.host.textContent || this.host.children.length > 0;
    }

    componentWillLoad() {
        this.type = this.unit && !this.inputmode ? 'number' : this.type;
        this.inputType = this.type;

        // Here you can add any attribute that you don't want to be reactive
        this.inheritedAttributes = inheritAttributes(this.host, ['autocomplete', 'spellcheck']);
    }

    render() {
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
                    {this.hasSlot() && (
                        <joy-label
                            required={this.required && this.requiredMark}
                            id={this.inputAriaLabel}
                            optional-label={this.optionalLabel}
                            html-for={this.name || generatedInputNameAndId(this.host)}
                            size={this.labelSize}
                        >
                            <slot />
                        </joy-label>
                    )}
                    <div
                        class={{
                            'joy-input--wrapper': true,
                            'joy-input--wrapper-has-icon': !!this.icon,
                            'joy-input--wrapper-unit': !!this.unit && this.type === 'number',
                        }}
                    >
                        <input
                            class={{
                                'joy-input--field-disabled': this.disabled,
                                'joy-input--field-invalid': this.invalid,
                            }}
                            id={this.name || generatedInputNameAndId(this.host)}
                            aria-labelledby={this.inputAriaLabel}
                            ref={(el) => (this.input = el as HTMLInputElement)}
                            type={this.inputType}
                            inputMode={this.inputmode}
                            enterKeyHint={this.enterkeyhint}
                            aria-invalid={this.invalid}
                            onInput={this.updateValue}
                            name={this.name || generatedInputNameAndId(this.host)}
                            autoComplete={this.autocomplete}
                            disabled={this.disabled}
                            placeholder={this.placeholder}
                            maxlength={this.maxlength}
                            minlength={this.minlength}
                            min={this.getIfTypeNumber(this.min)}
                            max={this.getIfTypeNumber(this.max)}
                            step={this.getIfTypeNumber(this.step)}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            required={this.required}
                            pattern={this.pattern}
                            {...this.inheritedAttributes}
                            value={this.value}
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
