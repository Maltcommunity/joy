import {Component, Element, Event, EventEmitter, h, Host, Method, Prop} from '@stencil/core';
import {Tab} from '../../types';

@Component({
    tag: 'joy-tab-button',
    styleUrl: 'tab-button.scss',
    shadow: true,
})
export class JoyTabButton {
    @Element() host!: HTMLJoyTabButtonElement;

    /** Tab selection state */
    @Prop({mutable: true, reflect: true}) selected = false;
    /**
     * A tab id or name must be provided for each `joy-button-tab`. It's used internally to reference
     * the selected tab
     */
    @Prop({reflect: true}) tab!: string;
    /**
     * If your tab is a link, give the URL
     */
    @Prop() href?: string;

    /**
     * "data-heap" attribute to set on the link if an {@link href} prop is passed or on the host otherwise..
     */
    @Prop() heapId?: string;

    /** Event used by joy-tabs parent component. Prefer using joyTabSelected event from joy-tabs if you want to listen to any tab change */
    @Event({eventName: 'joy-tab-button-click'}) joyTabButtonClick!: EventEmitter<Tab>;

    /**
     * Set the tabulation selected or not
     * @param {Boolean} status
     * */
    @Method()
    async selectTabButton(status: boolean): Promise<void> {
        this.selected = status;
    }

    async componentDidRender() {
        if (this.selected) {
            await this.selectTabButton(true);
        }
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
                    <a
                        href={href}
                        class={{
                            'joy-tab-button__link-selected': selected,
                        }}
                        data-heap={this.heapId}
                    >
                        <slot />
                    </a>
                ) : (
                    <button type="button">
                        <slot />
                    </button>
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
