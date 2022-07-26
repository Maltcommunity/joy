import {createPage, setPageContent} from '../../tests';

describe('selectable-item-group - e2e', () => {
    it('renders a single selection group with active value', async () => {
        const page = await createPage();

        await setPageContent(page,`
            <joy-selectable-item-group>
                <joy-selectable-item disabled value="0-2">
                    Entry-level
                </joy-selectable-item>
                <joy-selectable-item value="2-7">
                    Intermediate
                </joy-selectable-item>
                <joy-selectable-item checked value="7+">
                    Senior
                </joy-selectable-item>
            </joy-selectable-item-group>
        `);

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();

        /* Click on second item */
        const secondItem = await page.find('joy-selectable-item[value="2-7"]');
        await secondItem.click();
        const screenshot2 = await page.screenshot();
        expect(screenshot2).toMatchImageSnapshot();

        /* Click on first item, but it's disabled, so no changes */
        const firstDisabledItem = await page.find('joy-selectable-item[value="0-2"]');
        await firstDisabledItem.click();
        expect(secondItem).toHaveAttribute('checked');
        expect(firstDisabledItem).not.toHaveAttribute('checked');
    });

    it('renders a single selection group with a full-width support', async () => {
        const page = await createPage();

        await setPageContent(page,`
            <joy-selectable-item-group full-width>
                <joy-selectable-item disabled value="0-2">
                    Entry-level
                </joy-selectable-item>
                <joy-selectable-item value="2-7">
                    Intermediate
                </joy-selectable-item>
                <joy-selectable-item checked value="7+">
                    Senior
                </joy-selectable-item>
            </joy-selectable-item-group>
        `);

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
    });

    it('renders a multiple selection group with active value', async () => {
        const page = await createPage();

        await setPageContent(page, `
            <joy-selectable-item-group multiple>
                <joy-selectable-item>
                    <joy-checkbox value="1">Category title 1</joy-checkbox>
                </joy-selectable-item>
                <joy-selectable-item checked>
                    <joy-checkbox value="2">Category title 2</joy-checkbox>
                </joy-selectable-item>
                <joy-selectable-item>
                    <joy-checkbox value="3">Category title 3</joy-checkbox>
                </joy-selectable-item>
                </joy-selectable-item>
                <joy-selectable-item>
                    <joy-checkbox value="4">Category title 4</joy-checkbox>
                </joy-selectable-item>
                    <joy-selectable-item>
                    <joy-checkbox value="5">Category title 5</joy-checkbox>
                </joy-selectable-item>
            </joy-selectable-item-group>
        `);

        const group = await page.find('joy-selectable-item-group');
        const value = await group.callMethod('getSelectedItemsValue');
        expect(value).toEqual(['2']);

        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();

        const fourthItem = await page.find('joy-selectable-item:nth-child(4)');
        await fourthItem.click();
        const updatedValue = await group.callMethod('getSelectedItemsValue');
        expect(updatedValue).toEqual(['2', '4']);
    });
});
