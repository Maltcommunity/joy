import {Component, Element, Event, EventEmitter, h, Prop} from '@stencil/core';
import {generatedInputNameAndId} from '@/utils';
import {LabelSizes} from '@/types';

type Option = {
    value: string;
    content: string;
    selected?: boolean;
    disabled?: boolean;
};

@Component({
    tag: 'joy-select',
    styleUrl: 'select.scss',
    scoped: true,
})
export class Select {
    @Element() host!: HTMLJoySelectElement;
    /** Disabled state. **/
    @Prop() disabled = false;
    /** Invalid state. **/
    @Prop({mutable: true}) invalid = false;
    /** Invalid state message. **/
    @Prop() invalidMessage = 'Field is required';
    /** Select name attribute to be found by parent form. **/
    @Prop() name = 'dropdown';
    /** Mandatory or not. **/
    @Prop() required = false;
    /** Mandatory or not. **/
    @Prop({reflect: true}) value?: string;
    /** Display the required mark or not. Default to true. */
    @Prop() requiredMark = true;
    /** The label text. */
    @Prop() label?: string;
    /** The label input's size. */
    @Prop() labelSize: LabelSizes = 'medium';

    /** Generic custom event name. Name is used by any form field **/
    @Event() valueChange!: EventEmitter<{element: HTMLJoySelectElement; value?: string}>;
    /** Custom event that returns the component instance and its actual value. Binded to select native event **/
    @Event() joySelectChange!: EventEmitter<{element: HTMLJoySelectElement; value?: string}>;

    get options(): HTMLJoyOptionElement[] {
        return Array.from(this.host.querySelectorAll('joy-option'));
    }

    get translatedOptions(): Option[] {
        return this.options.map((option) => {
            return {
                value: option.value,
                content: option.textContent || '',
                disabled: option.disabled,
                selected: option.selected,
            };
        });
    }

    private onBlur = (ev: Event) => {
        this.invalid = !(ev.target as HTMLSelectElement).checkValidity();
    };

    private onChange = (ev: Event) => {
        this.value = (ev.target as HTMLSelectElement).value;
        const model = {
            element: this.host,
            value: this.value,
        };

        this.valueChange.emit(model);
        this.joySelectChange.emit(model);
    };

    componentDidLoad() {
        const label = this.host.querySelector('[slot="select-label"]') as HTMLLabelElement;

        if (label) {
            label.htmlFor = this.name || generatedInputNameAndId(this.host);
        }
    }

    render() {
        return (
            <div>
                <slot name="select-label">
                    {this.label && (
                        <joy-label
                            required={this.required && this.requiredMark}
                            id={this.selectAriaLabel}
                            html-for={this.name || generatedInputNameAndId(this.host)}
                            size={this.labelSize}
                        >
                            {this.label}
                        </joy-label>
                    )}
                </slot>

                <div
                    class={{
                        'joy-select__wrapper': true,
                        'joy-select--invalid': this.invalid,
                        'joy-select--disabled': this.disabled,
                    }}
                >
                    <div hidden>
                        <slot />
                    </div>

                    <select
                        class={{
                            'joy-select': true,
                        }}
                        id={this.name || generatedInputNameAndId(this.host)}
                        name={this.name}
                        aria-invalid={this.invalid}
                        required={this.required}
                        disabled={this.disabled}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                    >
                        {this.translatedOptions.map((option) => {
                            return (
                                <option value={option.value || ''} disabled={option.disabled} selected={option.selected}>
                                    {option.content}
                                </option>
                            );
                        })}
                    </select>

                    <joy-icon class="joy-select__chevron" name="chevron-down" />
                </div>
            </div>
        );
    }

    private get selectAriaLabel(): string {
        return 'label-' + generatedInputNameAndId(this.host);
    }
}
