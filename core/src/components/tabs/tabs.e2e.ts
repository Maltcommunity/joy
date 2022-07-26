import {E2EElement, E2EPage, newE2EPage} from '@stencil/core/testing';
import {createPage} from '../../tests';

describe('e2e - tabs', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-tabs>
                <joy-tab-button></joy-tab-button>
                <joy-tab></joy-tab>
            </joy-tabs>
        `);
        const tabs: E2EElement = await page.find('joy-tabs');
        const tab: E2EElement = await page.find('joy-tab');
        const tabButton: E2EElement = await page.find('joy-tab-button');

        expect(tabs).toHaveAttribute('hydrated');
        expect(tab).toHaveAttribute('hydrated');
        expect(tabButton).toHaveAttribute('hydrated');
    });

    it('renders tabs with the second one selected by default', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-tabs selected-tab="1">
                <joy-tab-button slot="tab-button" tab="0"></joy-tab-button>
                <joy-tab-button slot="tab-button" class="selected-tab-button" tab="1"></joy-tab-button>
                
                <joy-tab slot="tab-content" tab="0">I am a content</joy-tab>
                <joy-tab slot="tab-content" class="selected-tab" tab="1">I am a content</joy-tab>
            </joy-tabs>
        `);

        const tabButton = await page.find('joy-tab-button[tab="1"].joy-tab-button__selected');
        const tab = await page.find('joy-tab[tab="1"]');

        expect(tabButton).not.toBe(null);
        expect(tab.classList.contains('joy-tab__selected')).toBe(true);
    });

    it('should change tab when I click on specific tab-button', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-tabs selected-tab="1">
                <joy-tab-button slot="tab-button" tab="0"></joy-tab-button>
                <joy-tab-button class="selected-tab-button" slot="tab-button" tab="1"></joy-tab-button>
                
                <joy-tab slot="tab-content" tab="0"></joy-tab>
                <joy-tab class="selected-tab" slot="tab-content" tab="1"></joy-tab>
            </joy-tabs>
        `);
        const tabChange = await page.spyOnEvent('joy-tab-button-click');

        const firstTabButton = await page.find('joy-tabs joy-tab-button[tab="0"]');
        const firstTab = await page.find('joy-tab[tab="0"]');

        /** Click on first tab */
        await firstTabButton.click();
        await page.waitForChanges();
        expect(tabChange).toHaveReceivedEventDetail({
            selectedTab: '0',
            href: '',
        });
        expect(firstTabButton.classList.contains('joy-tab-button__selected')).toBe(true);
        expect(firstTab.classList.contains('joy-tab__selected')).toBe(true);

        /** Click on second tab */
        const secondTabButton = await page.find('joy-tabs joy-tab-button[tab="1"]');
        const secondTab = await page.find('joy-tabs joy-tab[tab="1"]');

        await secondTabButton.click();
        await page.waitForChanges();
        expect(tabChange).toHaveReceivedEventDetail({
            selectedTab: '1',
            href: '',
        });

        expect(firstTabButton.classList.contains('joy-tab-button__selected')).toBe(false);
        expect(firstTab.classList.contains('joy-tab__selected')).toBe(false);

        expect(secondTabButton.classList.contains('joy-tab-button__selected')).toBe(true);
        expect(secondTab.classList.contains('joy-tab__selected')).toBe(true);
    });

    it('should change tab when I use keyboard', async () => {
        const page = await createPage();
        await page.addStyleTag({
            content: 'joy-tab-button {transition: 0.01ms !important}',
        });

        await page.setContent(`
            <joy-tabs selected-tab="0">
                <joy-tab-button slot="tab-button" tab="0">Tab 0</joy-tab-button>
                <joy-tab-button slot="tab-button" tab="1">Tab 1</joy-tab-button>
                <joy-tab-button slot="tab-button" tab="2">Tab 2</joy-tab-button>
                
                <joy-tab slot="tab-content" tab="0">Content tab 0</joy-tab>
                <joy-tab slot="tab-content" tab="1">Content tab 1</joy-tab>
                <joy-tab slot="tab-content" tab="2">Content tab 2</joy-tab>
            </joy-tabs>
        `);

        const firstTabButton = await page.find('joy-tabs joy-tab-button[tab="0"]');

        /** Focus on second tab */
        await firstTabButton.focus();
        await page.keyboard.down('Tab');
        await page.waitForChanges();

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();

        /** Then select second tab **/
        await page.keyboard.down('Enter');
        await page.waitForChanges();
        const result2 = await page.screenshot();
        expect(result2).toMatchImageSnapshot();

        /** Focus on last tab */
        await page.keyboard.down('Tab');
        await page.waitForChanges();
        const result3 = await page.screenshot();
        expect(result3).toMatchImageSnapshot();
    });
});
