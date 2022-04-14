import {Component, ComponentInterface, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h, readTask} from '@stencil/core';
import {renderInputOutsideShadowRoot} from '../../utils';

@Component({
    tag: 'joy-textarea',
    styleUrl: 'textarea.scss',
    shadow: true,
})
export class JoyTextarea implements ComponentInterface {
    private textarea?: HTMLTextAreaElement;
    private inputId = `joy-textarea-${textareaIds++}`;
    private didBlurAfterEdit = false;
    private textareaWrapper?: HTMLElement;
    /**
     * This is required for a WebKit bug which requires us to
     * blur and focus an input to properly focus the input in
     * an item with delegatesFocus. It will no longer be needed
     * with iOS 14.
     *
     * @internal
     */
    @Prop() fireFocusEvents = true;

    @Element() el!: HTMLJoyTextareaElement;

    @State() hasFocus = false;

    /**
     * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
     */
    @Prop() autocapitalize = 'none';

    /**
     * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
     */
    @Prop() autofocus = false;

    /**
     * If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types.
     */
    @Prop() clearOnEdit = false;

    /**
     * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
     */
    @Prop() debounce = 0;

    /**
     * If `true`, the user cannot interact with the textarea.
     */
    @Prop() disabled = false;
    /**
     * If `true`, the textarea will be considered as invalid.
     */
    @Prop({mutable: true}) invalid = false;

    /**
     * A hint to the browser for which keyboard to display.
     * Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
     * `"email"`, `"numeric"`, `"decimal"`, and `"search"`.
     */
    @Prop() inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

    /**
     * A hint to the browser for which enter key to display.
     * Possible values: `"enter"`, `"done"`, `"go"`, `"next"`,
     * `"previous"`, `"search"`, and `"send"`.
     */
    @Prop() enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
     */
    @Prop() maxlength?: number;

    /**
     * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
     */
    @Prop() minlength?: number;
    /**
     * Use this prop to give component the translation used to display minimum chars count.
     */
    @Prop() minlengthLabel?: string;

    /**
     * The name of the control, which is submitted with the form data.
     */
    @Prop() name: string = this.inputId;

    /**
     * Instructional text that shows before the input has a value.
     */
    @Prop() placeholder?: string | null;

    /**
     * If `true`, the user cannot modify the value.
     */
    @Prop() readonly = false;

    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    @Prop() required = false;

    /**
     * If `true`, the element will have its spelling and grammar checked.
     */
    @Prop() spellcheck = false;

    /**
     * The visible width of the text control, in average character widths. If it is specified, it must be a positive integer.
     */
    @Prop() cols?: number;

    /**
     * The number of visible text lines for the control.
     */
    @Prop() rows? = 4;

    /**
     * Indicates how the control wraps text.
     */
    @Prop() wrap?: 'hard' | 'soft' | 'off';

    /**
     * If `true`, the element height will increase based on the value.
     */
    @Prop() autoGrow = false;

    /**
     * The value of the textarea.
     */
    @Prop({mutable: true}) value?: string | null = '';

    /**
     * Update the native input element when the value changes
     */
    @Watch('value')
    protected valueChanged() {
        const textarea = this.textarea;
        const value = this.getValue();
        if (textarea && textarea.value !== value) {
            textarea.value = value;
        }
        this.runAutoGrow();
        this.joyTextareaChange.emit({value});
    }

    /**
     * Emitted when the value has changed. Generic event used by all other form fields
     */
    @Event() valueChange!: EventEmitter<void>;
    /**
     * Emitted when the input value has changed.
     */
    @Event() joyTextareaChange!: EventEmitter<{value: string}>;

    /**
     * Emitted when a keyboard input occurred.
     */
    @Event() joyTextareaInput!: EventEmitter<KeyboardEvent>;

    /**
     * Emitted when the input loses focus.
     */
    @Event() joyTextareaBlur!: EventEmitter<FocusEvent>;

    /**
     * Emitted when the input has focus.
     */
    @Event() joyTextareaFocus!: EventEmitter<FocusEvent>;

    componentDidLoad() {
        this.runAutoGrow();
        this.slotLabelGiven();
    }

    private slotLabelGiven() {
        const label = this.el.querySelector('[slot="textarea-label"]');

        if (!label) {
            return false;
        }

        return !!label.textContent;
    }

