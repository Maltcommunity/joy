import {E2EPage, newE2EPage} from '@stencil/core/testing/';

describe('Tags Input - e2e', () => {
    it('should render the tags input', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-input></joy-tags-input>
        `);

        const tagsInput = await page.find('joy-tags-input');
        expect(tagsInput).toHaveAttribute('hydrated');
        expect(tagsInput).not.toBeNull();
    });

    it('should display the tags input with default values', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-input values="['first tag', 'second tag']"></joy-tags-input>
        `);

        const tags = await page.findAll('joy-tags-input >>> joy-tag');
        expect(tags.length).toBe(2);
    });

    it('should be able to add a tag by pressing specific keys', async () => {
        let tags;

        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-input values="['first tag', 'second tag']"></joy-tags-input>
        `);

        tags = await page.findAll('joy-tags-input >>> joy-tag');
        const input = await page.find('joy-tags-input >>> input');
        expect(tags.length).toBe(2);

        await input.focus();
        await page.keyboard.type('third tag');
        await input.press('Enter');
        await page.waitForChanges();
        tags = await page.findAll('joy-tags-input >>> joy-tag');
        expect(tags.length).toBe(3);
        expect(tags[2].textContent).toBe('third tag');

        await page.keyboard.type('fourth tag');
        await input.press('KeyM');
        await page.waitForChanges();
        tags = await page.findAll('joy-tags-input >>> joy-tag');
        expect(tags.length).toBe(4);
        expect(tags[3].textContent).toBe('fourth tag');
    });

    it('should be able to remove a tag', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-input values="['first tag', 'second tag']"></joy-tags-input>
        `);

        // Need to find a way to handle click.
        // Looks like it can't intercept any event when I click on the "cross" icon
    });

    it('should mark component as invalid with specific validation for emails', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-input validation="email" values="['first tag']"></joy-tags-input>
        `);

        const invalid = await page.find('joy-tags-input >>> .joy-tags-input-inner-invalid');
        expect(invalid).not.toBeNull();
    });

    it('should transfer component props to joy-tag', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-tags-input variant="secondary" size="large" values="['first tag']"></joy-tags-input>
        `);

        const tag = await page.find('joy-tags-input >>> joy-tag');
        expect(tag).toHaveClasses(['joy-tag_large', 'joy-tag_secondary']);
    });
});
