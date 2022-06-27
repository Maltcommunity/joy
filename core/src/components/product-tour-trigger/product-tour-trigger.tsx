import {Component, Element, h, Host, Prop} from '@stencil/core';
import {showProductTour} from '../product-tour/product-tour-service';

@Component({
    tag: 'joy-product-tour-trigger',
    styleUrl: 'product-tour-trigger.scss',
    shadow: true,
})
export class ProductTourTrigger {
    private targetElement?: any;

    @Element() host!: HTMLJoyProductTourTriggerElement;

    /** The ID of the product tour you want to show. Required **/
    @Prop({reflect: true}) productTour!: string;
    /** For dialogs containing joy-indicators with multiple steps, you can specify a step number **/
    @Prop({reflect: true}) step?: number;
    /** Target of the trigger. If none given, it will be this component. **/
    @Prop() target?: string;

    connectedCallback() {
        if (!this.target) {
            return (this.targetElement = this.host);
        }

        const givenTarget = this.host.ownerDocument.querySelector(this.target);
        if (givenTarget) {
            this.targetElement = givenTarget;
        }
    }

    private onClick = async () => {
        await showProductTour(this.productTour, this.targetElement);
    };

    render() {
        return (
            <Host onClick={this.onClick}>
                <slot />
            </Host>
        );
    }
}
