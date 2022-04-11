import {Component, h, Method, Prop} from '@stencil/core';
import {Direction} from '../../types';

@Component({
    tag: 'joy-step',
    styleUrl: 'style/step.scss',
    shadow: true,
})
export class Step {
    private isLast = false;

    /** If the step is completed. **/
    @Prop({mutable: true, reflect: true}) completed = false;
    /** If the step is ongoing. **/
    @Prop({mutable: true, reflect: true}) ongoing = false;
    /** Default or small. **/
    @Prop() size: 'small' | 'default' = 'default';
    /** Used to change style for mobile. **/
    @Prop({mutable: true}) direction: Direction = 'horizontal';

    /** Marks the step as completed */
    @Method()
    async setCompleted() {
        this.completed = true;
    }

    /** Marks the step as ongoing */
    @Method()
    async setOnGoing() {
        this.ongoing = true;
    }

    /**
     * Marks the direction as vertical or horizontal
     * @param {String} direction - horizontal or vertical
     * */
    @Method()
    async setDirection(direction: Direction) {
        this.direction = direction;
    }

    /** @internal - allows to style the last child of stepper. **/
    @Method()
    async setAsLast() {
        this.isLast = true;
    }

    render() {
        return (
            <div
                class={{
                    'joy-step': true,
                    'joy-step--completed': this.completed,
                    'joy-step--ongoing': this.ongoing,
                    'joy-step--last': this.isLast,
                    [`joy-step--size-${this.size}`]: true,
                    [`joy-step--direction-${this.direction}`]: true,
                }}
            >
                <slot />
            </div>
        );
    }
}
