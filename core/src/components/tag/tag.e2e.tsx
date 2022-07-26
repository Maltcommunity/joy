import {newE2EPage} from '@stencil/core/testing';
import {createPage} from '../../tests';

/**
 * This E2E suite is used for both joy-tag and joy-tags-list components.
 */
describe('Tags - e2e', () => {
    it('should display the list of all tags variant, in a list wrapper, with default size', async () => {
        const page = await createPage();
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
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should display the list of all tags variant, in a list wrapper, with xsmall size', async () => {
        const page = await createPage();
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
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should display the list of all tags variant, in a list wrapper, with small size', async () => {
        const page = await createPage();
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
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should display the list of all tags variant, in a list wrapper, with large size', async () => {
        const page = await createPage();
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
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should display a selectable tag changing style when we click (select) it', async () => {
        const page = await createPage();
        await page.setContent(`
            <joy-tag variant="secondary" selectable>Click me</joy-tag>              
        `, { waitUntil: 'networkidle0' });

        const tag = await page.find('joy-tag');
        await tag.click();
        await page.waitForChanges();

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should display draggable and removable tags, with specific icons', async () => {
        const page = await createPage();
        await page.setContent(`
            <joy-tag variant="primary" draggable removable>Draggable tag</joy-tag>              
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should emit custom event with the tag text without any white space, when removing a tag or selecting it', async () => {

        /**
         * Tag component is not meant to use both removable and selectable. We merge two scenarios here as we test the same thing
         */
        const page = await newE2EPage();
        await page.setContent(`
            <joy-tag selectable removable>&nbsp;&nbsp;Removable tag</joy-tag>              
        `, { waitUntil: 'networkidle0' });

        const tag = await page.find('joy-tag');
        const removeIcon = await page.find('joy-tag >>> joy-icon');
        const joyTagRemove = await page.spyOnEvent('joy-tag-remove');
        const joyTagClick = await page.spyOnEvent('joy-tag-click');

        await tag.click();
        await page.waitForChanges();
        expect(joyTagClick).toHaveReceivedEventDetail({
            name: 'Removable tag',
            selected: true,
        });

        await removeIcon.click();
        await page.waitForChanges();
        expect(joyTagRemove).toHaveReceivedEventDetail('Removable tag');
    });
});
