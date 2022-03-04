import {Component, Element, Event, EventEmitter, h, Host, Method, Prop} from '@stencil/core';

@Component({
    tag: 'joy-tab-button',
    styleUrl: 'tab-button.scss',
    shadow: true,
})
export class JoyTabButton {
    @Element() host!: HTMLJoyTabButtonElement;

    /** Tab selection state */
    @Prop({mutable: true}) selected = false;
    /**
     * A tab id or name must be provided for each `joy-button-tab`. It's used internally to reference
     * the selected tab
     */
    @Prop() tab!: string;
    /**
     * If your tab is a link, give the URL
     */
    @Prop() href?: string;

    /**
     * "data-heap" attribute to set on the link if an {@link href} prop is passed or on the host otherwise..
     */
    @Prop() heapId?: string;

    /** Event used by joy-tabs parent component. Prefer using joyTabSelected event from joy-tabs if you want to listen to any tab change */
    @Event() joyTabButtonClick!: EventEmitter<Tab>;

    async componentDidRender() {
        if (this.selected) {
            await this.selectTabButton(true);
        }
    }

    /**
     * Set the tabulation selected or not
     * @param {Boolean} status
     * */
    @Method()
    async selectTabButton(status: boolean): Promise<void> {
        this.selected = status;
    }

    render() {
        const {tab, href, selected} = this;

        return (
            <Host
                role="tab"
                onClick={this.onClick}
                aria-selected={selected ? 'true' : 'false'}
                aria-controls={`job-tab-${tab}`}
                id={`joy-tab-${tab}`}
                tabindex={this.tabIndex}
                class={{
                    'joy-tab-button': true,
                    'joy-tab-button__selected': selected,
                    'joy-tab-button__link': !!href,
                }}
                data-heap={!href ? this.heapId : undefined}
            >
                {href ? (
                    <a href={href} data-heap={this.heapId}>
                        <slot />
                    </a>
                ) : (
                    <slot />
                )}
            </Host>
        );
    }

    private get tabIndex() {
        const hasTabIndex = this.host.hasAttribute('tabindex');

        if (hasTabIndex) {
            return this.host.getAttribute('tabindex');
        }

        return 0;
    }

    private onClick = async (ev: Event) => {
        if (this.tab !== undefined && !this.href) {
            ev.preventDefault();
            this.joyTabButtonClick.emit({
                selectedTab: this.tab,
                href: this.href || '',
            });
            await this.selectTabButton(true);
        }
    };
}
