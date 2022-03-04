import {Component, h} from '@stencil/core';

/**
 * @slot default - The actual text.
 */
@Component({
    tag: 'joy-text',
    styleUrl: 'text.scss',
    shadow: true,
})
export class Text {
    render() {
        return (
            <div>
                <slot />
            </div>
        );
    }
}
