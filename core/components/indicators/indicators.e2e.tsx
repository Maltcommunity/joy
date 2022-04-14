import {E2EPage, newE2EPage} from '@stencil/core/testing';

describe('Indicators e2e', () => {
    it('should render an indicators list with first selected', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-indicators>
                <joy-indicator selected></joy-indicator>
                <joy-indicator></joy-indicator>
                <joy-indicator></joy-indicator>
                <joy-indicator></joy-indicator>
            </joy-indicators>`);

        const result = await page.compareScreenshot('Indicators with first one selected');
        expect(result).toMatchScreenshot();

        const secondIndicator = await page.find('joy-indicator:nth-child(2)');
        await secondIndicator.click();

        const result2 = await page.compareScreenshot('Second indicator is selected');
        expect(result2).toMatchScreenshot();
    });

    it('should render an indicators list with light theme and first one selected', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-indicators variant="light">
                <joy-indicator selected></joy-indicator>
                <joy-indicator></joy-indicator>
                <joy-indicator></joy-indicator>
                <joy-indicator></joy-indicator>
            </joy-indicators>`);

        const result = await page.compareScreenshot('Indicators with first one selected');
        expect(result).toMatchScreenshot();
    });
});
