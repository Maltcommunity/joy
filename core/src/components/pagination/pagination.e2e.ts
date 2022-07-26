import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

describe('pagination e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination></joy-pagination>');
        const element: E2EElement = await page.find('joy-pagination');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders component with default next and prev buttons without link', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="10"></joy-pagination>');
        const component: E2EElement = await page.find('joy-pagination');
        const prevLink = await component.find('joy-pagination >>> .joy-pagination__previous a');
        const nextLink = await component.find('joy-pagination >>> .joy-pagination__next a');

        expect(prevLink).toBe(null);
        expect(nextLink).toBe(null);
    });

    it('renders component with next and prev buttons links', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="10" link-prev="https://toto.com" link-next="https://toto.com"></joy-pagination>');
        const prevLink = await page.find('joy-pagination >>> .joy-pagination__previous a');
        const nextLink = await page.find('joy-pagination >>> .joy-pagination__next a');

        expect(prevLink).not.toBeNull();
        expect(nextLink).not.toBeNull();
    });

    it('renders component with next and prev titles and aria-labels', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="10" label-prev="Previous page" label-next="Next page"></joy-pagination>');
        const prevLink = await page.find('joy-pagination >>> .joy-pagination__previous joy-icon');
        const nextLink = await page.find('joy-pagination >>> .joy-pagination__next joy-icon');

        expect(prevLink).not.toBeNull();
        expect(nextLink).not.toBeNull();

        expect(prevLink.getAttribute('title')).toBe('Previous page');
        expect(prevLink.getAttribute('aria-label')).toBe('Previous page');

        expect(nextLink.getAttribute('title')).toBe('Next page');
        expect(nextLink.getAttribute('aria-label')).toBe('Next page');
    });

    it('renders component able to dispatch a custom changePage event with right data when we click on specific pages', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="10"></joy-pagination>');
        await page.find('joy-pagination');
        const pageChange = await page.spyOnEvent('joy-pagination-change-page');

        // Click on fourth page
        const pageFour = await page.find('joy-pagination >>> [data-page="4"]');
        await pageFour.click();
        await page.waitForChanges();
        expect(pageChange).toHaveReceivedEventDetail(4);

        // Click on previous page
        const previousPage = await page.find('joy-pagination >>> .joy-pagination__previous');
        await previousPage.click();
        await page.waitForChanges();

        expect(pageChange).toHaveReceivedEventDetail(3);

        // Click on 3 next pages
        const nextPage = await page.find('joy-pagination >>> .joy-pagination__next');
        await nextPage.click();
        await nextPage.click();
        await nextPage.click();
        await page.waitForChanges();

        expect(pageChange).toHaveReceivedEventDetail(6);
    });

    it('renders component unable to click to previous page, as we are in the first page', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="10"></joy-pagination>');
        await page.find('joy-pagination');
        const pageChange = await page.spyOnEvent('joy-pagination-change-page');

        // Click on previous page
        const previousPage = await page.find('joy-pagination >>> .joy-pagination__previous joy-icon');
        await previousPage.click();
        await page.waitForChanges();

        expect(pageChange).toHaveReceivedEventTimes(0);
    });

    it('renders component unable to click to next page, as we are in the last page', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="10" current-page="10"></joy-pagination>');
        await page.find('joy-pagination');
        const pageChange = await page.spyOnEvent('joy-pagination-change-page');

        // Click on previous page
        const nextPage = await page.find('joy-pagination >>> .joy-pagination__next joy-icon');
        await nextPage.click();
        await page.waitForChanges();

        expect(pageChange).toHaveReceivedEventTimes(0);
    });

    it('should render only 3 pages with totalPages at 3, but maxPagesToDisplay is higher (6)', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="3"></joy-pagination>');
        const separatorFirstPage: E2EElement = await page.find('joy-pagination >>> .joy-pagination__separator-after');
        const separatorLastPage: E2EElement = await page.find('joy-pagination >>> .joy-pagination__separator-before');
        expect(separatorFirstPage).toBe(null);
        expect(separatorLastPage).toBe(null);
    });

    it('should render 6 pages with a quicklink to last page', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="12"></joy-pagination>');
        const separatorFirstPage: E2EElement = await page.find('joy-pagination >>> .joy-pagination__separator-after');
        const separatorLastPage: E2EElement = await page.find('joy-pagination >>> .joy-pagination__separator-before');
        expect(separatorFirstPage).toBe(null);
        expect(separatorLastPage).not.toBe(null);

        // Quick check to be sure pages 1,2,3,4,5 and 12 only are rendered
        const secondPage: E2EElement = await page.find('joy-pagination >>> [data-page="2"]');
        const fifthPage: E2EElement = await page.find('joy-pagination >>> [data-page="5"]');
        const sixthPage: E2EElement = await page.find('joy-pagination >>> [data-page="6"]');

        expect(secondPage).not.toBe(null);
        expect(fifthPage).not.toBe(null);
        expect(sixthPage).toBe(null);
    });

    it('should render 6 pages with current one at 5, with a quicklink to last page and first page', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="12" current-page="5"></joy-pagination>');
        const separatorFirstPage: E2EElement = await page.find('joy-pagination >>> .joy-pagination__separator-after');
        const separatorLastPage: E2EElement = await page.find('joy-pagination >>> .joy-pagination__separator-before');
        expect(separatorFirstPage).not.toBe(null);
        expect(separatorLastPage).not.toBe(null);

        // Quick check to be sure pages 1,3,4,5,6,12 only are rendered
        const secondPage: E2EElement = await page.find('joy-pagination >>> [data-page="2"]');
        const thirdPage: E2EElement = await page.find('joy-pagination >>> [data-page="3"]');
        const sixthPage: E2EElement = await page.find('joy-pagination >>> [data-page="6"]');
        const seventhPage: E2EElement = await page.find('joy-pagination >>> [data-page="7"]');

        expect(secondPage).toBe(null);
        expect(thirdPage).not.toBe(null);
        expect(sixthPage).not.toBe(null);
        expect(seventhPage).toBe(null);
    });

    it('should render 6 pages with current one at last, with a quicklink to first page', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-pagination total-pages="12" current-page="12"></joy-pagination>');
        const separatorFirstPage: E2EElement = await page.find('joy-pagination >>> .joy-pagination__separator-after');
        const separatorLastPage: E2EElement = await page.find('joy-pagination >>> .joy-pagination__separator-before');
        expect(separatorFirstPage).not.toBe(null);
        expect(separatorLastPage).toBe(null);

        // Quick check to be sure pages 1, 8, 9, 10, 11, 12 only are rendered
        const seventhPage: E2EElement = await page.find('joy-pagination >>> [data-page="7"]');
        const eighthPage: E2EElement = await page.find('joy-pagination >>> [data-page="8"]');
        const lastPage: E2EElement = await page.find('joy-pagination >>> [data-page="12"]');

        expect(seventhPage).toBe(null);
        expect(eighthPage).not.toBe(null);
        expect(lastPage).not.toBe(null);
    });
});
