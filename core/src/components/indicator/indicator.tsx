import {Component, Element, Event, EventEmitter, h, Host, Method, Prop} from '@stencil/core';
import {IndicatorsVariants} from '../../types';
import {generatedIndex} from '../../utils';

/** @internal **/
@Component({
    tag: 'joy-indicator',
    styleUrl: 'style/indicator.scss',
    shadow: {
        delegatesFocus: true,
    },
})
export class Indicator {
    private index = 1;

    @Element() host!: HTMLJoyIndicatorElement;
    @Prop() variant: IndicatorsVariants = 'default';
    @Prop({mutable: true, reflect: true}) selected = false;

    @Event() joySelectIndicator!: EventEmitter<{index: number}>;

    /**
     * @return {Promise} - Force focus from outside
     */
    @Method()
    async setFocus(): Promise<void> {
        this.host.focus();
    }

    /**
     * @param {Boolean} select - Select or not, the indicator.
     * @return {void}
     */
    @Method()
    async selectIndicator(select = true): Promise<void> {
        this.selected = select;
    }

    private onClick = async () => {
        /** here we don't want to do anything if we click on the same indicator multiple times **/
        if (this.selected) {
            return;
        }

        if (!this.host.closest('joy-dialog')) {
            await this.selectIndicator();
            this.joySelectIndicator.emit({
                index: this.index,
            });
        }
    };

    connectedCallback() {
        this.index = generatedIndex(this.host, this.host.parentElement!);
    }

    render() {
        return (
            <Host
                onClick={this.onClick}
                role="tab"
                index={this.index}
                aria-selected={this.selected}
                class={{
                    [`joy-indicator--${this.variant}`]: true,
                    'joy-indicator--selected': this.selected,
                }}
            >
                <button
                    type="button"
                    class={{
                        'joy-indicator--button': true,
                        'joy-indicator--button-selected': this.selected,
                    }}
                />
            </Host>
        );
    }
}
