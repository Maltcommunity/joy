import {E2EPage, newE2EPage} from '@stencil/core/testing';

async function resetCssTransition(page: E2EPage) {
    await page.addStyleTag({
        content: 'joy-backdrop {--backdrop-animation: 0.01ms !important}',
    });
}

describe('product-tour e2e', () => {
    it('should render product-tour and navigate to the other, then hide everything', async () => {
        const page: E2EPage = await newE2EPage();
        await resetCssTransition(page);

        await page.setContent(`
            <joy-product-tour-trigger product-tour="myProductTour">
                <joy-button variant="main">Run product tour manually</joy-button>
            </joy-product-tour-trigger>
            
            <joy-button variant="primary" id="myProductTourHighlighted">I am the next feature highlighted</joy-button>

            <joy-product-tour id="myProductTour" icon="medal-thumbsup" steps="2" step="1" position="bottom">
                <joy-tags-list slot="product-tour-preheader">
                    <joy-tag variant="primary">I am a tag</joy-tag>
                    <joy-tag variant="pricing">I am another tag</joy-tag>
                </joy-tags-list>
                
                <div slot="product-tour-header">
                I am the product tour title
                </div>
                
                <p slot="product-tour-content">Lorem ipsum</p>
                
                <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
                <joy-product-tour-trigger product-tour="myProductTour2" slot="product-tour-next" target="#myProductTourHighlighted">
                    <joy-button size="small" variant="main">Next</joy-button>
                </joy-product-tour-trigger>
            </joy-product-tour>
            
            <joy-product-tour id="myProductTour2" icon="medal-thumbsup" steps="2" step="2" position="bottom">    
                <div slot="product-tour-header">
                I am the product tour title of the second step
                </div>
                
                <p slot="product-tour-content">Lorem ipsum</p>
                
                <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
                <joy-button size="small" variant="main" slot="product-tour-dismiss">Thanks</joy-button>
            </joy-product-tour>
        `);

        const trigger = await page.find('joy-product-tour-trigger');
        const productTour = await page.find('joy-product-tour');
        const isVisible = await productTour.isVisible();
        expect(isVisible).toBe(false); // Don't need to generate a screenshot for this...

        await trigger.click();
        await page.waitForChanges();

        const result = await page.compareScreenshot('Product tour shown');
        expect(result).toMatchScreenshot();

        const triggerSecond = await page.find('[product-tour="myProductTour2"]');
        await triggerSecond.click();
        await page.waitForChanges();
        const result2 = await page.compareScreenshot('Second Product tour shown at bottom');
        expect(result2).toMatchScreenshot();

        const dismiss = await page.find('joy-product-tour#myProductTour2 [slot="product-tour-dismiss"]');
        await dismiss.click();
        await page.waitForChanges();

        const productTours = await page.findAll('joy-product-tour');
        productTours.map(async (productTour) => {
            const isVisible = await productTour.isVisible();
            expect(isVisible).toBe(false);
        });
    });

    it('should render product-tour on load, then hide it', async () => {
        const page: E2EPage = await newE2EPage();
        await resetCssTransition(page);

        await page.setContent(`
            <joy-product-tour-trigger product-tour="myProductTour" show-on-load>
                <joy-button variant="main">I am the first highlighted feature</joy-button>
            </joy-product-tour-trigger>

            <joy-product-tour id="myProductTour" icon="medal-thumbsup" steps="1" step="1" position="bottom">
                <div slot="product-tour-header">
                    I am the product tour title
                </div>

                <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
            </joy-product-tour>
        `);

        const productTour = await page.find('joy-product-tour');
        const isVisible = await productTour.isVisible();
        expect(isVisible).toBe(true);

        const dismiss = await page.find('joy-product-tour#myProductTour [slot="product-tour-dismiss"]');
        await dismiss.click();
        await page.waitForChanges();

        const isVisibleAfterDismiss = await productTour.isVisible();
        expect(isVisibleAfterDismiss).toBe(false);
    });
});
