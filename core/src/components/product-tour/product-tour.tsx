import {computePosition, flip, shift, offset, arrow, autoUpdate} from '@floating-ui/dom';
import {Component, Event, EventEmitter, Element, h, Host, Listen, Method, Prop} from '@stencil/core';
import {Positions} from '../../types';
import {createBackDrop} from '../../utils';
import {hideProductTour} from './product-tour-service';

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

    @Element() host!: HTMLJoyProductTourElement;

    @Event({eventName: 'joy-product-tour-dismiss'}) joyProductTourDismiss!: EventEmitter<HTMLJoyProductTourElement>;

    /**
     * @param {HTMLElement} fromElement - Specify which DOM element you want to highlight with your product tour
     */
    @Method()
    async showProductTour(fromElement: HTMLElement): Promise<void> {
        this.host.style.display = 'block';

        if (this.host.ownerDocument.contains(fromElement)) {
            // Basic check to verify if consumer has given a valid DOM element
            this.elementToHighlight = fromElement;
            await createBackDrop('product-tour', this.host.parentElement!);
            this.setHighlightedElementStyle(true);
            this.calculateProductTourPosition(fromElement);
            this.overrideBackdropZIndex();
        }
    }

    @Method()
    async closeProductTour(): Promise<void> {
        this.dismissProductTour();
    }

    @Listen('backdropClick', {target: 'document'})
    backdropClick(event: CustomEvent) {
        if (event.detail !== 'product-tour') {
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

    private setHighlightedElementStyle(open: boolean) {
        const position = getComputedStyle(this.elementToHighlight).position;

        if (open) {
            if (position === 'static') {
                this.elementToHighlight.style.position = 'relative';
            }
            this.elementToHighlight.style.zIndex = this.hostZIndex;
        } else {
            this.elementToHighlight.style.position = '';
            this.elementToHighlight.style.zIndex = '';
        }
    }

    private calculateProductTourPosition(el: HTMLElement) {
        autoUpdate(el, this.host, () => {
            computePosition(el, this.host, {
                placement: this.position,
                middleware: [
                    offset(30),
                    shift(),
                    flip(),
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
        this.setHighlightedElementStyle(false);
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
                    <div class="joy-product-tour__footer">
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