    private runAutoGrow() {
        const textarea = this.textarea;
        if (textarea && this.autoGrow) {
            readTask(() => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
                if (this.textareaWrapper) {
                    this.textareaWrapper.style.height = textarea.scrollHeight + 'px';
                }
            });
        }
    }

    /**
     * Sets focus on the native `textarea` in `ion-textarea`. Use this method instead of the global
     * `textarea.focus()`.
     */
    @Method()
    async setFocus() {
        if (this.textarea) {
            this.textarea.focus();
        }
    }

    /**
     * Sets blur on the native `textarea` in `ion-textarea`. Use this method instead of the global
     * `textarea.blur()`.
     * @internal
     */
    @Method()
    async setBlur() {
        if (this.textarea) {
            this.textarea.blur();
        }
    }

    /**
     * Returns the textarea nested in the component shadowDOM
     * @return {Promise<HTMLTextAreaElement>} - Returns the native `<textarea>` element used under the hood.
     */
    @Method()
    getInputElement(): Promise<HTMLTextAreaElement> {
        return Promise.resolve(this.textarea!);
    }

    /**
     * Check if we need to clear the text input if clearOnEdit is enabled
     */
    private checkClearOnEdit() {
        if (!this.clearOnEdit) {
            return;
        }

        // Did the input value change after it was blurred and edited?
        if (this.didBlurAfterEdit && this.hasValue()) {
            // Clear the input
            this.value = '';
        }

        // Reset the flag
        this.didBlurAfterEdit = false;
    }

    private focusChange() {
        // If clearOnEdit is enabled and the input blurred but has a value, set a flag
        if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
    }

    private hasValue(): boolean {
        return this.getValue() !== '';
    }

    private getValue(): string {
        return this.value || '';
    }

    private onInput = (ev: Event) => {
        if (this.textarea) {
            this.value = this.textarea.value;
        }
        this.joyTextareaInput.emit(ev as KeyboardEvent);
        this.valueChange.emit();
    };

    private onFocus = (ev: FocusEvent) => {
        this.hasFocus = true;
        this.focusChange();

        if (this.fireFocusEvents) {
            this.joyTextareaFocus.emit(ev);
        }
    };

    private onBlur = (ev: FocusEvent) => {
        this.hasFocus = false;
        this.focusChange();

        if (this.fireFocusEvents) {
            this.joyTextareaBlur.emit(ev);
        }

        this.invalid = this.countOverload;
    };

    private onKeyDown = () => {
        this.checkClearOnEdit();
    };

    private minlengthElement(): HTMLElement | undefined {
        if (!this.minlength) {
            return;
        }

        const invalid = this.getValue().length < this.minlength;

        if (this.minlength) {
            return (
                <p
                    class={{
                        'joy-textarea-min': true,
                        'joy-textarea-min-invalid': invalid,
                    }}
                >
                    {!invalid && <joy-icon name="check" color="grey"></joy-icon>}
                    {this.minlengthLabel || `Minimum ${this.minlength} characters`}
                </p>
            );
        }
    }

    get countOverload() {
        if (!this.maxlength) {
            return false;
        }

        return this.getValue().length > this.maxlength;
    }

    get valueCount(): string {
        const valueLength = this.getValue().length;

        if (!this.maxlength) {
            return '';
        }

        return (
            <p
                class={{
                    'joy-textarea-count': true,
                    'joy-textarea-count-invalid': this.countOverload,
                }}
            >
                {valueLength + '/' + this.maxlength}
            </p>
        );
    }

    render() {
        renderInputOutsideShadowRoot(this.el, this.name, this.value, this.disabled);
        const value = this.getValue();

        return (
            <Host aria-disabled={this.disabled ? 'true' : null}>
                <div
                    class={{
                        'joy-textarea': true,
                        'joy-textarea_invalid': this.invalid,
                        'joy-textarea_disabled': this.disabled,
                        'joy-textarea_autogrow': this.autoGrow,
                    }}
                >
                    <div ref={(el) => (this.textareaWrapper = el)}>
                        <label class="joy-textarea_label">
                            <slot name="textarea-label" />
                        </label>

                        <textarea
                            class="joy-native-textarea"
                            ref={(el) => (this.textarea = el)}
                            autoCapitalize={this.autocapitalize}
                            autoFocus={this.autofocus}
                            enterKeyHint={this.enterkeyhint}
                            inputMode={this.inputmode}
                            disabled={this.disabled}
                            name={this.name}
                            placeholder={this.placeholder || ''}
                            readOnly={this.readonly}
                            required={this.required}
                            spellcheck={this.spellcheck}
                            cols={this.cols}
                            rows={this.rows}
                            wrap={this.wrap}
                            onInput={this.onInput}
                            onBlur={this.onBlur}
                            onFocus={this.onFocus}
                            onKeyDown={this.onKeyDown}
                        >
                            {value}
                        </textarea>
                    </div>

                    <div class="joy-textarea_helpers">
                        {this.minlengthElement()}
                        {this.valueCount}
                    </div>
                </div>
            </Host>
        );
    }
}

let textareaIds = 0;
