import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

describe('avatar e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-avatar></joy-avatar>');
        const element: E2EElement = await page.find('joy-avatar');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders avatar with an actual photo', async () => {
        const page = await newE2EPage();
        await page.setContent(
            '<joy-avatar photo-url="https://globalnews.ca/wp-content/uploads/2018/08/gettyimages-903462776.jpg?w=100"></joy-avatar>',
        );
        const img: E2EElement = await page.find('joy-avatar >>> picture img');

        expect(img).not.toBe(null);
    });

    it('renders medium size avatar without any size prop given', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-avatar></joy-avatar>');
        const avatar: E2EElement = await page.find('joy-avatar >>> .joy-avatar');

        expect(avatar).toHaveClass('joy-avatar__medium');
    });

    it('renders small size avatar', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-avatar size="small"></joy-avatar>');
        const avatar: E2EElement = await page.find('joy-avatar >>> .joy-avatar');

        expect(avatar).toHaveClass('joy-avatar__small');
    });

    it('renders medium size avatar', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-avatar size="medium"></joy-avatar>');
        const avatar: E2EElement = await page.find('joy-avatar >>> .joy-avatar');

        expect(avatar).toHaveClass('joy-avatar__medium');
    });

    it('renders large size avatar', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-avatar size="large"></joy-avatar>');
        const avatar: E2EElement = await page.find('joy-avatar >>> .joy-avatar');

        expect(avatar).toHaveClass('joy-avatar__large');
    });

    it('renders avatar with initials, given full-name but no photo-url', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-avatar full-name="Lino Ventura"></joy-avatar>');
        const cmp = await page.find('joy-avatar');
        const avatar: E2EElement = await page.find('joy-avatar >>> .joy-avatar');

        expect(avatar.textContent).toBe('LV');

        // Lets do some undercover unit testing here, just to check initials are the right ones
        cmp.setProperty('fullName', 'Vino Lentura');
        await page.waitForChanges();
        expect(avatar.textContent).toBe('VL');

        cmp.setProperty('fullName', 'Jean-Pierre Papin');
        await page.waitForChanges();
        expect(avatar.textContent).toBe('JP');
    });

    it('renders avatar with a placeholder icon, no photoUrl nor fullName given', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-avatar></joy-avatar>');
        const icon: E2EElement = await page.find('joy-avatar >>> joy-icon');

        expect(icon).not.toBe(null);
    });

    it('renders avatar with a specific background class, given color prop', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-avatar color="teal"></joy-avatar>');
        const avatar = await page.find('joy-avatar');

        const teal = await page.find('joy-avatar >>> .joy-avatar__teal');
        expect(teal).not.toBe(null);

        await avatar.setProperty('color', 'yellow');
        await page.waitForChanges();
        const yellow = await page.find('joy-avatar >>> .joy-avatar__yellow');
        expect(yellow).not.toBe(null);

        await avatar.setProperty('color', 'red');
        await page.waitForChanges();
        const red = await page.find('joy-avatar >>> .joy-avatar__red');
        expect(red).not.toBe(null);
    });

    it('renders nothing but a "+X" indication about the full length of avatars list', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-avatar total-number="15"></joy-avatar>');
        const icon: E2EElement = await page.find('joy-avatar >>> joy-icon');
        const avatar: E2EElement = await page.find('joy-avatar >>> .joy-avatar');
        const style = await avatar.getComputedStyle();

        expect(icon).toBe(null);
        expect(avatar.textContent).toBe('+15');
        expect(style.backgroundColor).toBe('rgb(3, 82, 102)');
    });
});
