import {Component, Event, EventEmitter, h, Prop} from '@stencil/core';

@Component({
    tag: 'joy-placeholder-button',
    styleUrl: 'placeholder-button.scss',
    shadow: true,
})
export class PlaceholderButton {
    /**
     * Placeholder button sizes.
     */
    @Prop() size: 'small' | 'medium' | 'large' = 'medium';
    /**
     * use @joyPlaceholderButtonClick="yourMethod" for Vue apps
     */
    @Event({
        bubbles: true,
        eventName: 'joyPlaceholderButtonClick',
    })
    placeholderButtonClick!: EventEmitter<void>;

    private onClick = () => {
        this.placeholderButtonClick.emit();
    };

    get sizeClass() {
        return this.size ? {[`joy-placeholder-button__${this.size}`]: true} : null;
    }

    render() {
        return (
            <button
                type="button"
                class={{
                    'joy-placeholder-button': true,
                    ...this.sizeClass,
                }}
                onClick={this.onClick}
            >
                <joy-icon name="add"></joy-icon>
            </button>
        );
    }
}
