import {newE2EPage} from '@stencil/core/testing';

describe('checkbox e2e', () => {
    it('renders the component', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-checkbox></joy-checkbox>');
        const element = await page.find('joy-checkbox');
        expect(element).toHaveAttribute('hydrated');
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
        const checkboxChange = await page.spyOnEvent('valueChange');
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
        const checkboxChange = await page.spyOnEvent('valueChange');
        const el = await page.find('joy-checkbox');

        // ON
        await el.click();
        await page.waitForChanges();
        const wrapper = await page.find('joy-checkbox >>> .joy-checkbox');
        const checkbox = await page.find('joy-checkbox >>> input');

        expect(checkboxChange).toHaveReceivedEvent();
        expect(wrapper).toHaveClass('joy-checkbox__checked');
        expect(checkbox).toEqualAttribute('aria-checked', true);

        // OFF
        await el.click();
        await page.waitForChanges();
        expect(checkboxChange).toHaveReceivedEvent();
        expect(wrapper).not.toHaveClass('joy-checkbox__checked');
        expect(checkbox).toEqualAttribute('aria-checked', false);
    });

    it('should update input checked when we change checked prop outside from the component (unchecked by default)', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-checkbox>I am a checkbox</joy-checkbox>');
        const el = await page.find('joy-checkbox');

        await el.setAttribute('checked', '');
        await page.waitForChanges();
        const label = await page.find('joy-checkbox >>> .joy-checkbox__checked');

        expect(el).toHaveAttribute('checked');
        expect(label).not.toBeNull();
    });

    it('should update hidden input with the value or not, according to checked state', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-checkbox value="first">I am a checkbox</joy-checkbox>');
        const el = await page.find('joy-checkbox');
        const hiddenInput = await page.find('joy-checkbox input');

        await el.click();
        await page.waitForChanges();
        expect(hiddenInput).toEqualAttribute('value', 'first');

        await el.click();
        await page.waitForChanges();
        expect(hiddenInput).toEqualAttribute('value', '');
    });

    it('should not prevent default behavior, when we click on a link included in the label', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-checkbox value="first"><span>I am a checkbox</span><a href="#">with a link</a></joy-checkbox>');
        const el = await page.find('joy-checkbox');
        const link = await page.find('a');
        const span = await page.find('span'); // this span does not include the link

        await link.click();
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('checked');

        await span.click();
        await page.waitForChanges();
        expect(el).toHaveAttribute('checked');
    });
});
