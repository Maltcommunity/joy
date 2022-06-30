import {Component, Prop, h, Element, Host, EventEmitter, Event, Watch, Listen} from '@stencil/core';
import {Tab} from '../../types';

/**
 * @slot tab-button - Use it for each joy-tab-button you need
 * @slot tab-content - Use it for each joy-tab you need. Please note that joy-tabs doesn' have shadowDOM, to prevent issues with forms.
 */
@Component({
    tag: 'joy-tabs',
    styleUrl: 'style/tabs.scss',
    shadow: true,
})
export class JoyTabs {
    private nextTabButton!: HTMLJoyTabButtonElement | null;
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

    private getTabs() {
        return Array.from(this.host.querySelectorAll('joy-tab-button'));
    }

    @Listen('keydown', {target: 'body'})
    keyboardNavigation(ev: any) {
        if (ev.target && !this.host.contains(ev.target)) {
            return;
        }

        if (ev.target && this.getTabs().includes(ev.target as HTMLJoyTabButtonElement)) {
            const currentSelectionIndex = this.getTabs().findIndex((tab) => tab === ev.target);

            // If hitting tab key, move to the next tab
            // Unless this is the last tab of the list
            if (['Tab'].includes(ev.code)) {
                if (currentSelectionIndex !== this.getTabs().length - 1) {
                    this.nextTabButton = this.getTabs()[currentSelectionIndex + 1];
                } else {
                    this.nextTabButton = null;
                }
            }

            // If hitting tab key AND shift, move to the prev tab
            if (['Tab'].includes(ev.code) && ev.shiftKey) {
                if (currentSelectionIndex !== 0) {
                    this.nextTabButton = this.getTabs()[currentSelectionIndex - 1];
                } else {
                    this.nextTabButton = null;
                }
            }

            if (ev.code === 'Enter' || ev.code === 'NumpadEnter') {
                if (this.nextTabButton) {
                    if (this.nextTabButton.href) {
                        const link = this.nextTabButton.shadowRoot?.querySelector('a');
                        link?.click();
                    } else {
                        this.nextTabButton.click();
                    }
                } else {
                    this.getTabs()[0].click();
                }
            }

            if (this.nextTabButton && this.getTabs().includes(this.nextTabButton)) {
                ev.preventDefault();
                ev.stopPropagation();

                this.nextTabButton.focus();
            }
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
        const tab = this.host.querySelector(`joy-tab-button[tab="${selectedTab}"]`) as HTMLJoyTabButtonElement;
        tab.selectTabButton(true).then();
    }

    private updateTabButtons(selectedTab: string, ev: CustomEvent<Tab> | null = null) {
        const tabsButtons = Array.from(this.host.querySelectorAll('joy-tab-button'));
        const tabBnToUnselect = tabsButtons.filter((btn) => btn.getAttribute('tab') !== selectedTab);

        if (tabBnToUnselect.length) {
            tabBnToUnselect.map(async (btn) => {
                btn.removeAttribute('selected');
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
    }

    private updateTabs = (ev: CustomEvent<Tab>) => {
        const {selectedTab} = ev.detail;
        this.selectedTab = selectedTab;

        this.updateTabButtons(selectedTab, ev);
        this.updateTabContent();

        this.joyTabSelected.emit(ev.detail);
    }
}
