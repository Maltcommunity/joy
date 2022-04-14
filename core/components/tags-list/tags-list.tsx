import {Component, Element, h, Host} from '@stencil/core';

@Component({
    tag: 'joy-tags-list',
    styleUrl: 'tags-list.scss',
    shadow: true,
})
export class JoyTagsList {
    @Element() el!: HTMLJoyTagsListElement;

    componentDidLoad() {
        this.specificTagListClass();
    }

    private specificTagListClass() {
        const className = 'joy-tags-list-item';
        Array.from(this.el.querySelectorAll('joy-tag')).forEach((tag) => !tag.classList.contains(className) && tag.classList.add(className));
    }

    private handleSlotChange = () => {
        // Probably a bit too heavy operation
        this.specificTagListClass();
    };

    render() {
        return (
            <Host>
                <slot onSlotchange={this.handleSlotChange} />
            </Host>
        );
    }
}
