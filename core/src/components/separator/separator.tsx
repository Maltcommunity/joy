import {Component, Prop, h} from '@stencil/core';
import {SeparatorSizes} from '../../types';

@Component({
    tag: 'joy-separator',
    styleUrl: 'separator.scss',
    shadow: true,
})
export class SeparatorCta {
    /**
     * The separator text
     */
    @Prop() text!: string;
    /**
     * Separator size. 2 possible values : 100% width or adjusted size according to text
     */
    @Prop() size: SeparatorSizes = 'default';

    render() {
        return (
            <div
                class={{
                    'joy-separator': true,
                    'joy-separator__small': this.size === 'small',
                }}
            >
                <span>{this.text}</span>
            </div>
        );
    }
}
