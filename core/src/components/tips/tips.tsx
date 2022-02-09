import {Component, h, Prop} from '@stencil/core';
import {TipsLevel} from '../../types';

@Component({
    tag: 'joy-tips',
    styleUrl: 'tips.scss',
    shadow: true,
})
export class JoyTips {
    /** Defines the criticalness of the tips */
    @Prop() level: TipsLevel = 'info';
    /** If icon is defined, it will show it with the right color */
    @Prop() icon?: string;
    /** Display a CTA to hide the tips */
    @Prop() closable = false;

    render() {
        return (
            <div class={'joy-tips joy-tips_' + this.level}>
                {this.icon && <div class="joy-tips__icon"><joy-icon name={this.icon}></joy-icon></div>}
                <div class="joy-tips__content">
                    <slot name="tips-logo" />

                    <div class="joy-tips__heading">
                        <slot name="tips-title"/>
                    </div>

                    <slot name="tips-content"/>
                </div>
                <div class="joy-tips__cta">
                    <slot name="tips-cta"/>
                </div>

            </div>
        );
    }
}
