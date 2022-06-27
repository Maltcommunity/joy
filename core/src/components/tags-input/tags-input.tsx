import {Component, Element, Event, Method, Prop, h, State, Watch, EventEmitter} from '@stencil/core';
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
    private suggestionsNodes!: HTMLElement;

    @Element() host!: HTMLJoyTagsInputElement;

    /** form name for our tags input */
    @Prop() name?: string;
    /** Placeholder used for the input */
    @Prop() placeholder = 'Add your items here';
    /** Variant/color type for your tags. Check Tag documentation for available values */
    @Prop() variant: TagVariants = 'primary';
    /** Size for your tags. Check Tag documentation for available values */
    @Prop() size: TagSizes = 'small';
    /** Saved values for the tags list. Must be an array like string eg. ['first', 'second']. */
    @Prop() values?: string;
    /** Suggestion of values. Allows to directly pick them instead of typing. */
    @Prop() suggestions?: string;
    /** Suggestion label. Not mandatory. */
    @Prop() suggestionsLabel?: string;
    /** Invalid state */
    @Prop({mutable: true}) invalid = false;
    /** Validation type : if 'email' is given, it will create a specific check before actually adding the tag. Default to none. */
    @Prop() validation: 'email' | 'none' = 'none';
    /** Allows to resort tag list with drag&drop */
    @Prop() sortableTags = false;

    @State() tagsList: string[] = [];
    @State() suggestionTagsList: string[] = [];
    @State() isFocused = false;

    /** On input focus */
    @Event() joyTagsInputFocus!: EventEmitter<void>;
    /** On input blur */
    @Event() joyTagsInputBlur!: EventEmitter<void>;
    /** When the tags list is updated */
    @Event() joyTagsUpdate!: EventEmitter<string[]>;
    /** When the tags list is on error. According to the returned ErrorType, you can display the right error.  */
    @Event() joyTagsError!: EventEmitter<ErrorType>;
    /** Triggered when we click on a tag suggestion  */
    @Event() joyTagsInputAddSuggestion!: EventEmitter<string>;

    private formatTags(list: any) {
        if (typeof list === 'string') {
            const values = list.replace(/'/g, '"');
            return JSON.parse(values);
        } else {
            return list;
        }
    }

    @Watch('values')
    formatValues() {
        if (!this.values) {
            return;
        }

        this.tagsList = this.formatTags(this.values);
        this.checkValidity();
    }

    @Watch('suggestions')
    formatSuggestions() {
        if (!this.suggestions) {
            return;
        }

        this.suggestionTagsList = this.formatTags(this.suggestions);
    }

    /**
     * Get the array of values contained in the tag input
     */
    @Method()
    async getValues() {
        return this.tagsList;
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

    private tagRemove = async (e: CustomEvent) => {
        this.tagsList = this.tagsList.filter((tag) => tag !== e.detail);
        this.joyTagsUpdate.emit(this.tagsList);
        this.input.focus();
        this.checkValidity();

        await this.removeSuggestion(e);
    };

    private addSuggestion = (ev: CustomEvent) => {
        const value = ev.detail.name;

        const addedSuggestion = Array.from(this.suggestionsNodes.querySelectorAll('joy-tag')).find((tag) => tag.innerText === value);

        if (addedSuggestion) {
            addedSuggestion.style.display = 'none';
            this.tagsList = [...this.tagsList, value];
            this.joyTagsInputAddSuggestion.emit(value);
        }
    };

    private removeSuggestion = async (ev: CustomEvent) => {
        this.tagsList = this.tagsList.filter((tag) => tag !== ev.detail);

        const removedSuggestion = Array.from(this.suggestionsNodes.querySelectorAll('joy-tag')).find((tag) => tag.innerText === ev.detail);

        if (removedSuggestion) {
            // If we remove a tag that was in the suggestion list
            await removedSuggestion.selectTag(false);
            removedSuggestion.style.display = 'block';
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

    connectedCallback() {
        this.formatValues();
        this.formatSuggestions();
    }

    render() {
        const {variant, size, tagRemove} = this;
        return (
            <div class="joy-tags-input-wrapper">
                <joy-label htmlFor={this.name} class="joy-tags-input-label">
                    <slot />
                </joy-label>
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
                                <joy-tag onJoyTagRemove={tagRemove} variant={variant} size={size} {...this.isDraggable} removable>
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

                {this.renderSuggestions}
            </div>
        );
    }

    get renderSuggestions() {
        if (!this.suggestions) {
            return '';
        }

        return (
            <div class="joy-tags-input--suggestions">
                <joy-tags-list ref={(e) => (this.suggestionsNodes = e as HTMLElement)}>
                    <span class="joy-tags-input--suggestions---label">{this.suggestionsLabel}</span>
                    {this.suggestionTagsList.map((val) => {
                        return (
                            <joy-tag onJoyTagClick={this.addSuggestion} variant="secondary" size={this.size} selectable>
                                {val}
                            </joy-tag>
                        );
                    })}
                </joy-tags-list>
            </div>
        );
    }

    get isDraggable() {
        return this.sortableTags ? {draggable: true} : null;
    }
}
