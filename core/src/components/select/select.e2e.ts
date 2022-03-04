import {newE2EPage} from '@stencil/core/testing';

const CLASS_OPTION_SELECTED = 'joy-select-option_selected';

describe('Select - e2e', () => {
    it('renders a native select', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option class="placeholder" disabled selected>I'm a slotted placeholder</joy-select-option>
                <joy-select-option class="first" value="first">First Text</joy-select-option>
                <joy-select-option class="second" value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const nativeSelect = await page.find('select');
        const nativeSelectOption = await page.findAll('option');
        expect(nativeSelect).toBeTruthy();
        expect(nativeSelectOption).toBeTruthy();
        expect(nativeSelectOption).toHaveLength(3);
        expect(nativeSelectOption[0]).toHaveAttribute('disabled');
        expect(nativeSelectOption[0]).toEqualAttribute('value', '');
        expect(nativeSelectOption[0]).toEqualText("I'm a slotted placeholder");

        expect(nativeSelectOption[1]).toEqualText('First Text');
        expect(nativeSelectOption[1]).toEqualAttribute('value', 'first');
        expect(nativeSelectOption[1]).not.toHaveAttribute('selected');
        expect(nativeSelectOption[1]).not.toHaveAttribute('disabled');

        expect(nativeSelectOption[2]).toEqualText('Second Text');
        expect(nativeSelectOption[2]).toEqualAttribute('value', 'second');
        expect(nativeSelectOption[2]).not.toHaveAttribute('selected');
        expect(nativeSelectOption[2]).not.toHaveAttribute('disabled');
    });

    it('renders a select with default placeholder', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option value="first">First Text</joy-select-option>
                <joy-select-option value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const input = await page.find('joy-select >>> .joy-select__input');
        expect(input).toEqualText('-');
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

        const input = await page.find('joy-select >>> .joy-select__input');
        expect(input).toEqualText("I'm a slotted placeholder");
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

        const input = await page.find('joy-select >>> .joy-select__input');

        expect(input).toEqualText('Second Text');
    });

    it('renders a select with a joy-select-option selected', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option disabled>I'm a slotted placeholder</joy-select-option>
                <joy-select-option value="first" selected>First Text</joy-select-option>
                <joy-select-option value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const input = await page.find('joy-select >>> .joy-select__input');

        expect(input).toEqualText('First Text');
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

        const input = await page.find('joy-select >>> .joy-select__input');
        const selectOptionsList = await page.find('joy-select >>> .joy-select__options');
        expect(await selectOptionsList.isVisible()).toBe(false);
        input.click();
        await page.waitForChanges();
        expect(await selectOptionsList.isVisible()).toBe(true);
    });

    it('when focused, On press Keydown or KeyRight, change text and value properly', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option disabled selected>I'm a slotted placeholder</joy-select-option>
                <joy-select-option value="first">First Text</joy-select-option>
                <joy-select-option value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const select = await page.find('joy-select');
        const input = await page.find('joy-select >>> .joy-select__input');

        expect(input).toEqualText("I'm a slotted placeholder");
        expect(select).toEqualAttribute('value', '');

        select.press('ArrowDown');
        await page.waitForChanges();
        expect(input).toEqualText('First Text');
        expect(select).toEqualAttribute('value', 'first');

        select.press('ArrowRight');
        await page.waitForChanges();

        expect(input).toEqualText('Second Text');
        expect(select).toEqualAttribute('value', 'second');

        select.press('ArrowDown');
        await page.waitForChanges();

        expect(input).toEqualText('First Text');
        expect(select).toEqualAttribute('value', 'first');
    });

    it('when focused, On press KeyUp or KeyLeft, change text and value properly', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option disabled selected>I'm a slotted placeholder</joy-select-option>
                <joy-select-option value="first">First Text</joy-select-option>
                <joy-select-option value="second">Second Text</joy-select-option>
            </joy-select>
        `);

        const select = await page.find('joy-select');
        const input = await page.find('joy-select >>> .joy-select__input');

        expect(input).toEqualText("I'm a slotted placeholder");
        expect(select).toEqualAttribute('value', '');

        select.press('ArrowUp');
        await page.waitForChanges();
        expect(input).toEqualText('Second Text');
        expect(select).toEqualAttribute('value', 'second');

        select.press('ArrowLeft');
        await page.waitForChanges();

        expect(input).toEqualText('First Text');
        expect(select).toEqualAttribute('value', 'first');

        select.press('ArrowUp');
        await page.waitForChanges();

        expect(input).toEqualText('Second Text');
        expect(select).toEqualAttribute('value', 'second');
    });

    describe('when dropdown is shown', () => {
        it('On press Keydown or KeyRight, change text and value properly', async () => {
            const page = await newE2EPage();

            await page.setContent(`
            <joy-select name="select-name">
                <joy-select-option class="placeholder" disabled selected>I'm a slotted placeholder</joy-select-option>
                <joy-select-option class="first" value="first">First Text</joy-select-option>
                <joy-select-option class="second" value="second">Second Text</joy-select-option>
            </joy-select>
        `);
            const select = await page.find('joy-select');
            const input = await page.find('joy-select >>> .joy-select__input');
            const firstOption = await page.find('.placeholder');
            const secondOption = await page.find('.first');
            const thirdOption = await page.find('.second');

            select.click();
            await page.waitForChanges();

            expect(input).toEqualText("I'm a slotted placeholder");
            expect(select).toEqualAttribute('value', '');
            expect(firstOption).toHaveClass(CLASS_OPTION_SELECTED);
            expect(secondOption).not.toHaveClass(CLASS_OPTION_SELECTED);
            expect(thirdOption).not.toHaveClass(CLASS_OPTION_SELECTED);

            select.press('ArrowDown');
            await page.waitForChanges();

            expect(input).toEqualText('First Text');
            expect(select).toEqualAttribute('value', 'first');
            expect(firstOption).not.toHaveClass(CLASS_OPTION_SELECTED);
            expect(secondOption).toHaveClass(CLASS_OPTION_SELECTED);
            expect(thirdOption).not.toHaveClass(CLASS_OPTION_SELECTED);

            select.press('ArrowRight');
            await page.waitForChanges();

            expect(input).toEqualText('Second Text');
            expect(select).toEqualAttribute('value', 'second');
            expect(firstOption).not.toHaveClass(CLASS_OPTION_SELECTED);
            expect(secondOption).not.toHaveClass(CLASS_OPTION_SELECTED);
            expect(thirdOption).toHaveClass(CLASS_OPTION_SELECTED);

            select.press('ArrowDown');
            await page.waitForChanges();

            expect(input).toEqualText('First Text');
            expect(select).toEqualAttribute('value', 'first');
            expect(firstOption).not.toHaveClass(CLASS_OPTION_SELECTED);
            expect(secondOption).toHaveClass(CLASS_OPTION_SELECTED);
            expect(thirdOption).not.toHaveClass(CLASS_OPTION_SELECTED);
        });
    });
});
