import {Component, Prop, h, Element, Event, EventEmitter, Host, Method, Watch} from '@stencil/core';
import {dispatchEvent} from '../../utils';

/**
 * If you need to get the actual state of the component, you can simply do a :
 * document.querySelector('joy-checkbox.this-instance').checked
 */
@Component({
    tag: 'joy-checkbox',
    styleUrl: './style/checkbox.scss',
    scoped: true,
})
export class Checkbox {
    @Element() el!: HTMLJoyCheckboxElement;
    private input!: HTMLInputElement;

    /** Input value. Input value != checked state ! If you need to get the state checked/not checked, simply use checked prop */
    @Prop() value: string = 'on'; // On is the native value of a checkbox

    /** It will be applied as the hidden input name attribute (for the actual form) */
    @Prop() name = '';

    /** Checkbox is required */
    @Prop() required = false;

    /** Disabled state */
    @Prop({reflect: true}) disabled = false;

    /** Checkbox activated or not */
    @Prop({mutable: true, reflect: true}) checked = false;

    /** Clicking on the component will fire this customEvent */
    @Event({bubbles: true, composed: true}) valueChange!: EventEmitter<boolean>;

    /** Clicking on the component will fire this customEvent (more checkbox specific event) */
    @Event({bubbles: true, composed: true, eventName: 'joy-checkbox-change'}) joyCheckboxChange!: EventEmitter<boolean>;

    @Watch('checked')
    watchChecked() {
        dispatchEvent(this.el, 'change', {checked: this.checked, element: this.el});
    }

    /**
     * Update checkbox state from outside the component
     * @param {Boolean} newValue
     */
    @Method()
    async updateValue(newValue: boolean): Promise<void> {
        this.checked = newValue;
    }

    private handleEvent = (ev: Event) => {
        // We already dispatch the change event when the checked Prop is updated. See @Watch
        dispatchEvent(this.el, ev.type, {checked: this.checked, element: this.el});
    };

    private onClick = (ev: Event) => {
        /**
         * We prevent default event trigger for everything but clicking on a hyperlink
         * Clicking should not change the checkbox state as well
         */
        const target = ev.target as HTMLElement;
        const targetIsNotALink = target.tagName !== 'A';

        if (targetIsNotALink) {
            ev.preventDefault();
        }

        if (!this.disabled && targetIsNotALink) {
            this.checked = !this.checked;
            this.valueChange.emit(this.checked);
            this.joyCheckboxChange.emit(this.checked);
        }
    };

    render() {
        return (
            <Host onClick={this.onClick} value={this.value} aria-checked={`${this.checked}`} aria-hidden={this.disabled ? 'true' : null}>
                <label
                    class={{
                        'joy-checkbox': true,
                        'joy-checkbox__checked': this.checked,
                    }}
                >
                    <input
                        type="checkbox"
                        ref={(el) => (this.input = el as HTMLInputElement)}
                        class="joy-checkbox__input"
                        role="checkbox"
                        name={this.name}
                        onFocus={this.handleEvent}
                        onBlur={this.handleEvent}
                        disabled={this.disabled}
                        checked={this.checked}
                        required={this.required}
                        aria-checked={`${this.checked}`}
                    />
                    <div class="joy-checkbox__content-wrapper">
                        <slot />
                        <div class="joy-checkbox__content">
                            <slot name="checkbox-content" />
                        </div>
                    </div>
                </label>
            </Host>
        );
    }
}
