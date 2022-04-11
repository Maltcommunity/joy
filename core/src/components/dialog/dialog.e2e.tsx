import {E2EPage, newE2EPage} from '@stencil/core/testing';

describe('Dialog e2e', () => {
    it('should not render dialog by default until we ask for it', async () => {
        const page: E2EPage = await newE2EPage();
        await page.addStyleTag({
            content: 'joy-dialog {--dialog-transition-duration: 0.01ms !important}',
        });
        await page.setContent(`
            <joy-dialog-trigger dialog="myDialog">Trigger</joy-dialog-trigger>
            
            <joy-dialog id="myDialog" data-dialog="myDialog">
                <p slot="dialog-header">I am the dialog header</p>
                 <p slot="dialog-subheader">I am the dialog subheader</p>
                <div slot="dialog-body">
                    <joy-text>
                         I am the dialog body content with <strong>strong content</strong> and 
                        <joy-link href="#">some links</joy-link> to test the style.
                    </joy-text> 
                </div>
            </joy-dialog>`);

        const dialog = await page.find('joy-dialog');
        const isVisible = await dialog.isVisible();
        expect(isVisible).toBe(false); // Don't need to generate a screenshot for this...

        const trigger = await page.find('joy-dialog-trigger');
        await trigger.click();
        await page.waitForChanges();

        const result = await page.compareScreenshot('Dialog shown');
        expect(result).toMatchScreenshot();
    });
});