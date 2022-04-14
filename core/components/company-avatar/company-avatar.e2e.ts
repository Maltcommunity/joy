import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

describe('company-avatar e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-company-avatar></joy-company-avatar>');
        const element: E2EElement = await page.find('joy-company-avatar');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders company-avatar with an actual photo', async () => {
        const page = await newE2EPage();
        await page.setContent(
            '<joy-company-avatar img-src="https://globalnews.ca/wp-content/uploads/2018/08/gettyimages-903462776.jpg?w=100"></joy-company-avatar>',
        );
        const img: E2EElement = await page.find('joy-company-avatar >>> img');

        expect(img).not.toBe(null);
    });

    it('renders small size company-avatar', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-company-avatar size="small"></joy-company-avatar>');
        const companyAvatar: E2EElement = await page.find('joy-company-avatar >>> .joy-company-avatar');

        expect(companyAvatar).toHaveClass('joy-company-avatar_small');
    });

    it('renders medium size company-avatar', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-company-avatar size="medium"></joy-company-avatar>');
        const companyAvatar: E2EElement = await page.find('joy-company-avatar >>> .joy-company-avatar');

        expect(companyAvatar).toHaveClass('joy-company-avatar_medium');
    });

    it('renders big size company-avatar', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-company-avatar size="big"></joy-company-avatar>');
        const companyAvatar: E2EElement = await page.find('joy-company-avatar >>> .joy-company-avatar');

        expect(companyAvatar).toHaveClass('joy-company-avatar_big');
    });
});
