import {E2EPage, newE2EPage} from '@stencil/core/testing';

async function clickOnTrigger(page: E2EPage) {
    const trigger = await page.find('joy-tooltip-trigger');
    await trigger.click();
    await page.waitForChanges();
}

describe('Tooltip - e2e', () => {
    it('should display a primary tooltip when I click on trigger element, left-aligned, and destroy it on click outside', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tooltip-trigger event="click" style="margin-left: 50px;">
                    <p slot="tooltip-trigger">I am the trigger to click</p>
                    <p slot="tooltip-content">I am the tooltip content</p>
            </joy-tooltip-trigger>
            <div class="outside">Click outside !</div>
        `);

        await clickOnTrigger(page);
        const result = await page.compareScreenshot('Blue tooltip, aligned left.');
        expect(result).toMatchScreenshot();

        const outside = await page.find('.outside');
        await outside.click();
        await page.waitForChanges();
        const result2 = await page.compareScreenshot('Tooltip destroyed');
        expect(result2).toMatchScreenshot();
    });

    it('should display a primary tooltip when I click on trigger element, right-aligned according to trigger', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tooltip-trigger event="click" position="right" style="margin-left: 50px;">
                    <p slot="tooltip-trigger">I am the trigger to click, the content is right-aligned</p>
                    <p slot="tooltip-content">I am the tooltip content</p>
            </joy-tooltip-trigger>
        `);

        await clickOnTrigger(page);
        const result = await page.compareScreenshot('Blue tooltip, aligned right.');
        expect(result).toMatchScreenshot();
    });

    it('should display a secondary tooltip when I mouseenter trigger element, and destroy it when mouseout is fired', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tooltip-trigger class="trigger" variant="secondary"  style="margin-left: 50px;">
                    <p slot="tooltip-trigger">I am the trigger to hover, the content is left-aligned</p>
                    <p slot="tooltip-content">I am the tooltip content</p>
            </joy-tooltip-trigger>
        `);

        await page.hover('.trigger');
        await page.waitForChanges();

        const result = await page.compareScreenshot('Secondary / white-ish tooltip, aligned left.');
        expect(result).toMatchScreenshot();
    });

    it('should display a primary tooltip - RIGHT SIDE - with a default margin to prevent tooltip to be out of the browser', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tooltip-trigger event="click" position="right" style="float: right;">
                    <p slot="tooltip-trigger">I am the trigger to click</p>
                    <p slot="tooltip-content">I am the tooltip content</p>
            </joy-tooltip-trigger>
        `);

        await clickOnTrigger(page);
        const result = await page.compareScreenshot('Blue tooltip, aligned right with default margin.');
        expect(result).toMatchScreenshot();
    });

    it('should display a primary tooltip - RIGHT SIDE - with a default margin to prevent tooltip to be out of the browser', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tooltip-trigger event="click">
                    <p slot="tooltip-trigger">I am the trigger to click</p>
                    <p slot="tooltip-content">I am the tooltip content</p>
            </joy-tooltip-trigger>
        `);

        await clickOnTrigger(page);
        const result = await page.compareScreenshot('Blue tooltip, aligned left with default margin.');
        expect(result).toMatchScreenshot();
    });
});
