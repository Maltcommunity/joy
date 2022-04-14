import {newE2EPage} from '@stencil/core/testing';

describe('Select - e2e', () => {
    it('renders a select with default placeholder', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option value="first">First Text</joy-select-option>
                <joy-select-option value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const result = await page.compareScreenshot('Default select without placeholder');
        expect(result).toMatchScreenshot();
    });

    it('renders a select with placeholder using <joy-select-option disabled selected/>', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option disabled selected>I'm a slotted placeholder</joy-select-option>
                <joy-select-option value="first">First Text</joy-select-option>
                <joy-select-option value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const result = await page.compareScreenshot('Select with given placeholder');
        expect(result).toMatchScreenshot();
    });

    it('renders a select with defined "value" prop', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name" value="second">
                <joy-select-option disabled>I'm a slotted placeholder</joy-select-option>
                <joy-select-option value="first" selected>First Text</joy-select-option>
                <joy-select-option value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const result = await page.compareScreenshot('Select with given value');
        expect(result).toMatchScreenshot();
    });

    it('show a dropdown options list when click on joy-select element', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option disabled>I'm a slotted placeholder</joy-select-option>
                <joy-select-option value="first" selected>First Text</joy-select-option>
                <joy-select-option value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const select = await page.find('joy-select');
        await select.click();
        await page.waitForChanges();

        const result = await page.compareScreenshot('Show the options dropdown');
        expect(result).toMatchScreenshot();
    });

    it('when focused, On press ArrowDown change text and value properly', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option disabled selected>I'm a slotted placeholder</joy-select-option>
                <joy-select-option value="first">First Text selectable with keyboard</joy-select-option>
                <joy-select-option value="second">Second Text selectable with keyboard</joy-select-option>
            </joy-select>
        `);

        const select = await page.find('joy-select');

        await select.focus();
        await page.keyboard.down('ArrowDown');
        await page.waitForChanges();

        const result = await page.compareScreenshot('Select the first option');
        expect(result).toMatchScreenshot();

        await select.focus();
        await page.keyboard.down('ArrowDown');
        await page.waitForChanges();

        const result2 = await page.compareScreenshot('Select the second option');
        expect(result2).toMatchScreenshot();
    });

    describe.skip('when dropdown is shown', () => {
        // TODO FIX THIS SCENARIO
        it('On press Keydown or KeyRight, change text and value properly', async () => {
            const page = await newE2EPage();

            await page.setContent(`
                <joy-select name="select-name" value="second">
                    <joy-select-option class="placeholder" disabled selected>I'm a slotted placeholder</joy-select-option>
                    <joy-select-option class="first" value="first">First Text</joy-select-option>
                    <joy-select-option class="second" value="second">Second Text should be highlighted</joy-select-option>
                </joy-select>
            `);

            const select = await page.find('joy-select');
            const dropdown = await page.find('joy-select >>> .joy-select__options');
            await select.click();
            await dropdown.isVisible();

            const result2 = await page.compareScreenshot('Select the second option with open dropdown');
            expect(result2).toMatchScreenshot();
        });
    });
});
