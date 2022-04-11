import {Component, Prop, h, Element, Host} from '@stencil/core';
import {LabelSizes} from '../../types';

@Component({
    tag: 'joy-label',
    styleUrl: 'label.scss',
    shadow: true,
})
export class Label {
    @Element() host!: HTMLJoyLabelElement;

    /** Label size **/
    @Prop() size: LabelSizes = 'medium';

    render() {
        return (
            <Host
                class={{
                    'joy-label': true,
                    [`joy-label--${this.size}`]: true,
                }}
            >
                <slot />
            </Host>
        );
    }
}
