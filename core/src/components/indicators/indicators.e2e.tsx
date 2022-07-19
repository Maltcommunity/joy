import {createPage} from '../../tests';

describe('Indicators e2e', () => {
    it('should render an indicators list with first selected', async () => {
        const page = await createPage();
        await page.setContent(`
            <joy-indicators>
                <joy-indicator selected></joy-indicator>
                <joy-indicator></joy-indicator>
                <joy-indicator></joy-indicator>
                <joy-indicator></joy-indicator>
            </joy-indicators>`);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();

        const secondIndicator = await page.find('joy-indicator:nth-child(2)');
        await secondIndicator.click();

        const result2 = await page.screenshot();
        expect(result2).toMatchImageSnapshot();
    });

    it('should render an indicators list with light theme and first one selected', async () => {
        const page = await createPage();
        await page.setContent(`
            <joy-indicators variant="light">
                <joy-indicator selected></joy-indicator>
                <joy-indicator></joy-indicator>
                <joy-indicator></joy-indicator>
                <joy-indicator></joy-indicator>
            </joy-indicators>`);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });
});
