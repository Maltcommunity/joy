import {Component, Element, h, Host, Prop} from '@stencil/core';
import {Direction} from '../../types';

@Component({
    tag: 'joy-stepper',
    styleUrl: 'style/stepper.scss',
    shadow: true,
})
export class Stepper {
    @Element() host!: HTMLJoyStepperElement;

    /** Defines the CSS flex horizontal justify distribution **/
    @Prop() justify = false;
    /** Set the step number of the stepper. Will auto-complete each step that is < step. Starts from 0. **/
    @Prop() step = 0;
    /** Used to change style for mobile. **/
    @Prop() direction: Direction = 'horizontal';

    get steps() {
        return Array.from(this.host.querySelectorAll('joy-step'));
    }

    componentWillLoad() {
        this.steps.map(async (step, i) => {
            await step.setDirection(this.direction);

            if (i === this.steps.length - 1) {
                await step.setAsLast();
            }

            if (i < this.step) {
                await step.setCompleted();
            } else if (i === this.step) {
                await step.setOnGoing();
            }
        });
    }

    render() {
        return (
            <Host
                class={{
                    'joy-stepper': true,
                    [`joy-stepper--direction-${this.direction}`]: true,
                    ['joy-stepper--justify']: this.justify,
                }}
            >
                <slot />
            </Host>
        );
    }
}
