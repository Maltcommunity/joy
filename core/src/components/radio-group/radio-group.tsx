type NativeEvent = Event;
import {Component, ComponentInterface, Element, Event, EventEmitter, Host, Listen, Prop, Watch, h} from '@stencil/core';
import {generatedInputNameAndId} from '../../utils';

type RadioGroupValue = {value: string};

/**
 * @slot radio-group-label - If you want to inject a label for your radio group, use this slot (not mandatory)
 * @slot default - Use joy-radio tags with this slot (mandatory)
 */
@Component({
    tag: 'joy-radio-group',
    styleUrl: 'radio-group.scss',
    scoped: true,
})
export class RadioGroup implements ComponentInterface {
    private inputId = `joy-radio-group-${radioGroupIds++}`;

    @Element() el!: HTMLJoyRadioGroupElement;

    /**
     * The name of the control, which is submitted with the form data.
     */
    @Prop() name: string = this.inputId;
    /**
     * Invalid state of the radio group
     */
    @Prop() invalid = false;
    /**
     * Invalid message
     */
    @Prop() invalidText?: string;
    /**
     * Label displayed for the whoe radio group.
     */
    @Prop() direction: 'vertical' | 'horizontal' = 'horizontal';
    /**
     * the value of the radio group.
     */
    @Prop({mutable: true, reflect: true}) value?: any | null;

    @Watch('value')
    valueChanged(value: any | undefined) {
        this.setRadioTabindex(value);
        this.valueChange.emit({value});
        this.joyRadioGroupValueChange.emit({value});
    }

    /**
     * Emitted when the value has changed. WARNING : this event has a generic name used by other form elements !
     * Using it can create conflicts !
     */
    @Event() valueChange!: EventEmitter<RadioGroupValue>;

    /**
     * Emitted when the value has changed. Use this specific event if you use expandable options containing various inputs.
     */
    @Event() joyRadioGroupValueChange!: EventEmitter<RadioGroupValue>;

    private setRadioTabindex = (value: any | undefined) => {
        const radios = this.getRadios();

        // Get the first radio that is not disabled and the checked one
        const first = radios.find((radio) => !radio.disabled);
        const checked = radios.find((radio) => radio.value === value && !radio.disabled);

        if (!first && !checked) {
            return;
        }

        // If an enabled checked radio exists, set it to be the focusable radio
        // otherwise we default to focus the first radio
        const focusable = checked || first;

        for (const radio of radios) {
            const tabindex = radio === focusable ? 0 : -1;
            radio.setButtonTabindex(tabindex).then(() => {});
        }
    };

    private getRadios(): HTMLJoyRadioElement[] {
        return Array.from(this.el.querySelectorAll('joy-radio'));
    }

    private onClick = (ev: NativeEvent) => {
        if (ev.target) {
            if ((ev.target as HTMLElement).tagName !== 'A') {
                ev.preventDefault();
            }
        }

        const selectedRadio = ev.target && (ev.target as HTMLElement).closest('joy-radio');
        if (selectedRadio && !selectedRadio.disabled) {
            const currentValue = this.value;

            const newValue = selectedRadio.value;
            if (newValue !== currentValue) {
                this.value = newValue;
            }
        }
    };

    @Listen('keydown', {target: 'document'})
    onKeydown(ev: any) {
        if (ev.target && !this.el.contains(ev.target)) {
            return;
        }

        // Get all radios inside of the radio group and then
        // filter out disabled radios since we need to skip those
        const radios = this.getRadios().filter((radio) => !radio.disabled);

        // Only move the radio if the current focus is in the radio group
        if (ev.target && radios.includes(ev.target)) {
            const index = radios.findIndex((radio) => radio === ev.target);
            let next;

            // If hitting arrow down or arrow right, move to the next radio
            // If we're on the last radio, move to the first radio
            if (['ArrowDown', 'ArrowRight'].includes(ev.code)) {
                next = index === radios.length - 1 ? radios[0] : radios[index + 1];
            }

            // If hitting arrow up or arrow left, move to the previous radio
            // If we're on the first radio, move to the last radio
            if (['ArrowUp', 'ArrowLeft'].includes(ev.code)) {
                next = index === 0 ? radios[radios.length - 1] : radios[index - 1];
            }

            if (next && radios.includes(next)) {
                next.setFocus(ev);
                this.value = next.value;
            }
        }
    }

    componentDidLoad() {
        this.setRadioTabindex(this.value);
        this.getRadios().forEach((radio) => (radio.name = this.name));
    }

    render() {
        const directionClass = `joy-radio-group-${this.direction}`;

        return (
            <Host onClick={this.onClick}>
                <div class="joy-radio-group">
                    <fieldset class="joy-radio-group-fieldset" role="radiogroup">
                        <slot name="radio-group-label" />

                        <div
                            class={{
                                'joy-radio-group-container': true,
                                [directionClass]: true,
                            }}
                        >
                            <slot />
                        </div>
                        {this.invalid && this.invalidText && <joy-form-error no-html-error-text={this.invalidText} />}
                    </fieldset>
                </div>
            </Host>
        );
    }
}

let radioGroupIds = 0;
