import {newE2EPage} from '@stencil/core/testing';

describe('toggle e2e', () => {
    it('renders the component', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-toggle></joy-toggle>');
        const element = await page.find('joy-toggle');
        expect(element).toHaveClass('hydrated');
    });

    it('renders with a toggle label', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-toggle>I am a label</joy-toggle>');
        const element = await page.find('joy-toggle');
        expect(element.textContent).toBe('I am a label');
    });

    it('renders checked by default', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-toggle checked>I am a label</joy-toggle>');
        const fakeInput = await page.find('joy-toggle >>> .joy-toggle__input');
        expect(fakeInput).toEqualAttribute('aria-checked', true);
    });

    it('renders disabled by default', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-toggle disabled>I am disabled</joy-toggle>');
        const toggleChange = await page.spyOnEvent('joyToggleChange');
        const fakeInput = await page.find('joy-toggle >>> .joy-toggle__input');
        const toggle = await page.find('joy-toggle >>> .joy-toggle');

        expect(fakeInput).toHaveAttribute('disabled');

        await toggle.click();
        await page.waitForChanges();
        expect(toggleChange).not.toHaveReceivedEvent();
    });

    it('renders with a specific input name', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-toggle name="my-input-name">I am a toggle</joy-toggle>');
        const hiddenInput = await page.find('joy-toggle .input-hidden');
        expect(hiddenInput).toEqualAttribute('name', 'my-input-name');
    });

    it('should toggle ON and OFF and set the right input value', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-toggle>I am a toggle</joy-toggle>');
        const toggleChange = await page.spyOnEvent('joyToggleChange');
        const toggle = await page.find('joy-toggle >>> .joy-toggle');
        const actualInput = await page.find('joy-toggle .input-hidden');

        // ON
        await toggle.click();
        await page.waitForChanges();
        expect(toggleChange).toHaveReceivedEvent();
        expect(toggle).toHaveClass('joy-toggle__checked');
        expect(actualInput).toEqualAttribute('value', 'true');

        // OFF
        await toggle.click();
        await page.waitForChanges();
        expect(toggleChange).toHaveReceivedEvent();
        expect(toggle).not.toHaveClass('joy-toggle__checked');
        expect(actualInput).toEqualAttribute('value', '');
    });

    it('should update input value when we change checked prop outside from the component (unchecked by default)', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-toggle>I am a toggle</joy-toggle>');
        const actualInput = await page.find('joy-toggle .input-hidden');
        const el = await page.find('joy-toggle');

        expect(actualInput).toEqualAttribute('value', '');

        await el.callMethod('updateValue', true);
        await page.waitForChanges();

        expect(actualInput).toEqualAttribute('value', 'true');
    });

    it('should update input value when we change checked prop outside from the component (checked by default)', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-toggle checked>I am a toggle</joy-toggle>');
        const actualInput = await page.find('joy-toggle .input-hidden');
        const el = await page.find('joy-toggle');

        expect(actualInput).toEqualAttribute('value', 'true');

        await el.callMethod('updateValue', false);
        await page.waitForChanges();

        expect(actualInput).toEqualAttribute('value', '');
    });

    it('should update value by simply clicking on component', async () => {
        /**
         * Just a basic check to verify if a simple clic triggers the right update
         */
        const page = await newE2EPage();
        await page.setContent('<joy-toggle>I am a toggle</joy-toggle>');
        const el = await page.find('joy-toggle');
        const actualInput = await page.find('joy-toggle .input-hidden');
        const fakeInput = await page.find('joy-toggle >>> .joy-toggle__input');

        await el.click();
        await page.waitForChanges();

        expect(actualInput).toEqualAttribute('value', 'true');
        expect(fakeInput).toEqualAttribute('aria-checked', true);
    });
});
