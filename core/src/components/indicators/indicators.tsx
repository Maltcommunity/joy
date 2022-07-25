import {Component, Element, Event, EventEmitter, h, Host, Listen, Prop} from '@stencil/core';
import {IndicatorsVariants} from '../..//types';

@Component({
    tag: 'joy-indicators',
    styleUrl: 'style/indicators.scss',
    shadow: true,
})
export class Indicators {
    @Element() host!: HTMLJoyIndicatorsElement;
    /** Variant colors. 2 possibles values **/
    @Prop() variant: IndicatorsVariants = 'default';
    /** Selected state **/
    @Prop({reflect: true, mutable: true}) selected = 1;
    @Event({eventName: 'joy-indicators-change'}) joyIndicatorsChange!: EventEmitter<number>;

    private nextIndicatorSelected!: HTMLJoyIndicatorElement | null;

    @Listen('keydown', {target: 'document'})
    async keyboardNavigation(ev: any) {
        if (ev.target && !this.host.contains(ev.target)) {
            return;
        }

        if (ev.target && this.indicators.includes(ev.target)) {
            const currentSelectionIndex = this.indicators.findIndex((ind) => ind === ev.target);

            // If hitting arrow down or arrow right, move to the next tab
            // If we're on the last tab, move to the first one
            if (['Tab'].includes(ev.code)) {
                if (currentSelectionIndex !== this.indicators.length - 1) {
                    this.nextIndicatorSelected = this.indicators[currentSelectionIndex + 1];
                } else {
                    this.nextIndicatorSelected = null;
                }
            }

            // If hitting tab key AND shift, move to the prev tab
            if (['Tab'].includes(ev.code) && ev.shiftKey) {
                if (currentSelectionIndex !== 0) {
                    this.nextIndicatorSelected = this.indicators[currentSelectionIndex - 1];
                } else {
                    this.nextIndicatorSelected = null;
                }
            }

            if (ev.code === 'Enter' && this.nextIndicatorSelected) {
                this.nextIndicatorSelected.click();
            }

            if (this.nextIndicatorSelected && this.indicators.includes(this.nextIndicatorSelected)) {
                ev.preventDefault();
                ev.stopPropagation();

                await this.nextIndicatorSelected.setFocus();
            }
        }
    }

    @Listen('joy-indicator-select-for-dialog')
    updateSelectedIndicatorForDialog(ev: CustomEvent & {target: HTMLJoyIndicatorElement}) {
        this.joyIndicatorsChange.emit(ev.detail);
    }

    @Listen('joy-indicator-select')
    updateSelectedIndicator(ev: CustomEvent & {target: HTMLJoyIndicatorElement}) {
        this.joyIndicatorsChange.emit(ev.detail);
        if (ev.target && this.indicators.includes(ev.target)) {
            /** Indicator methods are async, so we filter in order to get only non-selected indicators and store all the promises **/

            this.indicators
                .filter((_indicator, index) => {
                    return index + 1 !== ev.detail.index;
                })
                .map(async(indicator) => await indicator.selectIndicator(false));

            this.selected = ev.detail.index;
            this.joyIndicatorsChange.emit(ev.detail);
        }
    }

    private get indicators() {
        return Array.from(this.host.querySelectorAll('joy-indicator'));
    }

    private setIndividualIndicatorProps() {
        this.indicators.forEach((indicator) => {
            if (indicator.tabIndex) {
                indicator.tabIndex = 1;
            }
            indicator.variant = this.variant;
        });
    }

    connectedCallback() {
        this.setIndividualIndicatorProps();
    }

    render() {
        return (
            <Host
                selected={this.selected}
                class={{
                    [`joy-indicators--${this.variant}`]: true,
                }}
            >
                <slot />
            </Host>
        );
    }
}
