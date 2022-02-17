import {E2EElement, E2EPage, newE2EPage} from '@stencil/core/testing';

describe('Bottom Sheet - e2e', () => {
    it('should render component with no content and primary button "Close"', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-bottom-sheet></joy-bottom-sheet>
        `);

        const contentElement: E2EElement = await page.find('joy-bottom-sheet >>> [data-testid="bottom-sheet-content"]');
        const bottomButtonElement: E2EElement = await page.find('joy-bottom-sheet >>> [data-testid="bottom-sheet-footer"] >>> joy-button');

        expect(contentElement.textContent).toBe('');
        expect(bottomButtonElement.textContent).toBe('Close');
    });

    it('should render component with given content and close button label', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-bottom-sheet close-label='given-close-label'>
                <div slot='bottom-sheet-content' data-testid='bottom-sheet-content-slot'>bottom sheet content</div>
            </joy-bottom-sheet>
        `);

        const contentElement: E2EElement = await page.find('[data-testid="bottom-sheet-content-slot"]');
        const bottomElement: E2EElement = await page.find('joy-bottom-sheet >>> [data-testid="bottom-sheet-footer"] >>> joy-button');

        expect(contentElement.textContent).toBe('bottom sheet content');
        expect(bottomElement.textContent).toBe('given-close-label');
    });
});
