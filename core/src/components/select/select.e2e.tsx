import {newE2EPage, E2EPage} from '@stencil/core/testing';

async function resetCssTransition(page: E2EPage) {
    await page.addStyleTag({
        content: '.joy-select__wrapper {--select-transition: 0.01ms !important}',
    });
}

describe('select e2e', () => {
    it('should display a standard select', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-select label="I am a label">
                <joy-option disabled selected value="">Choose an option</joy-option>
                <joy-option value="one">One</joy-option>
            </joy-select>
        `);
        await resetCssTransition(page);

        const basic = await page.compareScreenshot('Basic select');
        expect(basic).toMatchScreenshot();

        const select = await page.find('select');
        await select.focus();
        const focusSelect = await page.compareScreenshot('Basic select on focus');
        expect(focusSelect).toMatchScreenshot();
    });
});
