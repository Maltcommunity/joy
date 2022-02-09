import {Component, h, Prop} from '@stencil/core';
import {HyperLinksTargets, IconColors, LinksColors} from '../../types';

@Component({
    tag: 'joy-link',
    styleUrl: 'link.scss',
    shadow: true,
})
export class Link {
    /** Set the href of your link */
    @Prop() href?: string;
    /** If the link as a downloadable content */
    @Prop() download?: string;
    /** Native rel attribute for hyperlinks. See https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/rel */
    @Prop() rel?: string;
    /** Native target attribute for hyperlinks. */
    @Prop() target?: HyperLinksTargets;
    /** Icon name if you want to display one, before the text */
    @Prop() icon?: string;
    /** Color theme. Default is teal, you can set white theme for darker backgrounds. */
    @Prop() theme: LinksColors = 'teal';

    private get iconColor(): IconColors {
        return this.theme === 'white' ? 'white' : 'teal';
    }

    render() {
        const attrs = {
            download: this.download,
            href: this.href,
            rel: this.rel,
            target: this.target,
        };

        return (
            <a
                {...attrs}
                class={{
                    'joy-link': true,
                    'joy-link_teal': this.theme === 'teal',
                    'joy-link_white': this.theme === 'white',
                }}
            >
                {this.icon && <joy-icon color={this.iconColor} name={this.icon}></joy-icon>}
                <slot />
            </a>
        );
    }
}
