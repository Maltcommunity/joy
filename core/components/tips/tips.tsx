import {Component, Element, h, Prop, State} from '@stencil/core';
import {TipsLevel} from '../../types';

@Component({
    tag: 'joy-tips',
    styleUrl: 'tips.scss',
    shadow: true,
})
export class JoyTips {
    @Element() host!: HTMLJoyTipsElement;
    @State() hasTitleSlot = false;

    /** Defines the criticalness of the tips */
    @Prop() level: TipsLevel = 'info';
    /** If icon is defined, it will show it with the right color */
    @Prop() icon?: string;
    /** Display a CTA to hide the tips */
    @Prop() closable = false;

    connectedCallback() {
        /** Not reactive at the moment. No need so far **/
        this.hasTitleSlot = !!this.host.querySelector('[slot="tips-title"]');
    }

    render() {
        return (
            <div class={'joy-tips joy-tips_' + this.level}>
                {this.icon && (
                    <div class="joy-tips__icon">
                        <joy-icon name={this.icon} />
                    </div>
                )}
                <div class="joy-tips__content">
                    <slot name="tips-logo" />

                    <div
                        class={{
                            'joy-tips__heading': true,
                            'joy-tips__heading-filled': this.hasTitleSlot,
                        }}
                    >
                        <slot name="tips-title" />
                    </div>

                    <slot name="tips-content" />
                </div>
                <div class="joy-tips__cta">
                    <slot name="tips-cta" />
                </div>
            </div>
        );
    }
}
