import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

describe('avatars-list e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-avatars-list></joy-avatars-list>');
        const element: E2EElement = await page.find('joy-avatars-list');
        expect(element).toHaveClass('hydrated');
    });

    it('renders an standard list with 3 joy-avatar', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-avatars-list>
                <joy-avatar></joy-avatar>
                <joy-avatar></joy-avatar>
                <joy-avatar></joy-avatar>
            </joy-avatars-list>
        `);

        const avatars: E2EElement[] = await page.findAll('joy-avatars-list joy-avatar');

        expect(avatars).toHaveLength(3);
    });

    it('renders an standard list with 6 joy-avatar and a specific background color', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-avatars-list>
                <joy-avatar full-name="Toto Tata"></joy-avatar>
                <joy-avatar full-name="Gary Cooper"></joy-avatar>
                <joy-avatar full-name="Tati Teto"></joy-avatar>
                <joy-avatar total-number="14"></joy-avatar>
                <joy-avatar></joy-avatar>
                <joy-avatar full-name="Steven Spielberg"></joy-avatar>
            </joy-avatars-list>
        `);

        const avatars: E2EElement[] = await page.findAll('joy-avatars-list joy-avatar');
        expect(avatars).toHaveLength(6);

        const firstAvatar = await page.find('joy-avatars-list joy-avatar:first-child >>> .joy-avatar');
        const firstAvatarStyle = await firstAvatar.getComputedStyle();
        expect(firstAvatarStyle.backgroundColor).toBe('rgb(3, 82, 102)');

        const secondAvatar = await page.find('joy-avatars-list joy-avatar:nth-child(2) >>> .joy-avatar');
        const secondAvatarStyle = await secondAvatar.getComputedStyle();
        expect(secondAvatarStyle.backgroundColor).toBe('rgb(18, 207, 201)');

        const thirdAvatar = await page.find('joy-avatars-list joy-avatar:nth-child(3) >>> .joy-avatar');
        const thirdAvatarStyle = await thirdAvatar.getComputedStyle();
        expect(thirdAvatarStyle.backgroundColor).toBe('rgb(252, 87, 87)');

        // Here, as we only have 5 different colors, we check that the 6th item has the same colo than first one
        const lastAvatar = await page.find('joy-avatars-list joy-avatar:nth-child(6) >>> .joy-avatar');
        const lastAvatarStyle = await lastAvatar.getComputedStyle();
        expect(lastAvatarStyle.backgroundColor).toBe(firstAvatarStyle.backgroundColor);
    });

    it('renders an compressed list with 4 joy-avatar', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent(`
            <joy-avatars-list compress="true">
                <joy-avatar full-name="Toto Tata"></joy-avatar>
                <joy-avatar full-name="Gary Cooper"></joy-avatar>
                <joy-avatar></joy-avatar>
                <joy-avatar total-number="14"></joy-avatar>
            </joy-avatars-list>
        `);

        const list: E2EElement = await page.find('joy-avatars-list');
        const avatars: E2EElement[] = await page.findAll('joy-avatars-list joy-avatar');

        expect(list).toHaveClass('joy-avatars-list__compress');
        expect(avatars).toHaveLength(4);

        avatars.forEach((avatar) => async () => {
            const el = await avatar.find('.joy-avatar');
            expect(el).toHaveClass('joy-avatar_compress');
        });
    });
});
