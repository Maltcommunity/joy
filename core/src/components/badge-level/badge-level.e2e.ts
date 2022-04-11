import {newE2EPage, E2EPage, E2EElement} from '@stencil/core/testing';

describe('badge-level e2e', () => {
    it('renders', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-badge-level></joy-badge-level>');
        const element: E2EElement = await page.find('joy-badge-level');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders highpotential badge', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-badge-level type="highpotential"></joy-badge-level>');
        const badge: E2EElement = await page.find('joy-badge-level >>> svg.joy-badge-level__highpotential');
        const badgeText = await page.find('joy-badge-level >>> .joy-badge-level__tag');

        expect(badge).not.toBe(null);
        expect(badgeText.classList.contains('blue')).toBe(true);
        expect(badgeText.textContent).toBe('High Potential');
    });

    it('renders maltlinker badge', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-badge-level type="maltlinker"></joy-badge-level>');
        const badge: E2EElement = await page.find('joy-badge-level >>> svg.joy-badge-level__maltlinker');
        const badgeText = await page.find('joy-badge-level >>> .joy-badge-level__tag');

        expect(badge).not.toBe(null);
        expect(badgeText.classList.contains('red')).toBe(true);
        expect(badgeText.textContent).toBe('Malt Linker');
    });

    it('renders new badge', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-badge-level type="new"></joy-badge-level>');
        const badge: E2EElement = await page.find('joy-badge-level >>> svg');
        const badgeText = await page.find('joy-badge-level >>> .joy-badge-level__tag');

        expect(badge).toBe(null);
        expect(badgeText.classList.contains('red')).toBe(true);
        expect(badgeText.textContent).toBe('New');
    });

    it('renders verified badge', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-badge-level type="verified"></joy-badge-level>');
        const badge: E2EElement = await page.find('joy-badge-level >>> svg');
        const badgeText = await page.find('joy-badge-level >>> .joy-badge-level__tag');

        expect(badge).toBe(null);
        expect(badgeText.classList.contains('turquoise')).toBe(true);
        expect(badgeText.textContent).toBe('Verified');
    });

    describe('badge-level Supermalter e2e', () => {
        async function expectSupermalter(page: E2EPage, n: number) {
            const badges: E2EElement[] = await page.findAll('joy-badge-level >>> svg.joy-badge-level__supermalter');
            const badgeText = await page.find('joy-badge-level >>> .joy-badge-level__tag');

            expect(badges.length).toBe(n);
            expect(badgeText.classList.contains('blue')).toBe(true);
            expect(badgeText.textContent).toBe('Supermalter');
        }

        it('renders supermalter level 1 badge', async () => {
            const page = await newE2EPage();
            await page.setContent('<joy-badge-level type="supermalter"></joy-badge-level>');
            await expectSupermalter(page, 1);
        });

        it('renders supermalter level 2 badge', async () => {
            const page = await newE2EPage();
            await page.setContent('<joy-badge-level type="supermalter" super-malter-level="2"></joy-badge-level>');

            await expectSupermalter(page, 2);
        });

        it('renders supermalter level 2 badge', async () => {
            const page = await newE2EPage();
            await page.setContent('<joy-badge-level type="supermalter" super-malter-level="3"></joy-badge-level>');

            await expectSupermalter(page, 3);
        });
    });

    it('renders any badge with overridden text by slot', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-badge-level type="new">Toto!</joy-badge-level>');
        const component = await page.find('joy-badge-level');

        // textContent props does not work as <slot> Node is part of the answser and returns NewToto!
        const textElement = await component.find({
            text: 'Toto!',
        });

        expect(textElement).not.toBe(null);
    });

    it('renders any badge without text label', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-badge-level type="supermalter" super-malter-level="3" visible-text="false"></joy-badge-level>');
        const component = await page.find('joy-badge-level');
        const badgeText = await page.find('joy-badge-level >>> .joy-badge-level__tag');
        const textElement = await component.find({
            text: 'Supermalter',
        });
        expect(textElement).toBe(null);
        expect(badgeText).toBe(null);
    });
});
