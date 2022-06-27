import {Component, Element, Host, h, Prop, State, Watch, Build} from '@stencil/core';
import {IconsSizes, IconColors} from '../../types';
import {getSvgContent, joyIconContent} from './requests';
import {getIconUrl} from './utils';

@Component({
    tag: 'joy-icon',
    styleUrl: 'style/icon.scss',
    assetsDirs: ['icons'],
    shadow: true,
})
export class Icon {
    private io?: IntersectionObserver;

    @Element() el!: HTMLJoyIconElement;
    /**
     * Defines a non-visible legend
     */
    @Prop({reflect: true}) ariaLabel?: string;
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
    /**
     * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
     * Default, `false`.
     */
    @Prop() lazy = true;

    @State() private svgContent?: string;
    @State() private loading = false;
    @State() private isVisible = false;

    get colorClass() {
        return this.color ? {[`joy-icon--${this.color}`]: true} : null;
    }

    get sizeClass() {
        return this.size ? {[`joy-icon--${this.size}`]: true} : null;
    }

    get elementClass() {
        return this.customClass ? {[this.customClass]: true} : null;
    }

    connectedCallback() {
        // purposely do not return the promise here because loading
        // the svg file should not hold up loading the app
        // only load the svg if it's visible
        this.waitUntilVisible(this.el, '50px', () => {
            this.isVisible = true;
            this.loadIcon();
        });
    }

    @Watch('name')
    loadIcon() {
        if (Build.isBrowser && this.isVisible) {
            const url = getIconUrl(this.name);

            if (url) {
                if (joyIconContent.has(url)) {
                    // sync if it's already loaded
                    this.svgContent = joyIconContent.get(url);
                } else {
                    // async if it hasn't been loaded
                    getSvgContent(url, true).then(() => (this.svgContent = joyIconContent.get(url)));
                }
            }
        }
    }

    private waitUntilVisible(el: HTMLJoyIconElement, rootMargin: string, cb: () => void) {
        if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && (window as any).IntersectionObserver) {
            const io = (this.io = new (window as any).IntersectionObserver(
                (data: IntersectionObserverEntry[]) => {
                    if (data[0].isIntersecting) {
                        io.disconnect();
                        this.io = undefined;
                        cb();
                    }
                },
                {rootMargin},
            ));

            io.observe(el);
        } else {
            // browser doesn't support IntersectionObserver
            // so just fallback to always show it
            cb();
        }
    }

    render() {
        return (
            <Host role="img" class={{...this.elementClass, ...this.colorClass}}>
                <div
                    class={{
                        'joy-icon': true,
                        'joy-icon--loaded': !this.loading,
                        ...this.sizeClass,
                        'joy-icon--bicolor': this.bicolor,
                        'joy-icon--full': this.full,
                        'joy-icon--clickable': this.clickable,
                    }}
                >
                    {Build.isBrowser && this.svgContent ? <div class="joy-icon-inner" innerHTML={this.svgContent} /> : <div class="joy-icon-inner" />}
                </div>
            </Host>
        );
    }
}
