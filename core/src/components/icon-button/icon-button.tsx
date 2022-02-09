import {Component, Prop, h, Event, EventEmitter} from '@stencil/core';
import {IconButtonColors} from '../../types';

/**
 * @slot default - allows you to directly use <joy-icon> with its params
 */
@Component({
    tag: 'joy-icon-button',
    styleUrl: 'icon-button.scss',
    shadow: true,
})
export class IconButton {
    /**
     * The icon name
     */
    @Prop() icon?: string;
    /**
     * The icon color. Default is the blue version. You can only override it with the white version.
     */
    @Prop() color?: IconButtonColors;
    /**
     * The button type. As the component wraps an actual HTML button element, it will be applied to it.
     */
    @Prop() type?: 'button';

    /**
     * use @joyIconButtonClick="yourMethod" for Vue apps (onJoyIconButtonClick for other stencil components) to handle snackbar close. Nothing is returned
     */
    @Event({
        bubbles: true,
        eventName: 'joyIconButtonClick',
    })
    iconButtonClick!: EventEmitter<void>;

    private onButtonClick = () => {
        this.iconButtonClick.emit();
    };

    get colorIfDefined() {
        return {
            color: this.color || undefined,
        };
    }

    render() {
        return (
            <button type={this.type} class="joy-icon-button" onClick={this.onButtonClick}>
                <slot>
                    <joy-icon name={this.icon} {...this.colorIfDefined}></joy-icon>
                </slot>
            </button>
        );
    }
}
