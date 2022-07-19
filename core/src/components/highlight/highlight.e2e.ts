import {newE2EPage} from '@stencil/core/testing';
import {createPage} from '../../tests';

describe('highlight e2e', () => {
    it('should render basic highlight', async () => {
        const page = await newE2EPage();
        await page.setContent('<joy-highlight></joy-highlight>');
        const cmp = await page.find('joy-highlight');

        expect(cmp).not.toBeNull();
    });

    it('should render all levels highlights, without accent', async () => {
        const page = await createPage();
        await page.setContent(`
            <joy-highlight level="warning" display-icon>I am a simple warning content</joy-highlight>
            <joy-highlight level="error" display-icon>I am a simple error content.</joy-highlight>
            <joy-highlight level="success" display-icon>I am a simple success content.</joy-highlight>
            <joy-highlight level="info" display-icon>I am a simple info content.</joy-highlight>
            <joy-highlight level="neutral" display-icon>I am a simple neutral content.</joy-highlight>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should render all levels highlights, with accent', async () => {
        const page = await createPage();
        await page.setContent(`
            <joy-highlight level="warning" accent display-icon>I am a simple warning content</joy-highlight>
            <joy-highlight level="error" accent display-icon>I am a simple error content.</joy-highlight>
            <joy-highlight level="success" accent display-icon>I am a simple success content.</joy-highlight>
            <joy-highlight level="info" accent display-icon>I am a simple info content.</joy-highlight>
            <joy-highlight level="neutral" accent display-icon>I am a simple neutral content.</joy-highlight>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should render any level highlight, without icon', async () => {
        const page = await createPage();
        await page.setContent('<joy-highlight level="warning">I am a simple warning content without icon</joy-highlight>');

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should render any level highlight, with given icon', async () => {
        const page = await createPage();
        await page.setContent(
            '<joy-highlight icon="company-placeholder" display-icon level="warning">I am a simple warning with given icon</joy-highlight>',
        );

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });
});
