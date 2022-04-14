import {Component, h, Host, Prop} from '@stencil/core';
import {TooltipVariants} from '../../types';

/**
 * @slot tooltip-content - The content that will be cloned and injected in the actual tooltip. This slot content is hidden.
 */
@Component({
    tag: 'joy-tooltip',
    styleUrl: 'tooltip.scss',
    shadow: true,
})
export class Tooltip {
    /** Color theme. 2 possible values */
    @Prop() variant: TooltipVariants = 'primary';
    /** Tooltip position. 2 possible values */
    @Prop() position: 'left' | 'right' = 'left';

    private get variantClass() {
        return {['joy-tooltip__' + this.variant]: true};
    }

    private get positionClass() {
        return {['joy-tooltip__' + this.position]: true};
    }

    render() {
        return (
            <Host
                class={{
                    'joy-tooltip': true,
                    ...this.variantClass,
                    ...this.positionClass,
                }}
            >
                <slot name="tooltip-content" />
            </Host>
        );
    }
}
