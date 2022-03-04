import {Component, Event, Method, Prop, h, State, Watch, EventEmitter} from '@stencil/core';
import {TagVariants, TagSizes} from '../../types';
import {checkEmailsValidity} from './../../utils';

enum ErrorType {
    DUPLICATED_ENTRY = 'DUPLICATED_ENTRY',
    INVALID_EMAIL = 'INVALID_EMAIL',
}

@Component({
    tag: 'joy-tags-input',
    styleUrl: 'tags-input.scss',
    shadow: true,
})
export class JoyTagsInput {
    private input!: HTMLInputElement;

    /** form name for our tags input */
    @Prop() name?: string;
    /** Placeholder used for the input */
    @Prop() placeholder: string = 'Add your items here';
    /** Variant/color type for your tags. Check Tag documentation for available values */
    @Prop() variant: TagVariants = 'primary';
    /** Size for your tags. Check Tag documentation for available values */
    @Prop() size: TagSizes = 'small';
    /** Saved values for the tags list. Must be an array like string eg. ['first', 'second']. */
    @Prop() values?: string;
    /** Invalid state */
    @Prop({mutable: true}) invalid = false;
    /** Validation type : if 'email' is given, it will create a specific check before actually adding the tag. Default to none. */
    @Prop() validation: 'email' | 'none' = 'none';

    @State() tagsList: string[] = [];
    @State() isFocused = false;

    /** On input focus */
    @Event() joyTagsInputFocus!: EventEmitter<void>;
    /** On input blur */
    @Event() joyTagsInputBlur!: EventEmitter<void>;
    /** When the tags list is updated */
    @Event() joyTagsUpdate!: EventEmitter<string[]>;
    /** When the tags list is on error. According to the returned ErrorType, you can display the right error.  */
    @Event() joyTagsError!: EventEmitter<ErrorType>;

    @Watch('values')
    formatValues() {
        if (!this.values) {
            return;
        }

        const values = this.values.replace(/'/g, '"');
        this.tagsList = JSON.parse(values);
        this.checkValidity();
    }

    /**
     * Get the array of values contained in the tag input
     */
    @Method()
    async getValues() {
        return this.tagsList;
    }

    connectedCallback() {
        this.formatValues();
    }

    private validateEmails() {
        return this.validation === 'email';
    }

    private checkValidity() {
        if (this.validateEmails()) {
            this.invalid = !checkEmailsValidity(this.tagsList);
        }
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if (['Enter', 'KeyM'].includes(e.code)) {
            e.preventDefault();

            if (!this.tagsList.includes(this.input.value)) {
                if (!checkEmailsValidity(this.input.value) && this.validateEmails()) {
                    this.joyTagsError.emit(ErrorType.INVALID_EMAIL);
                }

                this.invalid = false;
                this.tagsList = [...this.tagsList, this.input.value];
                this.input.value = '';
                this.joyTagsUpdate.emit(this.tagsList);
            } else {
                this.joyTagsError.emit(ErrorType.DUPLICATED_ENTRY);
                this.invalid = true;
            }

            this.checkValidity();
        }
    };

    private onFocus = () => {
        this.joyTagsInputFocus.emit();
        this.isFocused = true;
    };

    private onBlur = () => {
        this.joyTagsInputBlur.emit();
        this.isFocused = false;
    };

    private tagRemove = (e: CustomEvent) => {
        this.tagsList = this.tagsList.filter((tag) => tag !== e.detail);
        this.joyTagsUpdate.emit(this.tagsList);
        this.input.focus();
        this.checkValidity();
    };

    render() {
        return (
            <div class="joy-tags-input-wrapper">
                <label htmlFor={this.name} class="joy-tags-input-label">
                    <slot name="tags-input-label" />
                </label>
                <div
                    class={{
                        'joy-tags-input-inner': true,
                        'joy-tags-input-inner-focused': this.isFocused,
                        'joy-tags-input-inner-invalid': this.invalid,
                    }}
                >
                    <joy-tags-list>
                        {this.tagsList.map((val) => {
                            return (
                                <joy-tag onJoyTagRemove={this.tagRemove} variant={this.variant} size={this.size} removable>
                                    {val}
                                </joy-tag>
                            );
                        })}
                        <input
                            onKeyDown={this.onKeyDown}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            type="text"
                            id={this.name}
                            name={this.name}
                            ref={(el) => (this.input = el as HTMLInputElement)}
                            placeholder={this.placeholder}
                        />
                    </joy-tags-list>
                </div>
            </div>
        );
    }
}
