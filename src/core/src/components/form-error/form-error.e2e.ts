import {E2EPage, newE2EPage} from '@stencil/core/testing';

describe('form-error e2e', () => {
    it('should render form error', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-form-error></joy-form-error>');
        const cmp = await page.find('joy-form-error');

        expect(cmp).toHaveClass('joy-has-error');
    });

    it('should render hidden form error', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-form-error visible="false"></joy-form-error>');
        const cmp = await page.find('joy-form-error');

        expect(cmp).not.toHaveClass('joy-has-error');
    });

    it('should update component visibility from outside', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-form-error visible="false"></joy-form-error>');
        const cmp = await page.find('joy-form-error');

        await cmp.setProperty('visible', 'true');
        await page.waitForChanges();
        expect(cmp).toHaveClass('joy-has-error');

        await cmp.setProperty('visible', 'false');
        await page.waitForChanges();
        expect(cmp).not.toHaveClass('joy-has-error');
    });
});
