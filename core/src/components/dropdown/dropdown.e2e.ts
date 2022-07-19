import {newE2EPage} from '@stencil/core/testing';
import {createPage} from '../../tests';

describe('Dropdown - e2e', () => {
    it('renders a dropdown with default placeholder', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-dropdown name="dropdown-name">
                <joy-option value="first">First Text</joy-option>
                <joy-option value="second">Second Text</joy-option>
            </joy-dropdown>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('renders a dropdown with placeholder using joy-option disabled selected ', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-dropdown name="dropdown-name">
                <joy-option disabled selected>I'm a slotted placeholder</joy-option>
                <joy-option value="first">First Text</joy-option>
                <joy-option value="second">Second Text</joy-option>
            </joy-dropdown>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('renders a dropdown with defined "value" prop', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-dropdown name="dropdown-name" value="second">
                <joy-option disabled>I'm a slotted placeholder</joy-option>
                <joy-option value="first" selected>First Text</joy-option>
                <joy-option value="second">Second Text</joy-option>
            </joy-dropdown>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('show a dropdown options list when click on joy-dropdown element', async () => {
        const page = await createPage();

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

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('when focused, On press ArrowDown change text and value properly', async () => {
        const page = await createPage();

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

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();

        await dropdown.focus();
        await page.keyboard.down('ArrowDown');
        await page.waitForChanges();

        const result2 = await page.screenshot();
        expect(result2).toMatchImageSnapshot();
    });

    describe.skip('when dropdown is shown', () => {
        // TODO FIX THIS SCENARIO
        it('On press Keydown or KeyRight, change text and value properly', async () => {
            const page = await createPage();

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

            const result = await page.screenshot();
            expect(result).toMatchImageSnapshot();
        });
    });
});
