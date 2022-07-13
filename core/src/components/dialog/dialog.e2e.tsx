import {createPage} from '../../tests';

describe('Dialog e2e', () => {
    it('should render dialog by default', async () => {
        const page = await createPage();
        await page.addStyleTag({
            content: 'joy-dialog {--dialog-transition-duration: 0.01ms !important}',
        });
        await page.setContent(`            
            <joy-dialog id="myDialog" open>
                <p slot="dialog-header">I am the dialog header</p>
                 <p slot="dialog-subheader">I am the dialog subheader</p>
                <div slot="dialog-body">
                    <joy-text>
                         I am the dialog body content with <strong>strong content</strong> and 
                        <joy-link href="#">some links</joy-link> to test the style.
                    </joy-text> 
                </div>
            </joy-dialog>`);

        await page.waitForChanges();

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should not render dialog by default until we ask for it', async () => {
        const page = await createPage();
        await page.setContent(`  
            <joy-dialog-trigger dialog="myDialog">Trigger</joy-dialog-trigger>          
            <joy-dialog id="myDialog"></joy-dialog>
        `);

        const dialog = await page.find('joy-dialog');
        expect(await dialog.isVisible()).toBe(false); // Don't need to generate a screenshot for this...

        const trigger = await page.find('joy-dialog-trigger');
        await trigger.click();
        await page.waitForChanges();
        expect(await dialog.isVisible()).toBe(true);
    });

    it('should render backdrop in body root', async () => {
        const page = await createPage();
        await page.setContent(`
            <div class="parent">            
                <joy-dialog id="myDialog" open></joy-dialog>
            </div>
            <!-- Backdrop should be injected here -->
        `);

        await page.waitForChanges();

        const backdrop = await page.find('.parent joy-backdrop');
        expect(backdrop).toBeNull();
    });

    it('should render backdrop next to dialog', async () => {
        const page = await createPage();
        await page.setContent(`
            <div class="parent">            
                <joy-dialog id="myDialog" open append-backdrop="sibling"></joy-dialog>
                <!-- Backdrop should be injected here -->
            </div>
        `);

        await page.waitForChanges();

        const backdrop = await page.find('.parent joy-backdrop');
        expect(backdrop).not.toBeNull();
    });
});
