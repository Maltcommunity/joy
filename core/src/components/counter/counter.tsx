import {Component, EventEmitter, h, Prop, Event, Element, Method} from '@stencil/core';
import {generatedInputNameAndId} from '../../utils';
import {LabelSizes} from '../../types';

@Component({
    tag: 'joy-counter',
    styleUrl: 'counter.scss',
    scoped: true,
})
export class CounterComponent {
    private incrementEl!: HTMLJoyIconElement;
    private decrementEl!: HTMLJoyIconElement;
    private input!: HTMLInputElement;
    private html5ValidationMessage?: string;

    @Element() el!: HTMLJoyCounterElement;

    /** Counter value **/
    @Prop({mutable: true, reflect: true}) value = 0;
    /**
     * Counter requirement
     */
    @Prop() required = false;

    /** Display the required mark or not. Default to false. */
    @Prop() requiredMark = false;
    /** Inject the right wording if your field is not required. the "-" separator is already handled internally. **/
    @Prop() optionalLabel?: string;

    /**
     * Minimum possible value. Default to 0
     */
    @Prop() min = 0;
    /**
     * Maximum possible value. No default
     */
    @Prop() max?: number;
    /**
     * Granularity of the input. We use the same name than native step attribute.
     * We don't bind this prop to actual input step attribute, because we don't want checkValidity API to return invalid if the actual
     * value is not a multiple of step prop !
     */
    @Prop() step = 1;
    /**
     * Name for the input
     */
    @Prop({reflect: true}) name = '';
    /**
     * Invalid state of the component
     */
    @Prop({mutable: true}) invalid = false;
    /**
     * Message when the component is invalid. Warning : by default, it will pick HTML5 validation message (the language is defined by your OS)
     */
    @Prop() invalidMessage = '';
    /**
     * Used for accessibility aria-label attribute. More than welcome !
     */
    @Prop() labelDecrement = `Decrement value by ${this.step}`;
    /**
     * Used for accessibility aria-label attribute. More than welcome !
     */
    @Prop() labelIncrement = `Increment value by ${this.step}`;
    /**
     * aria-label used for input accessibility. Use string only, no HTML. More than welcome !
     */
    @Prop() ariaLabel = '';

    /** The label input's size. */
    @Prop() labelSize: LabelSizes = 'medium';

    /**
     * Generic event for any counter change, fired by manually typing a value or using increment/decrement CTA
     */
    @Event({eventName: 'value-change'}) valueChange!: EventEmitter<number>;
    /**
     * Specific event fired when you increment the counter value. Prefer using valueChange unless you need to handle this specific event type
     */
    @Event({eventName: 'joy-counter-increment'}) joyCounterIncrement!: EventEmitter<number>;
    /**
     * Specific event fired when you decrement the counter value. Prefer using valueChange unless you need to handle this specific event type
     */
    @Event({eventName: 'joy-counter-decrement'}) joyCounterDecrement!: EventEmitter<number>;
    /**
     * Specific event fired when your counter value is invalid.
     */
    @Event({eventName: 'joy-counter-invalid'}) joyCounterInvalid!: EventEmitter<{value: string; message: string}>;

    /**
     * Allows to manually increment counter value from outside.
     */
    @Method()
    async increment() {
        const updatedCount = this.formatValue();

        if (this.max && updatedCount <= this.max) {
            this.value = updatedCount >= this.max ? this.max : updatedCount;
        } else if (this.max && updatedCount > this.max) {
            this.value = this.max;
        } else {
            this.value = updatedCount;
        }

        this.valueChange.emit(this.value);
        this.joyCounterIncrement.emit(this.value);
        this.validateInput();
    }

    /**
     * Allows to manually decrement counter value from outside.
     */
    @Method()
    async decrement() {
        const updatedCount = this.formatValue(false);
        if (updatedCount >= 0) {
            this.value = updatedCount <= this.min ? this.min : updatedCount;
        } else {
            this.value = 0;
        }

        this.valueChange.emit(this.value);
        this.joyCounterDecrement.emit(this.value);
        this.validateInput();
    }

