import {computePosition, flip, shift, offset, arrow, autoUpdate} from '@floating-ui/dom';
import {Component, Event, EventEmitter, Element, h, Host, Listen, Method, Prop} from '@stencil/core';
import {Positions} from '../../types';
import {createBackDrop} from '../../utils';
import {hideProductTour} from './product-tour-service';


/**
 * @slot product-tour-preheader - If you need to insert specific content before the actual title
 * @slot product-tour-header - The product-tour main title
 * @slot product-tour-content - The product-tour main content
 * @slot product-tour-dismiss - Product-tour CTA made to cancel component. Can be used multiple times if needed
 * @slot product-tour-next - Product-tour CTA made to trigger another product-tour instance. Use joy-product-tour-trigger component for this.
 */
@Component({
    tag: 'joy-product-tour',
    styleUrl: 'product-tour.scss',
    shadow: true,
})
export class ProductTour {
    private hasPreHeader = false;
    private arrow!: HTMLElement;
    private elementToHighlight!: HTMLElement;

    private get dismissCta(): HTMLElement[] | null {
        return Array.from(this.host.querySelectorAll('[slot="product-tour-dismiss"]'));
    }

    constructor() {
        this.closeProductTour = this.closeProductTour.bind(this);
    }

    /** Icon name, placed left to the title */
    @Prop() icon?: string;
    /** If multiple product tour are need, specify the amount */
    @Prop() steps?: number;
    /** If multiple product tour are need, specify the current step number */
    @Prop() step? = 1;
    /** Product tour position according to highlighted content */
    @Prop() position: Positions = 'right';
    /** Product tour open state */
    @Prop({reflect: true}) open = false;
    /** Set a max width for your container */
    @Prop() maxWidth? = 500;
    /** Product-tour can be hidden by 3 elements by default, dismiss bottom CTA, top-right corner icon, and backdrop. If you don't want the backdrop click to close the product-tour, use "not-backdrop" value.  */
    @Prop() dismissedBy: 'all' | 'not-backdrop' = 'not-backdrop';

    @Element() host!: HTMLJoyProductTourElement;

    @Event({eventName: 'joy-product-tour-dismiss'}) joyProductTourDismiss!: EventEmitter<HTMLJoyProductTourElement>;

    /**
     * @param {HTMLElement} fromElement - Specify which DOM element you want to highlight with your product tour
     * @param {Function} callback - Function triggered after product-tour display
     */
    @Method()
    async showProductTour<T>(fromElement: HTMLElement, callback?: () => T): Promise<void> {
        this.host.style.display = 'block';

        if (this.host.ownerDocument.contains(fromElement)) {
            // Basic check to verify if consumer has given a valid DOM element
            this.elementToHighlight = fromElement;
            await createBackDrop('product-tour', this.host.parentElement!);
            this.setHighlightedElementStyle();
            this.calculateProductTourPosition(fromElement);
            this.overrideBackdropZIndex();

            if(callback) {
                callback();
            }
        }
    }

    @Method()
    async closeProductTour(): Promise<void> {
        this.dismissProductTour();
    }

    @Listen('backdropClick', {target: 'document'})
    backdropClick(event: CustomEvent) {
        if (event.detail !== 'product-tour' || this.dismissedBy === 'not-backdrop') {
            return;
        }

        hideProductTour();
        this.joyProductTourDismiss.emit(this.host);
    }

    get hostZIndex(): string {
        const style = getComputedStyle(this.host);
        return style.getPropertyValue('--product-tour-z-index');
    }

    private overrideBackdropZIndex() {
        this.host.ownerDocument.querySelector('joy-backdrop')!.style.zIndex = (parseInt(this.hostZIndex) - 1).toString();
    }

    private setHighlightedElementStyle() {
        const {left, top, height, width} = this.elementToHighlight.getBoundingClientRect();
        const style = getComputedStyle(this.host.ownerDocument.querySelector('joy-backdrop')!);
        const padding = style.getPropertyValue('--backdrop-spotlight-padding');

        const spotlight = document.createElement('div');
        spotlight.style.left = left - parseInt(padding) + 'px';
        spotlight.style.top = top - parseInt(padding)  + 'px';
        spotlight.style.width = width  + 'px';
        spotlight.style.height = height  + 'px';

        spotlight.classList.add('joy-backdrop--spotlight');
        this.host.ownerDocument.querySelector('joy-backdrop')!.appendChild(spotlight);
    }

    private calculateProductTourPosition(el: HTMLElement) {
        autoUpdate(el, this.host, () => {
            computePosition(el, this.host, {
                placement: this.position,
                middleware: [
                    offset(30),
                    shift(),
                    flip({
                        fallbackPlacements: ['bottom', 'top'],
                    }),
                    arrow({
                        element: this.arrow,
                    }),
                ],
            }).then(({x, y, placement, middlewareData}) => {
                Object.assign(this.host.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });

                // Accessing the data
                const {x: arrowX, y: arrowY} = middlewareData.arrow;

                const staticSide = ({
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                } as any)[placement.split('-')[0]];

                Object.assign(this.arrow.style, {
                    left: arrowX != null ? `${arrowX}px` : '',
                    top: arrowY != null ? `${arrowY}px` : '',
                    right: '',
                    bottom: '',
                    [staticSide]: '-13px',
                });
            });
        });
    }

    private dismissProductTour = (): void => {
        this.host.style.display = '';
        this.setHighlightedElementStyle();
        hideProductTour();
        this.joyProductTourDismiss.emit(this.host);
    };

    connectedCallback() {
        this.host.style.setProperty('--product-tour-width', this.maxWidth + 'px');
        this.hasPreHeader = !!this.host.querySelector('[slot="product-tour-preheader"]');
        this.dismissCta?.forEach((cta) => cta.addEventListener('click', this.closeProductTour));
    }

    disconnectedCallback() {
        this.dismissCta?.forEach((cta) => cta.addEventListener('click', this.closeProductTour));
    }

    render() {
        return (
            <Host role="tooltip">
                <div ref={(el) => (this.arrow = el as HTMLElement)} class="joy-product-tour__arrow"></div>
                <div
                    class={{
                        'joy-product-tour': true,
                        'joy-product-tour--open': this.open,
                        [`joy-product-tour--${this.position}`]: true,
                    }}
                >
                    <div
                        class={{
                            'joy-product-tour__preheader': true,
                            'joy-product-tour__hasPreheader': this.hasPreHeader,
                        }}
                    >
                        <div>
                            <slot name="product-tour-preheader" />
                        </div>
                        <joy-icon tabindex="0" name="cross" onClick={this.dismissProductTour} />
                    </div>
                    <div class="joy-product-tour__content">
                        {this.icon && <joy-icon name={this.icon} size="medium" />}
                        <div>
                            <div class="joy-product-tour__header">
                                <slot name="product-tour-header" />
                            </div>
                            <slot name="product-tour-content" />
                        </div>
                    </div>
                    <div
                         class={{
                             'joy-product-tour__footer': true,
                             'joy-product-tour__footer--no-steps': !this.steps
                         }}
                    >
                        {this.steps && (
                            <span class="joy-product-tour__footer___steps">
                                {this.step}/{this.steps}
                            </span>
                        )}
                        <div class="joy-product-tour__footer___cta">
                            <slot name="product-tour-dismiss" />
                            <slot name="product-tour-next" />
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
