import {E2EPage, newE2EPage} from '@stencil/core/testing';

async function getFirst(page: E2EPage) {
    return await page.find('.first >>> .joy-radio-checked');
}

async function getSecond(page: E2EPage) {
    return await page.find('.second >>> .joy-radio-checked');
}

describe('radio group - e2e', () => {
    let firstRadioSelected;
    let secondRadioSelected;

    it('renders an hidden input for the actual form, with the right name', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-radio-group name="radio-group">
                <joy-radio value="first">First value</joy-radio>
                <joy-radio value="second">Second value</joy-radio>
            </joy-radio-group>
        `);

        const input = await page.find('input[type="hidden"]');

        expect(input).not.toBeNull();
        expect(input.id).toBe('radio-group');
        expect(input.getAttribute('name')).toBe('radio-group');
    });

    it('renders a radio group with a given label', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-radio-group name="radio-group">
                <span slot="radio-group-legend">I am the label</span>
                <joy-radio value="first">First value</joy-radio>
                <joy-radio value="second">Second value</joy-radio>
            </joy-radio-group>
        `);

        const legend = await page.find('span');
        const isVisible = await legend.isVisible(); // if the slot name is not the right one, the span tag won't be displayed
        expect(isVisible).toBe(true);
    });

    it('renders a message if radio group is invalid', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-radio-group name="radio-group" invalid invalid-text="Please pick a value">
                <joy-radio value="first">First value</joy-radio>
                <joy-radio value="second">Second value</joy-radio>
            </joy-radio-group>
        `);

        const error = await page.find('joy-radio-group >>> joy-form-error');
        expect(error).not.toBeNull();
    });

    it('renders a radio group with vertical layout', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-radio-group direction="vertical" name="radio-group">
                <joy-radio value="first">First value</joy-radio>
                <joy-radio value="second">Second value</joy-radio>
            </joy-radio-group>
        `);

        const container = await page.find('joy-radio-group >>> .joy-radio-group-container.joy-radio-group-vertical');
        expect(container).not.toBeNull();
    });

    it('renders radio group with second item checked by default', async () => {
        const page = await newE2EPage();

        async function defaultState() {
            firstRadioSelected = await getFirst(page);
            secondRadioSelected = await getSecond(page);
            expect(secondRadioSelected).not.toBeNull();
            expect(firstRadioSelected).toBeNull();
        }

        await page.setContent(`
            <joy-radio-group name="radio-group" value="second">
                <joy-radio class="first" value="first">First value</joy-radio>
                <joy-radio class="second" value="second">Second value</joy-radio>
            </joy-radio-group>
        `);

        const firstRadio = await page.find('.first');
        const secondRadio = await page.find('.second');

        // Default state
        await defaultState();

        // Click on another radio
        await firstRadio.click();
        await page.waitForChanges();

        // New state
        firstRadioSelected = await getFirst(page);
        secondRadioSelected = await getSecond(page);
        expect(secondRadioSelected).toBeNull();
        expect(firstRadioSelected).not.toBeNull();

        // Click back to second radio
        await secondRadio.click();
        await page.waitForChanges();

        await defaultState();
    });

    it('should not change value when I click on a disabled radio', async () => {
        const page = await newE2EPage();
        let secondRadio;

        await page.setContent(`
            <joy-radio-group name="radio-group" value="first">
                <joy-radio class="first" value="first">First value</joy-radio>
                <joy-radio class="second" disabled value="second">Second value, disabled</joy-radio>
            </joy-radio-group>
        `);

        const radioChange = await page.spyOnEvent('joyRadioGroupChange');
        secondRadio = await page.find('joy-radio-group .second');

        // Click on second radio
        await secondRadio.click();
        await page.waitForChanges();

        expect(secondRadio).toEqualAttribute('aria-checked', 'false');
        expect(radioChange).not.toHaveReceivedEvent();
    });
});
