import {E2EElement, E2EPage, newE2EPage} from '@stencil/core/testing';
import {createPage} from '../../tests';

describe('Stepper e2e', () => {
    it('should render component', async () => {
        const page: E2EPage = await newE2EPage();

        await page.setContent('<joy-stepper><joy-step></joy-step></joy-stepper>');
        const stepper: E2EElement = await page.find('joy-stepper');
        const step: E2EElement = await page.find('joy-step');

        expect(stepper).toHaveAttribute('hydrated');
        expect(step).toHaveAttribute('hydrated');
    });

    it('should render stepper at second step', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-stepper step="1">
                <joy-step>First Step</joy-step>
                <joy-step>Second Step</joy-step>
                <joy-step>Third Step</joy-step>
                <joy-step>Fourth Step</joy-step>
            </joy-stepper>
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should render justified stepper', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-stepper justify step="2">
                <joy-step>First Step</joy-step>
                <joy-step>Second Step</joy-step>
                <joy-step>Third Step</joy-step>
                <joy-step>Fourth Step</joy-step>
            </joy-stepper>
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should render stepper at second step with small steps next', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-stepper step="2">
                <joy-step>First Step</joy-step>
                <joy-step>Second Step</joy-step>
                <joy-step size="small">Third Step</joy-step>
                <joy-step size="small">Fourth Step</joy-step>
            </joy-stepper>
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should render vertical direction stepper', async () => {
        const page = await createPage();

        await page.setContent(`
            <joy-stepper direction="vertical" step="2">
                <joy-step>First Step</joy-step>
                <joy-step>Second Step</joy-step>
                <joy-step>Third Step</joy-step>
                <joy-step>Fourth Step</joy-step>
            </joy-stepper>
        `, { waitUntil: 'networkidle0' });

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });
});
