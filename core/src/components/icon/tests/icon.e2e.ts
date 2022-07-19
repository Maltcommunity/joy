import {newE2EPage} from '@stencil/core/testing';
import {createPage} from '../../../tests';

describe('icon e2e', () => {
    it('renders with a name', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-icon name="add"></joy-icon>');
        const element = await page.find('joy-icon');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders with specific colors', async () => {
        const page = await createPage();
        await page.setContent(`
            <joy-icon name="bell" color="grey"></joy-icon>
            <joy-icon name="bell" color="red"></joy-icon>
            <joy-icon name="bell" color="yellow"></joy-icon>
            <joy-icon name="bell" color="green"></joy-icon>
            <joy-icon name="bell" color="white"></joy-icon>
            <joy-icon name="bell" color="turquoise"></joy-icon>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('renders with specific sizes', async () => {
        const page = await createPage();
        await page.setContent(`
            <joy-icon name="bell" size="xsmall"></joy-icon>
            <joy-icon name="bell" size="small"></joy-icon>
            <joy-icon name="bell" size="medium"></joy-icon>
            <joy-icon name="bell" size="large"></joy-icon>
            <joy-icon name="bell" size="xlarge"></joy-icon>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('renders with two colors', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-icon name="bell" color="grey" bicolor></joy-icon>
            <joy-icon name="bell" color="red" bicolor></joy-icon>
            <joy-icon name="bell" color="yellow" bicolor></joy-icon>
            <joy-icon name="bell" color="green" bicolor></joy-icon>
            <joy-icon name="bell" color="white" bicolor></joy-icon>
            <joy-icon name="bell" color="turquoise" bicolor></joy-icon>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('renders with full colored background', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-icon name="bell" color="grey" full></joy-icon>
            <joy-icon name="bell" color="red" full></joy-icon>
            <joy-icon name="bell" color="yellow" full></joy-icon>
            <joy-icon name="bell" color="green" full></joy-icon>
            <joy-icon name="bell" color="white" full></joy-icon>
            <joy-icon name="bell" color="turquoise" full></joy-icon>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('renders with clickable effect', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-icon name="add" clickable="true"></joy-icon>');
        const icon = await page.find('joy-icon >>> .joy-icon');

        expect(icon).toHaveClass('joy-icon--clickable');
    });
});
