import {E2EPage, newE2EPage} from '@stencil/core/testing';

async function getFirst(page: E2EPage) {
    return await page.find('.first .joy-radio-checked');
}

async function getSecond(page: E2EPage) {
    return await page.find('.second .joy-radio-checked');
}

describe('radio group - e2e', () => {
    let firstRadioSelected;
    let secondRadioSelected;

    it('renders a radio group with a given label', async () => {
        const page = await newE2EPage();

        await page.setContent(`
            <joy-radio-group name="radio-group">
                <joy-label slot="radio-group-label">I am the label</joy-label>
                <joy-radio value="first">First value</joy-radio>
                <joy-radio value="second">Second value</joy-radio>
            </joy-radio-group>
        `);

        const legend = await page.find('joy-label');
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

        const error = await page.find('joy-radio-group joy-form-error');
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

        const container = await page.find('joy-radio-group .joy-radio-group-container.joy-radio-group-vertical');
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
});
