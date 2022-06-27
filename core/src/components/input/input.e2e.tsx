import {E2EPage, newE2EPage} from '@stencil/core/testing';

async function resetCssTransition(page: E2EPage) {
    await page.addStyleTag({
        content: 'joy-input {--input-transition-duration: 0.01ms !important}',
    });
}

describe('Input - e2e', () => {
    it('should display a standard input with placeholder', async () => {
        const page: E2EPage = await newE2EPage();
        await resetCssTransition(page);

        const basic = await page.compareScreenshot('Basic input');
        expect(basic).toMatchScreenshot();
    });
    it('should display all sizes inputs with placeholder', async () => {
        const page: E2EPage = await newE2EPage();
        await resetCssTransition(page);
        await page.setContent(`
            <joy-input size="small" placeholder="Type here..."></joy-input>
            <joy-input size="medium" placeholder="Type here..."></joy-input>
            <joy-input size="large" placeholder="Type here..."></joy-input>
        `);

        const basic = await page.compareScreenshot('Basic input');
        expect(basic).toMatchScreenshot();
    });
    it('should display a standard input with label', async () => {
        const page: E2EPage = await newE2EPage();
        await resetCssTransition(page);

        await page.setContent(`
            <joy-input>Basic input</joy-input>
        `);

        const basic = await page.compareScreenshot('Basic input');
        expect(basic).toMatchScreenshot();

        const cmp = await page.find('joy-input');
        await cmp.callMethod('setFocus');
        await page.waitForChanges();

        const basicFocus = await page.compareScreenshot('Basic input, focus state');
        expect(basicFocus).toMatchScreenshot();

        cmp.setProperty('value', 'I am the input value');
        await page.waitForChanges();
        const basicWithValue = await page.compareScreenshot('Basic input, with value');
        expect(basicWithValue).toMatchScreenshot();
    });

    it('should display an input with a given icon', async () => {
        const page: E2EPage = await newE2EPage();
        await resetCssTransition(page);
        await page.setContent(`
            <joy-input icon="location">Basic input with icon on left</joy-input>
        `);

        const basicWithIcon = await page.compareScreenshot('Basic input with icon on left');
        expect(basicWithIcon).toMatchScreenshot();
    });

    it('should display input unit with all sizes', async () => {
        const page: E2EPage = await newE2EPage();
        await resetCssTransition(page);
        await page.setContent(`
            <joy-input size="small" unit="days/months">Small input number with unit</joy-input>
            <joy-input size="medium" unit="days/months">Medium input number with unit</joy-input>
            <joy-input size="large" unit="days/months">Large input number with unit</joy-input>
        `);

        const basicWithIcon = await page.compareScreenshot('Basic unit inputs');
        expect(basicWithIcon).toMatchScreenshot();
    });

    it('should display an input type password', async () => {
        const page: E2EPage = await newE2EPage();
        await resetCssTransition(page);
        await page.setContent(`
            <joy-input type="password">Password input</joy-input>
        `);

        // Default
        const passwordEmpty = await page.compareScreenshot('Password input without value');
        expect(passwordEmpty).toMatchScreenshot();

        // Password filled
        const cmp = await page.find('joy-input');
        await cmp.callMethod('setFocus');
        await page.keyboard.type('12345');
        await page.waitForChanges();

        // E2E screenshots are too unstable at the moment for this test. Let's just test if the icon is present.
        // When the input is empty, there is no "eye" icon. It appears once we type something
        const icon = page.find('.joy-input--password-icon');
        expect(icon).not.toBeNull();

        // Password filled
        const showPassword = await page.find('joy-input .joy-input--password-icon');
        await showPassword.click();
        await page.waitForChanges();
        const passwordReset = await page.compareScreenshot('Password input with shown password');
        expect(passwordReset).toMatchScreenshot();
    });
});
