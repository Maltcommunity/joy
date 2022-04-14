import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

describe('snackbar e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-snackbar></joy-snackbar>');
        const element: E2EElement = await page.find('joy-snackbar');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders a snackbar with a specific message', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-snackbar level="error" dangerous-html-message="An error occurred"></joy-snackbar>');

        const textSpan = await page.find('joy-snackbar >>> .joy-snackbar__content span');

        expect(textSpan).not.toBe(null);
        expect(textSpan.textContent).toBe('An error occurred');
    });

    describe('renders snackbars with all level types', () => {
        it('renders a success Snackbar without any given level, success is the fallback', async () => {
            const page = await newE2EPage();
            await page.setContent('<joy-snackbar></joy-snackbar>');

            const element = await page.find('joy-snackbar >>> .joy-snackbar_success');

            expect(element).not.toBe(null);
        });

        it('renders a success Snackbar', async () => {
            const page = await newE2EPage();
            await page.setContent('<joy-snackbar level="success"></joy-snackbar>');

            const element = await page.find('joy-snackbar >>> .joy-snackbar_success');

            expect(element).not.toBe(null);
        });

        it('renders an Info Snackbar', async () => {
            const page = await newE2EPage();
            await page.setContent('<joy-snackbar level="info"></joy-snackbar>');

            const element = await page.find('joy-snackbar >>> .joy-snackbar_info');
            const icon = await page.find('joy-snackbar >>> joy-icon');

            expect(element).not.toBe(null);
            expect(icon).not.toBe(null);
        });

        it('renders a warning Snackbar', async () => {
            const page = await newE2EPage();
            await page.setContent('<joy-snackbar level="warning"></joy-snackbar>');

            const element = await page.find('joy-snackbar >>> .joy-snackbar_warning');

            expect(element).not.toBe(null);
        });

        it('renders an error Snackbar', async () => {
            const page = await newE2EPage();
            await page.setContent('<joy-snackbar level="error"></joy-snackbar>');

            const element = await page.find('joy-snackbar >>> .joy-snackbar_error');

            expect(element).not.toBe(null);
        });
    });

    it('renders a snackbar with a custom CTA able to trigger any action', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-snackbar level="error" trigger-action-text="Click me if you can"></joy-snackbar>');

        const triggerActionElement = await page.find('joy-snackbar >>> .joy-snackbar__trigger___action');

        expect(triggerActionElement).not.toBe(null);
        expect(triggerActionElement.textContent).toBe('Click me if you can');
    });

    it('should destroy the snackbar when clicking on the cross icon', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-snackbar level="error"></joy-snackbar>');

        const close = await page.find('joy-snackbar >>> joy-icon-button');

        await close.click();
        await page.waitForChanges();

        const snackbar = await page.find('joy-snackbar');
        expect(snackbar).toBe(null);
    });

    it('should not be able to close the snackbar', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-snackbar level="error" closable="false"></joy-snackbar>');

        const close = await page.find('joy-snackbar >>> joy-icon-button');

        expect(close).toBe(null);
    });
});
