import {computePosition, flip, offset, arrow, autoUpdate, shift, limitShift} from '@floating-ui/dom';
import {Component, Event, EventEmitter, Element, Fragment, h, Host, Method, Prop, Watch} from '@stencil/core';
import {Positions} from '../../types';

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
    private overlay!: HTMLElement;

    private get dismissCta(): HTMLElement[] | null {
        return Array.from(this.host.querySelectorAll('[slot="product-tour-dismiss"]'));
    }

    constructor() {
        this.closeProductTour = this.closeProductTour.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
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
    @Prop({reflect: true, mutable: true}) open = false;
    /** Set a max width for your container */
    @Prop() maxWidth? = 500;
    /** Product-tour can be hidden by 3 elements by default, dismiss bottom CTA, top-right corner icon, and backdrop. If you don't want the backdrop click to close the product-tour, use "not-backdrop" value. */
    @Prop() dismissedBy: 'all' | 'not-backdrop' = 'not-backdrop';
    /** Overlay is useful to prevent user interactions with elements that are below when the product tour is open.
     * It can be disabled if the highlighted target element needs to be interactive but one of its parent node has its own stacking context (e.g. a parent with a lower z-index).
     * Then the whole page will be interactive. */
    @Prop() disableOverlay = false;

    @Element() host!: HTMLJoyProductTourElement;

    @Event({eventName: 'joy-product-tour-dismiss'}) joyProductTourDismiss!: EventEmitter<HTMLJoyProductTourElement>;

    /**
     * @param {HTMLElement} fromElement - Specify which DOM element you want to highlight with your product tour
     * @param {Boolean} chainingProductTour - Specify if we want to show the product tour after another to prevent backdrop animation
     * @param {Function} callback - Function triggered after product-tour display
     */
    @Method()
    async showProductTour<T>(fromElement: HTMLElement, chainingProductTour = false, callback?: () => T): Promise<void> {
        this.host.style.display = 'block';

        // Basic check to verify if consumer has given a valid DOM element
        if (this.host.ownerDocument.contains(fromElement)) {
            this.elementToHighlight = fromElement;

            if (!this.disableOverlay) {
                this.createOverlay();
            }

            this.addBodyClass();
            this.highlightElement(chainingProductTour);
            this.calculateProductTourPosition(fromElement);

            this.open = true;

            if (callback) {
                callback();
            }
        }
    }

    @Method()
    async closeProductTour(): Promise<void> {
        this.dismissProductTour();
    }

    @Watch('dismissedBy')
    private checkDismissedBy() {
        if (this.dismissedBy === 'all' && this.disableOverlay) {
            console.warn('An overlay is required to be able to dismiss the product tour by clicking on its backdrop');
        }
    }

    private setSpotlightSizeAndPosition(spotlight: HTMLJoyProductTourSpotlightElement) {
        const padding = 'var(--joy-core-spacing-2)';

        const {left, top, height, width} = this.elementToHighlight.getBoundingClientRect();

        spotlight.style.left = `calc(${window.scrollX + left}px - ${padding})`;
        spotlight.style.top = `calc(${window.scrollY + top}px - ${padding})`;
        spotlight.style.width = `${width}px`;
        spotlight.style.height = `${height}px`;
    }

    private createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('joy-product-tour--overlay');

        this.overlay.addEventListener('click', this.handleOverlayClick, {once: true});

        this.overlay.style.position = 'fixed';
        this.overlay.style.top = '0';
        this.overlay.style.left = '0';
        this.overlay.style.width = '100%';
        this.overlay.style.height = '100%';
        this.overlay.style.zIndex = 'var(--joy-core-z-index-backdrop)';

        document.querySelector('body')!.appendChild(this.overlay);
    }

    private removeOverlay() {
        this.host.ownerDocument.querySelector('.joy-product-tour--overlay')!.remove();
    }

    private handleOverlayClick() {
        if (this.dismissedBy === 'not-backdrop') {
            return;
        }

        this.dismissProductTour();
    }

    private addBodyClass() {
        this.host.ownerDocument.body.classList.add('joy-product-tour--open');
    }

    private removeBodyClass() {
        this.host.ownerDocument.body.classList.remove('joy-product-tour--open');
    }

    private highlightElement(chainingProductTour: boolean) {
        this.elementToHighlight.style.position = 'relative';
        this.elementToHighlight.style.zIndex = 'calc(var(--joy-core-z-index-backdrop) + 1)';

        const spotlight = document.createElement('joy-product-tour-spotlight');
        this.setSpotlightSizeAndPosition(spotlight);

        document.querySelector('body')!.appendChild(spotlight);

        if (chainingProductTour) {
            spotlight.classList.add('joy-product-tour-spotlight--no-animation');
        }
    }

    private unhighlightElement() {
        this.elementToHighlight.style.position = '';
        this.elementToHighlight.style.zIndex = '';

        this.getSpotlightElement().remove();
    }

    private getSpotlightElement(): HTMLJoyProductTourSpotlightElement {
        return this.host.ownerDocument.querySelector('joy-product-tour-spotlight')!;
    }

    private calculateProductTourPosition(el: HTMLElement) {
        const spotlight = this.getSpotlightElement();

        autoUpdate(el, this.host, () => {
            this.setSpotlightSizeAndPosition(spotlight);

            computePosition(el, this.host, {
                placement: this.position,
                middleware: [
                    offset(30),
                    shift({
                        limiter: limitShift()
                    }),
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

        this.unhighlightElement();

        if (!this.disableOverlay) {
            this.removeOverlay();
        }

        this.removeBodyClass();

        this.open = false;

        this.joyProductTourDismiss.emit(this.host);
    };

    connectedCallback() {
        this.host.style.setProperty('--product-tour-width', this.maxWidth + 'px');
        this.hasPreHeader = !!this.host.querySelector('[slot="product-tour-preheader"]');
        this.dismissCta?.forEach((cta) => cta.addEventListener('click', this.closeProductTour));
    }

    componentWillLoad() {
        this.checkDismissedBy();
    }

    disconnectedCallback() {
        this.dismissCta?.forEach((cta) => cta.removeEventListener('click', this.closeProductTour));
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
                            <slot name="product-tour-preheader"/>
                        </div>
                        <joy-icon tabindex="0" name="cross" onClick={this.dismissProductTour}/>
                    </div>
                    <div class="joy-product-tour__content">
                        {this.icon && <joy-icon name={this.icon} size="medium"/>}
                        <div>
                            <div class="joy-product-tour__header">
                                <slot name="product-tour-header"/>
                            </div>
                            <slot name="product-tour-content"/>
                        </div>
                    </div>
                    <div class="joy-product-tour__footer">
                        <span class="joy-product-tour__footer___steps">
                            {this.steps && (
                                <Fragment>
                                    {this.step}/{this.steps}
                                </Fragment>
                            )}
                        </span>
                        <div class="joy-product-tour__footer___cta">
                            <slot name="product-tour-dismiss"/>
                            <slot name="product-tour-next"/>
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
