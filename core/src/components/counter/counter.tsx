import {Component, EventEmitter, h, Host, Prop, State, Event, Element} from '@stencil/core';

@Component({
    tag: 'joy-counter',
    styleUrl: 'counter.scss',
    scoped: true,
})
export class CounterComponent {
    private incrementEl!: HTMLJoyIconElement;
    private decrementEl!: HTMLJoyIconElement;
    private input!: HTMLInputElement;

    @Element() el!: HTMLJoyCounterElement;

    @State() value = 0;
    /**
     * Counter requirement
     */
    @Prop() required = false;
    /**
     * Count is the value
     */
    @Prop() count = 0;
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
    @Prop({attribute: 'input-name'}) name = '';
    /**
     * Invalid state of the component
     */
    @Prop({mutable: true}) invalid = false;
    /**
     * Message when the component is invalid. Warning : by default, it will pick HTML5 validation message (the language is defined by your OS)
     */
    @Prop({mutable: true}) invalidMessage = '';
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

    /**
     * Generic event for any counter change, fired by manually typing a value or using increment/decrement CTA
     */
    @Event() joyCounterUpdate!: EventEmitter<number>;
    /**
     * Specific event fired when you increment the counter value. Prefer using joyCounterUpdate unless you need to handle this specific event type
     */
    @Event() joyCounterIncrement!: EventEmitter<number>;
    /**
     * Specific event fired when you decrement the counter value. Prefer using joyCounterUpdate unless you need to handle this specific event type
     */
    @Event() joyCounterDecrement!: EventEmitter<number>;
    /**
     * Specific event fired when your counter value is invalid.
     */
    @Event() joyCounterInvalid!: EventEmitter<{value: string; message: string}>;

    private increment = () => {
        const updatedCount = this.value + this.step;

        if (this.max && updatedCount <= this.max) {
            this.value = updatedCount >= this.max ? this.max : updatedCount;
        } else if (this.max && updatedCount > this.max) {
            this.value = this.max;
        } else {
            this.value = updatedCount;
        }

        this.joyCounterUpdate.emit(this.value);
        this.joyCounterIncrement.emit(this.value);
    };

    private decrement = () => {
        const updatedCount = this.value - this.step;
        if (updatedCount >= 0) {
            this.value = updatedCount <= this.min ? this.min : updatedCount;
        } else {
            this.value = 0;
        }

        this.joyCounterUpdate.emit(this.value);
        this.joyCounterDecrement.emit(this.value);
    };

    private validateInput() {
        this.invalid = !this.inputIsValid();
        if (this.invalid) {
            const message = this.invalidMessage || this.input.validationMessage;
            this.invalidMessage = message;
            this.joyCounterInvalid.emit({
                value: this.input.value,
                message,
            });
        }
    }

    private inputIsValid() {
        return this.input.checkValidity();
    }

    private get maxAttribute() {
        return this.max ? {['max']: this.max} : null;
    }

    private onInput = (ev: Event) => {
        const input = ev.target as HTMLInputElement | null;

        if (!input) {
            return;
        }

        this.invalid = false;
        this.value = +input.value || 0;
        this.joyCounterUpdate.emit(this.value);
    };

    private onBlur = () => {
        this.validateInput();
    };

    render() {
        return (
            <Host class="joy-counter">
                <button
                    class="joy-counter__decrement"
                    type="button"
                    onClick={this.decrement}
                    aria-label={this.labelDecrement}
                    disabled={this.value <= this.min}
                >
                    <joy-icon name="minus" color="teal" ref={(el) => (this.decrementEl = el as HTMLJoyIconElement)}></joy-icon>
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
                    {...this.maxAttribute}
                    name={this.name}
                    required={this.required}
                    value={this.value}
                />

                <button
                    class="joy-counter__increment"
                    type="button"
                    onClick={this.increment}
                    aria-label={this.labelIncrement}
                    disabled={this.max ? this.value >= this.max : false}
                >
                    <joy-icon name="add" ref={(el) => (this.incrementEl = el as HTMLJoyIconElement)} color="teal"></joy-icon>
                </button>

                <div class="joy-counter_error">
                    {this.invalid && this.invalidMessage && <joy-form-error no-html-error-text={this.invalidMessage}></joy-form-error>}
                </div>
            </Host>
        );
    }
}
