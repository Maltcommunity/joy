import {newE2EPage} from '@stencil/core/testing';

describe('Select - e2e', () => {
    it('renders a dropdown with default placeholder', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-dropdown name="dropdown-name">
                <joy-option value="first">First Text</joy-option>
                <joy-option value="second">Second Text</joy-option>
            </joy-dropdown>
        `);

        const result = await page.compareScreenshot('Default dropdown without placeholder');
        expect(result).toMatchScreenshot();
    });

    it('renders a dropdown with placeholder using <joy-option disabled selected />', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-dropdown name="dropdown-name">
                <joy-option disabled selected>I'm a slotted placeholder</joy-option>
                <joy-option value="first">First Text</joy-option>
                <joy-option value="second">Second Text</joy-option>
            </joy-dropdown>
        `);

        const result = await page.compareScreenshot('Select with given placeholder');
        expect(result).toMatchScreenshot();
    });

    it('renders a dropdown with defined "value" prop', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-dropdown name="dropdown-name" value="second">
                <joy-option disabled>I'm a slotted placeholder</joy-option>
                <joy-option value="first" selected>First Text</joy-option>
                <joy-option value="second">Second Text</joy-option>
            </joy-dropdown>
        `);

        const result = await page.compareScreenshot('Select with given value');
        expect(result).toMatchScreenshot();
    });

    it('show a dropdown options list when click on joy-dropdown element', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-dropdown name="dropdown-name">
                <joy-option disabled>I'm a slotted placeholder</joy-option>
                <joy-option value="first" selected>First Text</joy-option>
                <joy-option value="second">Second Text</joy-option>
            </joy-dropdown>
        `);

        const dropdown = await page.find('joy-dropdown');
        await dropdown.click();
        await page.waitForChanges();

        const result = await page.compareScreenshot('Show the options dropdown');
        expect(result).toMatchScreenshot();
    });

    it('when focused, On press ArrowDown change text and value properly', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-dropdown name="dropdown-name">
                <joy-option disabled selected>I'm a slotted placeholder</joy-option>
                <joy-option value="first">First Text selectable with keyboard</joy-option>
                <joy-option value="second">Second Text selectable with keyboard</joy-option>
            </joy-dropdown>
        `);

        const dropdown = await page.find('joy-dropdown');

        await dropdown.focus();
        await page.keyboard.down('ArrowDown');
        await page.waitForChanges();

        const result = await page.compareScreenshot('Select the first option');
        expect(result).toMatchScreenshot();

        await dropdown.focus();
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
                <joy-dropdown name="dropdown-name" value="second">
                    <joy-option class="placeholder" disabled selected>I'm a slotted placeholder</joy-option>
                    <joy-option class="first" value="first">First Text</joy-option>
                    <joy-option class="second" value="second">Second Text should be highlighted</joy-option>
                </joy-dropdown>
            `);

            const dropdown = await page.find('joy-dropdown');
            const options = await page.find('joy-dropdown >>> .joy-dropdown__options');
            await dropdown.click();
            await options.isVisible();

            const result2 = await page.compareScreenshot('Select the second option with open dropdown');
            expect(result2).toMatchScreenshot();
        });
    });
});
