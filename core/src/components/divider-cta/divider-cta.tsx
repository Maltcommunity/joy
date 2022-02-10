import {Component, Prop, h} from '@stencil/core';
import {DividerCTASizes} from '../../types';

@Component({
    tag: 'joy-divider-cta',
    styleUrl: 'divider-cta.scss',
    shadow: false,
})
export class DividerCta {
    /**
     * The CTA text
     */
    @Prop() text: string = '+ Add content';
    /**
     * Divider size. 2 possible values : 100% width or adjusted size according to text
     */
    @Prop() size: DividerCTASizes = 'default';

    render() {
        return (
            <button
                type="button"
                class={{
                    'joy-divider-cta': true,
                    'joy-divider-cta__small': this.size === 'small',
                }}
            >
                <span>{this.text}</span>
            </button>
        );
    }
}
