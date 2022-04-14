import {E2EElement, E2EPage, newE2EPage} from '@stencil/core/testing';

/**
 * This E2E suite is used for both joy-tag and joy-tags-list components.
 */
describe('Tags list - e2e', () => {
    it('should display the list of all tags variant, in a list wrapper, with default size', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-list>
                <joy-tag variant="primary">Primary tag</joy-tag>
                <joy-tag variant="secondary">Secondary tag</joy-tag>
                <joy-tag variant="important">Important tag</joy-tag>
                <joy-tag variant="pending">Pending tag</joy-tag>
                <joy-tag variant="special">Special tag</joy-tag>
                <joy-tag variant="inactive">Inactive tag</joy-tag>
                <joy-tag variant="pricing">Pricing tag</joy-tag>
            </joy-tags-list>
        `);

        const tags = await page.findAll('joy-tag');
        expect(tags.length).toBe(7);

        tags.forEach((tag: E2EElement) => {
            expect(tag.classList.contains('joy-tag_medium')).toBe(true);
            expect(tag.classList.contains('joy-tags-list-item')).toBe(true);
        });
    });

    it('should display the list of all tags variant, in a list wrapper, with xsmall size', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-list>
                <joy-tag variant="primary" size="xsmall">Primary tag</joy-tag>
                <joy-tag variant="secondary" size="xsmall">Secondary tag</joy-tag>
                <joy-tag variant="important" size="xsmall">Important tag</joy-tag>
                <joy-tag variant="pending" size="xsmall">Pending tag</joy-tag>
                <joy-tag variant="special" size="xsmall">Special tag</joy-tag>
                <joy-tag variant="inactive" size="xsmall">Inactive tag</joy-tag>
                <joy-tag variant="pricing" size="xsmall">Pricing tag</joy-tag>   
            </joy-tags-list>
        `);

        const tags = await page.findAll('joy-tag');

        tags.forEach((tag: E2EElement) => {
            expect(tag.classList.contains('joy-tag_xsmall')).toBe(true);
        });
    });

    it('should display the list of all tags variant, in a list wrapper, with small size', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-list>
                <joy-tag variant="primary" size="small">Primary tag</joy-tag>
                <joy-tag variant="secondary" size="small">Secondary tag</joy-tag>
                <joy-tag variant="important" size="small">Important tag</joy-tag>
                <joy-tag variant="pending" size="small">Pending tag</joy-tag>
                <joy-tag variant="special" size="small">Special tag</joy-tag>
                <joy-tag variant="inactive" size="small">Inactive tag</joy-tag>
                <joy-tag variant="pricing" size="small">Pricing tag</joy-tag>
            </joy-tags-list>
        `);

        const tags = await page.findAll('joy-tag');

        tags.forEach((tag: E2EElement) => {
            expect(tag.classList.contains('joy-tag_small')).toBe(true);
        });
    });

    it('should display the list of all tags variant, in a list wrapper, with large size', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-list>
                <joy-tag variant="primary" size="large">Primary tag</joy-tag>
                <joy-tag variant="secondary" size="large">Secondary tag</joy-tag>
                <joy-tag variant="important" size="large">Important tag</joy-tag>
                <joy-tag variant="pending" size="large">Pending tag</joy-tag>
                <joy-tag variant="special" size="large">Special tag</joy-tag>
                <joy-tag variant="inactive" size="large">Inactive tag</joy-tag>
                <joy-tag variant="pricing" size="large">Pricing tag</joy-tag>
            </joy-tags-list>
        `);

        const tags = await page.findAll('joy-tag');

        tags.forEach((tag: E2EElement) => {
            expect(tag.classList.contains('joy-tag_large')).toBe(true);
        });
    });

    it('should display a selectable tag changing style when we click (select) it', async () => {
        let tag;

        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tag variant="secondary" selectable>Click me</joy-tag>              
        `);

        tag = await page.find('joy-tag');
        expect(tag.classList.contains('joy-tag__selected')).toBe(false);
        await tag.click();
        await page.waitForChanges();

        tag = await page.find('joy-tag');
        expect(tag.classList.contains('joy-tag__selected')).toBe(true);
    });

    it('should display draggable and removable tags, with specific icons', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tag variant="primary" draggable removable></joy-tag>              
        `);

        const drag = await page.find('joy-tag >>> .joy-tag__drag');
        const remove = await page.find('joy-tag >>> .joy-tag__removable');
        expect(drag).not.toBeNull();
        expect(remove).not.toBeNull();
    });
});
