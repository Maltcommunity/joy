import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

describe('counter e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-counter></joy-counter>');
        const element: E2EElement = await page.find('joy-counter');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders a basic counter', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-counter></joy-counter>');
        const result = await page.compareScreenshot('Basic counter');

        expect(result).toMatchScreenshot();
    });

    it('renders with a default min value to 0, and no max', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-counter></joy-counter>');
        const input: E2EElement = await page.find('joy-counter input');

        expect(input).toEqualAttribute('min', '0');
        expect(input).not.toHaveAttribute('max');
    });

    it('should increment and decrement input value according to given step', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-counter></joy-counter>');
        const comp: E2EElement = await page.find('joy-counter');
        const input: E2EElement = await page.find('joy-counter input');
        const decrement: E2EElement = await page.find('joy-counter .joy-counter__decrement');
        const increment: E2EElement = await page.find('joy-counter .joy-counter__increment');
        let value;

        await increment.click();
        await page.waitForChanges();
        value = await input.getProperty('value');
        expect(value).toBe('1');

        // Change step to 10
        await comp.setProperty('step', '10');
        await page.waitForChanges();

        // Increment by clicking twice
        await increment.click();
        await increment.click();
        await page.waitForChanges();
        value = await input.getProperty('value');
        expect(value).toBe('21');

        await comp.setProperty('step', '5');
        await page.waitForChanges();

        await decrement.click();
        await decrement.click();
        await decrement.click();
        await page.waitForChanges();
        value = await input.getProperty('value');
        expect(value).toBe('6');

        await decrement.click();
        await decrement.click();
        value = await input.getProperty('value');
        expect(value).toBe('0');
    });

    it('should display default HTML5 errors if the component value is not valid, according to given min/max', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-counter min="10" max="500"></joy-counter>');
        const input: E2EElement = await page.find('joy-counter input');

        /**
         * In an actual browser, we don't need to delete the default 0 value of the input number, because typing a first number will overwrite it.
         * Here for unknown reason, it does not reset it, so we do it programmatically
         */
        await input.focus();
        await input.press('Backspace');

        await input.press('Digit4');
        await input.press('Digit3');
        await input.press('Digit2');
        await input.press('Digit1');

        await page.$eval('input', (e: Element) => {
            (e as HTMLInputElement).blur();
        });

        await page.waitForChanges();
        const error = await page.find('joy-counter joy-form-error');
        expect(error).not.toBe(null);

        const message = error.getAttribute('no-html-error-text');
        expect(error).not.toBe(null);
        expect(message).not.toBe(null);
    });

    it('should display generic given error message if the component value is not valid, according to given min/max', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`<joy-counter invalid-message="La valeur n'est pas valide" min="10" max="500"></joy-counter>`);
        const input: E2EElement = await page.find('joy-counter input');

        /**
         * In an actual browser, we don't need to delete the default 0 value of the input number, because typing a first number will overwrite it.
         * Here for unknown reason, it does not reset it, so we do it programmatically
         */
        await input.focus();
        await input.press('Backspace');
        await input.press('Digit4');

        await page.$eval('input', (e: Element) => {
            (e as HTMLInputElement).blur();
        });

        await page.waitForChanges();
        const error = await page.find('joy-counter joy-form-error');
        const message = error.getAttribute('no-html-error-text');

        expect(error).not.toBe(null);
        expect(message).toBe(`La valeur n'est pas valide`);
    });
});
