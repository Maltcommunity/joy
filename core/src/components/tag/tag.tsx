import {Component, Element, Prop, h, Host, Event, EventEmitter, State} from '@stencil/core';
import {HyperLinksTargets, TagVariants, TagSizes} from '../../types';

@Component({
    tag: 'joy-tag',
    styleUrl: 'tag.scss',
    shadow: true,
})
export class JoyTag {
    @Element() host!: HTMLElement;
    /** Display an icon CTA on the right, to remove the tag from a list. Only for primary/secondary */
    @Prop() removable = false;
    /** Mock a radio like style. Nothing more. Only for primary/secondary */
    @Prop() selectable = false;
    /** If the tag is a link, give it an href */
    @Prop() href?: string;
    /** Native target attribute for hyperlinks. */
    @Prop() target?: HyperLinksTargets;
    /** Tag color theme */
    @Prop() variant: TagVariants = 'primary';
    /** Tag size. Default is medium */
    @Prop() size: TagSizes = 'medium';
    /**
     * Fired only if we've set the clickable prop
     */
    @Event() joyTagClick!: EventEmitter<{name: string; selected: boolean}>
    /**
     * Fired only if we've click on removable tag
     */
    @Event() joyTagRemove!: EventEmitter<string>

    /** State linked to selectable prop. Can't work without it */
    @State() selected = false;

    get selectableVariants(): TagVariants[] {
        return ['primary', 'secondary'];
    }

    private onClick = () => {
        if (this.selectable && this.selectableVariants.includes(this.variant)) {
            this.selected = !this.selected;
            this.joyTagClick.emit({
                name: '',
                selected: this.selected,
            });
        }
    }

    get iconSize() {
        switch (this.size) {
            case 'large':
                return 'small';
            case 'medium':
                return 'xsmall';
            case 'small':
                return 'xxsmall';
            case 'xsmall':
                return 'xxsmall';
            default:
                return 'xsmall';
        }
    }

    private onRemove = () => {
        this.joyTagRemove.emit(this.host.textContent || '');
    }


    render() {
        const draggable = this.host.hasAttribute('draggable');
        const variant = `joy-tag_${this.variant}`;
        const size = `joy-tag_${this.size}`;

        const hostClasses = {
            'joy-tag__selected': this.selected,
            'joy-tag__has-link': !!this.href || this.selected,
            'joy-tag_draggable': draggable,
            [size]: true,
            [variant]: true,
        };

        const TagSelector = this.href ? 'a' : 'div';
        let props = {};

        if (this.href) {
            props = {
                target: this.target,
                href: this.href,
            };
        }

        if (this.selectable) {
            props = {tabindex: 0};
        }

        const wrapperClasses = {
            'joy-tag__wrapper': true,
            'joy-tag__link': !!this.href,
        };

        return (
            <Host class={{...hostClasses}} onClick={this.onClick}>
                <TagSelector {...props} class={{
                    ...wrapperClasses,
                }}>
                    {draggable && <joy-icon class="joy-tag__drag" name="drag" size={this.iconSize}></joy-icon>}
                    <slot />
                    {this.removable && <joy-icon onClick={this.onRemove} class="joy-tag__removable" name="cross" size={this.iconSize}></joy-icon>}
                </TagSelector>
            </Host>
        );
    }
}
