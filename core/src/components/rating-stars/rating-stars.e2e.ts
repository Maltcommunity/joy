import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

/**
 This is a first e2e test file to validate the config
 Maybe it's not the most relevant way to test the component
 TODO: find a way not to reset "fourthStar" selector everytime we change it. Official documentation is not verbose about this
 */

describe('rating-stars e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-rating-stars></joy-rating-stars>');
        const element: E2EElement = await page.find('joy-rating-stars');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders specific note style according to given rate', async () => {
        const page = await newE2EPage();
        let fourthStar;
        const selector = 'joy-rating-stars >>> li:nth-child(4)';

        await page.setContent('<joy-rating-stars rating-value="4"></joy-rating-stars>');
        const component = await page.find('joy-rating-stars');
        fourthStar = await page.find(selector);
        expect(fourthStar.innerHTML.includes('star-full')).toBe(true);

        component.setProperty('ratingValue', 2);
        await page.waitForChanges();
        fourthStar = await page.find(selector);
        expect(fourthStar.innerHTML.includes('star-empty')).toBe(true);
    });

    it('renders component with a specific number of ratings', async () => {
        const page: E2EPage = await newE2EPage();
        const selector = 'joy-rating-stars >>> span';

        await page.setContent('<joy-rating-stars review-count="4"></joy-rating-stars>');
        const component: E2EElement = await page.find('joy-rating-stars');
        const numberOfRate = await page.find('joy-rating-stars >>> span');
        expect(numberOfRate.textContent).toBe('(4)');

        component.setProperty('reviewCount', 12);
        await page.waitForChanges();
        expect(numberOfRate.textContent).toBe('(12)');

        component.setProperty('reviewCount', 1);
        await page.waitForChanges();
        expect(numberOfRate.textContent).toBe('(1)');

        component.setProperty('reviewCount', 0);
        await page.waitForChanges();
        const span = await page.find(selector);
        expect(span).toBe(null);
    });
});
