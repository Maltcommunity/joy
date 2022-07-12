import {Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch} from '@stencil/core';
import {generatedInputNameAndId} from '../../utils';

type ChangeDetail = {
    element: HTMLJoySelectableItemElement,
    value: string;
}

@Component({
    tag: 'joy-selectable-item',
    styleUrl: 'selectable-item.scss',
    scoped: true,
})
export class SelectableItem {
    private multipleChoice = true;
    private fullWidth = false;

    @Element() host!: HTMLJoySelectableItemElement;
    /** Name property for form participation **/
    @Prop() name?: string;
    /** Disabled state **/
    @Prop() disabled = false;
    /** Checked state **/
    @Prop({mutable: true, reflect: true}) checked = false;
    /** If you use this component with a joy-checkbox as slot: set the value only on the joy-checkbox, it will be automatically applied to it's parent **/
    @Prop({mutable: true, reflect: true}) value?: string;

    @Event({eventName: 'value-change'}) valueChange!: EventEmitter<ChangeDetail>
    @Event({eventName: 'joy-selectable-item-change'}) joySelectableItemChange!: EventEmitter<ChangeDetail>

    @Watch('checked')
    updateCheckbox(newValue: boolean) {
        if (!this.multipleChoice) {
            return;
        }

       this.host.querySelector('joy-checkbox')!.checked = newValue;
    }

    @Listen('joy-checkbox-change')
    updateCheckedState(ev: CustomEvent) {
        if (!this.multipleChoice) {
            return;
        }

        const target = ev.target as HTMLElement;

        if (this.host.contains(target)) {
            this.checked = ev.detail;
        }
    }

    private get checkboxElement(): HTMLJoyCheckboxElement {
        return this.host.querySelector('joy-checkbox')!;
    }

    connectedCallback() {
        const group = this.host.parentElement as HTMLElement;
        if (group.tagName === 'JOY-SELECTABLE-ITEM-GROUP') {
            this.multipleChoice = group.hasAttribute('multiple');
            this.fullWidth = group.hasAttribute('full-width');
            this.value = this.multipleChoice ? this.checkboxElement.value : this.value;
        }

        this.updateCheckbox(this.checked);
    }

    private onChange = () => {
        if (!this.disabled) {
            this.checked = true;

            const model = {
                element: this.host,
                value: this.value || ''
            };

            this.valueChange.emit(model);
            this.joySelectableItemChange.emit(model);
        }
    };

    render() {
        return (
            <Host aria-disabled={this.disabled}
                  data-choice={this.multipleChoice ? 'multiple': 'single'}
                  full-width={this.fullWidth}
            >
                <div class={{
                    'joy-selectable-item__wrapper': true,
                }}>
                    {!this.multipleChoice && (
                        <input
                            id={generatedInputNameAndId(this.host)}
                            checked={this.checked}
                            type="radio"
                            disabled={this.disabled}
                            onChange={this.onChange}
                            value={this.value}
                            name={this.name}
                        />
                    )}
                    <label
                        class={{
                            'joy-selectable-item': true,
                            'joy-selectable-item--disabled': this.disabled,
                            'joy-selectable-item--checked': this.checked,
                            'joy-selectable-item--multiple': this.multipleChoice,
                            'joy-selectable-item--single': !this.multipleChoice,
                        }}
                        htmlFor={generatedInputNameAndId(this.host)}
                    >
                        <slot />
                    </label>
                </div>
            </Host>
        );
    }
}