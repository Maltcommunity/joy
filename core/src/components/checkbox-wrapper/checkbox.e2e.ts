import {newE2EPage} from '@stencil/core/testing';

describe('checkbox e2e', () => {
    it('renders the component', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-checkbox></joy-checkbox>');
        const element = await page.find('joy-checkbox');
        expect(element).toHaveClass('hydrated');
    });

    it('renders with a checkbox label', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-checkbox>I am a label</joy-checkbox>');
        const element = await page.find('joy-checkbox');
        expect(element.textContent).toBe('I am a label');
    });

    it('renders checked by default', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-checkbox checked>I am a label</joy-checkbox>');
        const fakeInput = await page.find('joy-checkbox >>> .joy-checkbox__input');
        expect(fakeInput).toEqualAttribute('aria-checked', true);
    });

    it('renders disabled by default', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-checkbox disabled>I am disabled</joy-checkbox>');
        const checkboxChange = await page.spyOnEvent('joyCheckboxChange');
        const fakeInput = await page.find('joy-checkbox >>> .joy-checkbox__input');
        const checkbox = await page.find('joy-checkbox >>> .joy-checkbox');

        expect(fakeInput).toHaveAttribute('disabled');

        await checkbox.click();
        await page.waitForChanges();
        expect(checkboxChange).not.toHaveReceivedEvent();
    });

    it('renders with a specific input name', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-checkbox name="my-input-name">I am a checkbox</joy-checkbox>');
        const hiddenInput = await page.find('joy-checkbox .input-hidden');
        expect(hiddenInput).toEqualAttribute('name', 'my-input-name');
    });

    it('should checkbox ON and OFF and set the right input value', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-checkbox>I am a checkbox</joy-checkbox>');
        const checkboxChange = await page.spyOnEvent('joyCheckboxChange');
        const checkbox = await page.find('joy-checkbox >>> .joy-checkbox');
        const actualInput = await page.find('joy-checkbox .input-hidden');

        // ON
        await checkbox.click();
        await page.waitForChanges();
        expect(checkboxChange).toHaveReceivedEvent();
        expect(checkbox).toHaveClass('joy-checkbox__checked');
        expect(actualInput).toEqualAttribute('value', 'true');

        // OFF
        await checkbox.click();
        await page.waitForChanges();
        expect(checkboxChange).toHaveReceivedEvent();
        expect(checkbox).not.toHaveClass('joy-checkbox__checked');
        expect(actualInput).toEqualAttribute('value', 'false');
    });

    it('should update input value when we change checked prop outside from the component (unchecked by default)', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-checkbox>I am a checkbox</joy-checkbox>');
        const actualInput = await page.find('joy-checkbox .input-hidden');
        const el = await page.find('joy-checkbox');

        expect(actualInput).toEqualAttribute('value', 'false');

        await el.callMethod('updateValue', true);
        await page.waitForChanges();

        expect(actualInput).toEqualAttribute('value', 'true');
    });

    it('should update input value when we change checked prop outside from the component (checked by default)', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-checkbox checked>I am a checkbox</joy-checkbox>');
        const actualInput = await page.find('joy-checkbox .input-hidden');
        const el = await page.find('joy-checkbox');

        expect(actualInput).toEqualAttribute('value', 'true');

        await el.callMethod('updateValue', false);
        await page.waitForChanges();

        expect(actualInput).toEqualAttribute('value', 'false');
    });

    it('should update value by simply clicking on component', async () => {
        /**
         * Just a basic check to verify if a simple clic triggers the right update
         */
        const page = await newE2EPage();
        await page.setContent('<joy-checkbox>I am a checkbox</joy-checkbox>');
        const el = await page.find('joy-checkbox');
        const actualInput = await page.find('joy-checkbox .input-hidden');
        const fakeInput = await page.find('joy-checkbox >>> .joy-checkbox__input');

        await el.click();
        await page.waitForChanges();

        expect(actualInput).toEqualAttribute('value', 'true');
        expect(fakeInput).toEqualAttribute('aria-checked', true);
    });
});