    private formatValue(increase = true): number {
        // Dynamically detect the number of digits
        // If step = 0.001, toFixed will use 3 as fractionDigits
        // If step = 0.5, toFixed will use 1 as fractionDigits
        const step = this.step.toString().split('.');
        const fractionDigits = step.length === 2 ? step[1].length : 0;

        if (increase) {
            return parseFloat((this.value + this.step).toFixed(fractionDigits));
        } else {
            return parseFloat((this.value - this.step).toFixed(fractionDigits));
        }
    }

    private validateInput() {
        this.invalid = !this.inputIsValid();

        if (this.invalid) {
            this.html5ValidationMessage = this.input.validationMessage;

            this.joyCounterInvalid.emit({
                value: this.input.value,
                message: this.html5ValidationMessage,
            });
        }
    }

    private inputIsValid() {
        return this.inputMaxValueIsValid() && this.inputMinValueIsValid();
    }

    private inputMaxValueIsValid() {
        return !this.max || this.value <= this.max;
    }

    private inputMinValueIsValid() {
        return this.min <= this.value;
    }

    private get maxAttribute() {
        return this.max ? {['max']: this.max} : null;
    }

    private get componentErrorMessage() {
        return this.invalidMessage || this.html5ValidationMessage;
    }

    private onInput = (ev: Event) => {
        const input = ev.target as HTMLInputElement | null;

        if (!input) {
            return;
        }

        this.invalid = false;
        this.value = +input.value || 0;
        this.valueChange.emit(this.value);
    };

    private onBlur = () => {
        this.validateInput();
    };

    private hasSlot(): boolean {
        return !!this.el.textContent || this.el.children.length > 0;
    }

    render() {
        return (
            <div>
                {this.hasSlot() && (
                    <joy-label
                        required={this.required && this.requiredMark}
                        id={this.inputAriaLabel}
                        optional-label={this.optionalLabel}
                        html-for={this.name || generatedInputNameAndId(this.el)}
                        size={this.labelSize}
                    >
                        <slot />
                    </joy-label>
                )}
                <div class="joy-counter__wrapper">
                    <button
                        class="joy-counter__decrement"
                        type="button"
                        onClick={async () => await this.decrement()}
                        aria-label={this.labelDecrement}
                        disabled={this.value <= this.min}
                    >
                        <joy-icon name="minus" color="teal"
                                  ref={(el) => (this.decrementEl = el as HTMLJoyIconElement)}/>
                    </button>

                    <input
                        type="number"
                        class={{
                            'joy-counter__invalid': this.invalid,
                        }}
                        ref={(el) => (this.input = el as HTMLInputElement)}
                        onInput={this.onInput}
                        onBlur={this.onBlur}
                        min={this.min}
                        aria-label={this.ariaLabel ? this.ariaLabel : false}
                        aria-invalid={this.invalid ? 'true' : 'false'}
                        aria-labelledby={this.inputAriaLabel}
                        {...this.maxAttribute}
                        name={this.name}
                        required={this.required}
                        step="any"
                        value={this.value}
                    />

                    <button
                        class="joy-counter__increment"
                        type="button"
                        onClick={async () => await this.increment()}
                        aria-label={this.labelIncrement}
                        disabled={this.max ? this.value >= this.max : false}
                    >
                        <joy-icon name="add" ref={(el) => (this.incrementEl = el as HTMLJoyIconElement)} color="teal"/>
                    </button>

                    {this.invalid && this.componentErrorMessage && (
                        <div class="joy-counter_error">
                            <joy-form-error no-html-error-text={this.componentErrorMessage}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private get inputAriaLabel(): string {
        return 'label-' + generatedInputNameAndId(this.el);
    }
}
