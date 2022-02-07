import {newE2EPage} from '@stencil/core/testing';

describe('icon e2e', () => {
    it('renders with a name', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-icon name="add"></joy-icon>');
        const element = await page.find('joy-icon');
        expect(element).toHaveClass('hydrated');
    });

    it('renders with specific colors', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-icon name="add" color="grey"></joy-icon>');
        const icon = await page.find('joy-icon');
        expect(icon).toHaveClass('joy-i-wc_grey');

        icon.setAttribute('color', 'red');
        await page.waitForChanges();
        expect(icon).toHaveClass('joy-i-wc_red');

        icon.setAttribute('color', 'yellow');
        await page.waitForChanges();
        expect(icon).toHaveClass('joy-i-wc_yellow');

        icon.setAttribute('color', 'green');
        await page.waitForChanges();
        expect(icon).toHaveClass('joy-i-wc_green');

        icon.setAttribute('color', 'white');
        await page.waitForChanges();
        expect(icon).toHaveClass('joy-i-wc_white');
    });

    it('renders with specific size', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-icon name="add" size="xsmall"></joy-icon>');
        const icon = await page.find('joy-icon');
        expect(icon).toHaveClass('joy-i-wc_xsmall');

        icon.setAttribute('size', 'small');
        await page.waitForChanges();
        expect(icon).toHaveClass('joy-i-wc_small');

        icon.setAttribute('size', 'medium');
        await page.waitForChanges();
        expect(icon).toHaveClass('joy-i-wc_medium');

        icon.setAttribute('size', 'large');
        await page.waitForChanges();
        expect(icon).toHaveClass('joy-i-wc_large');

        icon.setAttribute('size', 'xlarge');
        await page.waitForChanges();
        expect(icon).toHaveClass('joy-i-wc_xlarge');
    });

    it('renders with two colors', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-icon name="add" bicolor="true"></joy-icon>');
        const icon = await page.find('joy-icon');

        expect(icon).toHaveClass('joy-i-wc_bg');
    });

    it('renders with full colored background', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-icon name="add" full="true"></joy-icon>');
        const icon = await page.find('joy-icon');

        expect(icon).toHaveClass('joy-i-wc_full');
    });

    it('renders with clickable effect', async () => {
        const page = await newE2EPage();

        await page.setContent('<joy-icon name="add" clickable="true"></joy-icon>');
        const icon = await page.find('joy-icon');

        expect(icon).toHaveClass('joy-i-wc_clickable');
    });
});
