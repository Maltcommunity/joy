import {E2EPage, newE2EPage} from '@stencil/core/testing';
import {createPage} from '../../tests';

describe('product-tour e2e', () => {
    it('should render product-tour and navigate to the other, then hide everything', async () => {
        const page = await createPage();
        await page.setViewport({
            width: 1100,
            height: 600,
        });

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

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();

        const triggerSecond = await page.find('[product-tour="myProductTour2"]');
        await triggerSecond.click();
        await page.waitForChanges();
        const result2 = await page.screenshot();
        expect(result2).toMatchImageSnapshot();

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
        await page.setViewport({
            width: 1100,
            height: 600,
        });

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

    it('should prevent product-tour dismiss when clicking on overlay', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setViewport({
            width: 1100,
            height: 600,
        });

        await page.setContent(`
            <joy-product-tour-trigger product-tour="myProductTour">
                <joy-button variant="main">I am the first highlighted feature</joy-button>
            </joy-product-tour-trigger>

            <joy-product-tour id="myProductTour" icon="medal-thumbsup" steps="1" step="1" position="bottom">
                <div slot="product-tour-header">
                    I am the product tour title
                </div>

                <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
            </joy-product-tour>
        `);

        const trigger = await page.find('joy-product-tour-trigger');
        await trigger.click();
        await page.waitForChanges();

        const productTour = await page.find('joy-product-tour');
        expect(await productTour.isVisible()).toBe(true);

        const overlay = await page.find('.joy-product-tour--overlay');
        await overlay.click();
        await page.waitForChanges();

        expect(await productTour.isVisible()).toBe(true);
    });

    it('should dismiss the product-tour when clicking on overlay when dismissed-by="all"', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setViewport({
            width: 1100,
            height: 600,
        });

        await page.setContent(`
            <joy-product-tour-trigger product-tour="myProductTour">
                <joy-button variant="main">I am the first highlighted feature</joy-button>
            </joy-product-tour-trigger>

            <joy-product-tour id="myProductTour" icon="medal-thumbsup" steps="1" step="1" position="bottom" dismissed-by="all">
                <div slot="product-tour-header">
                    I am the product tour title
                </div>

                <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
            </joy-product-tour>
        `);

        const trigger = await page.find('joy-product-tour-trigger');
        await trigger.click();
        await page.waitForChanges();

        const productTour = await page.find('joy-product-tour');
        expect(await productTour.isVisible()).toBe(true);

        const overlay = await page.find('.joy-product-tour--overlay');
        await overlay.click();
        await page.waitForChanges();

        expect(await productTour.isVisible()).toBe(false);
    });

    it('should render the product tour on a target outside the trigger', async () => {
        const page = await createPage();
        await page.setViewport({
            width: 1100,
            height: 600,
        });

        await page.setContent(`
            <joy-product-tour-trigger product-tour="myProductTour" target="#productTourTarget">
                <joy-button variant="main">Start the product tour</joy-button>
            </joy-product-tour-trigger>
            
            <joy-tag variant="important" id="productTourTarget">I am a tag</joy-tag>

            <joy-product-tour id="myProductTour" target="#productTourTarget">
                <div slot="product-tour-header">
                    I am the product tour title
                </div>

                <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
            </joy-product-tour>
        `);

        const trigger = await page.find('joy-product-tour-trigger');
        await trigger.click();
        await page.waitForChanges();

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should keep the highlighted target clickable', async () => {
        const page = await createPage();
        await page.setViewport({
            width: 1100,
            height: 600,
        });

        await page.setContent(`
            <joy-product-tour-trigger product-tour="myProductTour" target="#productTourTarget">
                <joy-button variant="main">Start the product tour</joy-button>
            </joy-product-tour-trigger>
            
            <joy-button variant="primary" id="productTourTarget">I am a clickable highlighted button</joy-button>

            <joy-product-tour id="myProductTour" target="#productTourTarget">
                <div slot="product-tour-header">
                    I am the product tour title
                </div>

                <joy-button size="small" variant="ghost" slot="product-tour-dismiss">Got it</joy-button>
            </joy-product-tour>
        `);

        const trigger = await page.find('joy-product-tour-trigger');
        await trigger.click();
        await page.waitForChanges();

        const target = await page.find('#productTourTarget');
        const spy = jest.spyOn(target, 'click');
        await target.click();

        expect(spy).toHaveBeenCalled();
    });
});
