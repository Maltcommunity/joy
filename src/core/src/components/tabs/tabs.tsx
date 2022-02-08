import {Component, Prop, h, Element, Host, EventEmitter, Event, Watch} from '@stencil/core';

/**
 * @slot tab-button - Use it for each joy-tab-button you need
 * @slot tab-content - Use it for each joy-tab you need. Please note that joy-tabs doesn' have shadowDOM, to prevent issues with forms.
 */
@Component({
    tag: 'joy-tabs',
    styleUrl: 'tabs.scss',
    shadow: true,
})
export class JoyTabs {
    @Element() host!: HTMLJoyTabsElement;

    /** Use this prop to activate a specific tab by default by giving its name */
    @Prop({reflect: true, mutable: true}) selectedTab!: string;

    /** Use this prop to specify that your joy-tabs is made of links, and tabs are not updated on the fly */
    @Prop() sync = false;

    /** If you wanna catch the tab selection in the whole component, use this event */
    @Event() joyTabSelected!: EventEmitter<Tab>;

    @Watch('selectedTab')
    setCurrentTab() {
        if (this.selectedTab) {
            this.updateTabContent();
            this.updateTabButtons(this.selectedTab);
        }
    }

    connectedCallback() {
        this.setCurrentTab();
    }

    render() {
        return (
            <Host class="joy-tabs" onJoyTabButtonClick={this.updateTabs}>
                <div class="joy-tabs-buttons" role="tablist">
                    <slot name="tab-button" />
                </div>
                <div>
                    <slot name="tab-content" />
                </div>
            </Host>
        );
    }

    private get tabs(): HTMLJoyTabElement[] {
        return Array.from(this.host.querySelectorAll('joy-tab'));
    }

    /**
     * This private method is used to set a default selected tab at runtime
     * @param {String} selectedTab - the id or name of the tab we need to select
     * @private
     */
    private programmaticallySelectTab(selectedTab: string) {
        /**
         * We use async IIFE in order to prevent await calls in updateTabButtons
         */
        (async () => {
            await customElements.whenDefined('joy-tab-button');
            const tab = this.host.querySelector(`joy-tab-button[tab="${selectedTab}"]`) as HTMLJoyTabButtonElement;
            await tab.selectTabButton(true);
        })();
    }

    private updateTabButtons(selectedTab: string, ev: CustomEvent<Tab> | null = null) {
        const tabsButtons = Array.from(this.host.querySelectorAll('joy-tab-button'));
        const tabBnToUnselect = tabsButtons.filter((btn) => btn.getAttribute('tab') !== selectedTab);

        if (tabBnToUnselect.length) {
            tabBnToUnselect.forEach(async (btn) => {
                await btn.selectTabButton(false);
            });
        }
        /**
         * In case of programmaticallySelectTab, we have no CustomEvent
         */
        if (ev === null) {
            this.programmaticallySelectTab(selectedTab);
        }
    }

    private updateTabContent() {
        /* TODO : find a way to handle joy-tab rendered with asynchronous joy-tab rendering */
        const selectedTab = this.findTabToActivate(this.tabs, this.selectedTab);
        this.tabs.forEach((tab) => (tab.selected = false));

        if (selectedTab) {
            selectedTab.selected = true;
        }
    }

    private findTabToActivate = (tabs: HTMLJoyTabElement[], selectedTab: string): HTMLJoyTabElement | undefined => {
        const tabEl = tabs.find((t) => t.tab === selectedTab);

        if (!tabEl && !this.sync) {
            console.error(`tab with id: ${selectedTab} does not exist`);
        }

        return tabEl;
    };

    private updateTabs = (ev: CustomEvent<Tab>) => {
        const {selectedTab} = ev.detail;
        this.selectedTab = selectedTab;

        this.updateTabButtons(selectedTab, ev);
        this.updateTabContent();

        this.joyTabSelected.emit(ev.detail);
    };
}
