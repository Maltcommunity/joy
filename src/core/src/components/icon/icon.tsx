import {Component, Host, h, Prop, State, Watch} from '@stencil/core';
import {IconsSizes, IconColors} from '../../types';

@Component({
    tag: 'joy-icon',
    styleUrl: 'icon.scss',
    assetsDirs: ['__mocks__', 'assets'],
})
export class Icon {
    /**
     * Defines a non-visible legend
     */
    @Prop({mutable: true, reflect: true}) ariaLabel?: string;
    /**
     * Two-tone icon when set to true
     */
    @Prop() bicolor = false;
    /**
     * Color change on hover
     */
    @Prop() clickable = false;
    /**
     * The icon color
     */
    @Prop() color?: IconColors = 'teal';
    /**
     * The icon custom class(es), if needed
     */
    @Prop() customClass?: string;
    /**
     * Full colored icon when set to true
     */
    @Prop() full = false;
    /**
     * The icon svg filename
     */
    @Prop() name = 'bell';
    /**
     * The icon size
     */
    @Prop() size?: IconsSizes;

    @State() private svgContent?: string;
    @State() private loading = false;

    get colorClass() {
        return this.color ? {[`joy-i-wc_${this.color}`]: true} : null;
    }

    get sizeClass() {
        return this.size ? {[`joy-i-wc_${this.size}`]: true} : null;
    }

    get elementClass() {
        return this.customClass ? {[this.customClass]: true} : null;
    }

    async connectedCallback() {
        await this.loadIcon();
    }

    @Watch('name')
    async loadIcon() {
        this.svgContent = `#${this.name}`;

        const label = this.name;
        if (!this.ariaLabel) {
            if (label) {
                this.ariaLabel = label.replace(/-/g, ' ');
            }
        }
    }

    render() {
        return (
            <Host
                role="img"
                class={{
                    'joy-i-wc': true,
                    'joy-i-wc_loaded': !this.loading,
                    ...this.colorClass,
                    ...this.sizeClass,
                    'joy-i-wc_bg': this.bicolor,
                    'joy-i-wc_full': this.full,
                    'joy-i-wc_clickable': this.clickable,
                    ...this.elementClass,
                }}
            >
                <svg>
                    <use xlinkHref={this.svgContent}></use>
                </svg>
            </Host>
        );
    }
}
