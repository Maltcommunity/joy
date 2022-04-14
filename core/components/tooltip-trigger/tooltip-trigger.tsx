import {Component, Element, h, Prop, Host} from '@stencil/core';
import {getShadowDom, onClickOutside} from '../../utils';
import {TooltipVariants} from '../../types';

/**
 * @slot tooltip-trigger - The element you need to interact with, to display the tooltip
 * @slot tooltip-content - The content that will be cloned and injected in the actual tooltip. This slot content is hidden.
 */
@Component({
    tag: 'joy-tooltip-trigger',
    styleUrl: 'tooltip.scss',
    shadow: true,
})
export class TooltipTrigger {
    @Element() host!: HTMLJoyTooltipTriggerElement;
    private tooltipElement: HTMLJoyTooltipElement | null = null;
    private tooltipArrowWith = 20;
    private tooltipArrowHeight = 10;
    private placementLimit = 25;
    private destroyFn!: () => void;

    /** Use basic selector to inject the tooltip in a specific DOM location. Default is body */
    @Prop() appendTo: 'body' | 'host' = 'body';
    /** Define the event needed to display the tooltip */
    @Prop() event: 'mouseenter' | 'click' = 'mouseenter';
    /** Color theme. 2 possible values */
    @Prop() variant: TooltipVariants = 'primary';
    /** Tooltip position. 2 possible values */
    @Prop() position: 'left' | 'right' = 'left';
    /** Allows to override tooltip size. Allows to more easily calculate its position */
    @Prop() tooltipWidth = 250;

    private get rootElement() {
        const body = document.body;

        if (this.appendTo === 'body') {
            return body;
        }

        return getShadowDom(this.host, body);
    }

    private setTooltipLeft(tooltip: HTMLJoyTooltipElement) {
        const clientRect = this.host.getBoundingClientRect();
        let targetToLeft = clientRect.left - this.tooltipArrowWith;
        targetToLeft < this.placementLimit ? (targetToLeft = this.placementLimit) : targetToLeft;

        if (clientRect.left <= this.placementLimit) {
            tooltip.style.left = `${this.placementLimit}px`;
        }

        tooltip.style.left = this.appendTo !== 'body' ? '0' : `${targetToLeft}px`;
    }

    private setTooltipRight(tooltip: HTMLJoyTooltipElement) {
        const clientRect = this.host.getBoundingClientRect();
        const targetToRight = clientRect.right - this.tooltipWidth + this.tooltipArrowWith;

        if (document.body.clientWidth - clientRect.right <= this.placementLimit) {
            tooltip.style.right = `${this.placementLimit}px`;
        } else {
            tooltip.style.left = this.appendTo !== 'body' ? '0' : `${targetToRight}px`;
        }
    }

    private setTooltipPosition(tooltip: HTMLJoyTooltipElement) {
        const clientRect = this.host.getBoundingClientRect();
        const targetTopPosition = clientRect.top + clientRect.height;
        const targetToTop = window.pageYOffset + targetTopPosition + this.tooltipArrowHeight;

        tooltip.style.top = this.appendTo !== 'body' ? `${clientRect.height}px` : `${targetToTop}px`;

        if (this.position === 'left') {
            this.setTooltipLeft(tooltip);
        } else {
            this.setTooltipRight(tooltip);
        }
    }

    private slotContent(slotName: string): HTMLElement[] {
        let slotNodes: HTMLElement[] = [];

        Array.from(getShadowDom(this.host).querySelectorAll('slot'))
            .filter((slot) => slot.name === slotName)
            .map((slot) => {
                slotNodes = slot.assignedNodes() as HTMLElement[];
            });
        return [...slotNodes];
    }

    private createTooltip() {
        if (!this.tooltipElement) {
            const tooltip = document.createElement('joy-tooltip');

            this.slotContent('tooltip-content').map((node) => {
                const clone = node.cloneNode(true);
                tooltip.appendChild(clone);
            });

            /**
             * Tooltip final style
             */
            tooltip.setAttribute('variant', this.variant);
            tooltip.setAttribute('position', this.position);
            tooltip.style.width = `${this.tooltipWidth}px`;

            this.setTooltipPosition(tooltip);
            this.rootElement.appendChild(tooltip);

            this.tooltipElement = tooltip;

            this.onClickOutsideListener();
            this.destroyOnScroll();
        }
    }

    private onMouseEnter = (e: Event) => {
        if (this.event !== 'mouseenter') {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        this.createTooltip();
    };

    private onMouseLeave = () => {
        if (this.event === 'mouseenter') {
            this.destroyTooltip();
        }
    };

    private onClick = () => {
        if (this.event !== 'click') {
            return;
        }
        this.createTooltip();
    };

    private onClickOutsideListener() {
        if (this.event === 'click') {
            onClickOutside(this.host, this.destroyFn);
        }
    }

    private destroyOnScroll() {
        /**
         * At the moment, we don't deal with fixed positioned triggers.
         * So as soon as scroll is detected, we destroy the component.
         *
         */
        if (window.getComputedStyle(this.host).getPropertyValue('position') === 'fixed') {
            window.addEventListener('scroll', this.destroyFn, {once: true});
        }
    }

    private destroyTooltip() {
        if (this.tooltipElement) {
            this.tooltipElement.remove();
            this.tooltipElement = null;
        }
    }

    connectedCallback() {
        this.destroyFn = this.destroyTooltip.bind(this);
    }

    render() {
        return (
            <Host onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <slot name="tooltip-trigger" />
                <div hidden class="joy-tooltip__content">
                    <slot name="tooltip-content" />
                </div>
            </Host>
        );
    }
}
