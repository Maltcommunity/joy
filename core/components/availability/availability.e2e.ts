import {E2EElement, newE2EPage} from '@stencil/core/testing';

describe('availability e2e', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability></joy-availability>');
        const element: E2EElement = await page.find('joy-availability');
        expect(element).toHaveAttribute('hydrated');
    });

    it('renders with label', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability label="Test" status="AVAILABLE_AND_VERIFIED"></joy-availability>');
        const component: E2EElement = await page.find('joy-availability');
        expect(component.shadowRoot.textContent).toBe('Test');
    });

    it('renders only dot with status', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability status="AVAILABLE"></joy-availability>');
        const component: E2EElement = await page.find('joy-availability');
        const dot: E2EElement = await page.find('joy-availability >>> .joy-availability__dot');
        expect(dot).toHaveClass('AVAILABLE');
        expect(component.shadowRoot.textContent).toBe('');
    });

    it('renders with partial', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability is-partial></joy-availability>');
        const dot: E2EElement = await page.find('joy-availability >>> .joy-availability__dot');
        expect(dot).toHaveClass('PARTIAL');
    });

    it('renders with AVAILABLE status', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability status="AVAILABLE"></joy-availability>');
        const dot: E2EElement = await page.find('joy-availability >>> .joy-availability__dot');
        expect(dot).toHaveClass('AVAILABLE');
    });

    it('renders with AVAILABLE_SOON status', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability status="AVAILABLE_SOON"></joy-availability>');
        const dot: E2EElement = await page.find('joy-availability >>> .joy-availability__dot');
        expect(dot).toHaveClass('AVAILABLE_SOON');
    });

    it('renders with NOT_AVAILABLE status', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability status="NOT_AVAILABLE"></joy-availability>');
        const dot: E2EElement = await page.find('joy-availability >>> .joy-availability__dot');
        expect(dot).toHaveClass('NOT_AVAILABLE');
    });

    it('renders with NOT_AVAILABLE_WITH_DATE status', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability status="NOT_AVAILABLE_WITH_DATE"></joy-availability>');
        const dot: E2EElement = await page.find('joy-availability >>> .joy-availability__dot');
        expect(dot).toHaveClass('NOT_AVAILABLE_WITH_DATE');
    });

    it('renders with AVAILABLE_AND_VERIFIED status', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-availability status="AVAILABLE_AND_VERIFIED"></joy-availability>');
        const dot: E2EElement = await page.find('joy-availability >>> .joy-availability__dot');
        expect(dot).toHaveClass('AVAILABLE_AND_VERIFIED');
    });
});
