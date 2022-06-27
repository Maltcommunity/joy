import {Component, Element, h, Host, Prop} from '@stencil/core';

@Component({
    tag: 'joy-tags-list',
    styleUrl: 'tags-list.scss',
    shadow: true,
})
export class JoyTagsList {
    @Element() el!: HTMLJoyTagsListElement;

    /** Tags justify-content strategy. **/
    @Prop() align: 'center' | 'left' | 'right' = 'left';

    componentDidLoad() {
        this.specificTagListClass();
    }

    private specificTagListClass() {
        const attr = 'tag-item';
        Array.from(this.el.querySelectorAll('joy-tag')).forEach((tag) => !tag.hasAttribute(attr) && tag.setAttribute(attr, ''));
    }

    private handleSlotChange = () => {
        // Probably a bit too heavy operation
        this.specificTagListClass();
    };

    render() {
        const align = `joy-tags-list joy-tags-list--${this.align}`;
        return (
            <Host>
                <div class={align}>
                    <slot onSlotchange={this.handleSlotChange} />
                </div>
            </Host>
        );
    }
}
