import {E2EPage, newE2EPage} from '@stencil/core/testing';

describe('highlight e2e', () => {
    it('should render basic highlight', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-highlight></joy-highlight>');
        const cmp = await page.find('joy-highlight');

        expect(cmp).not.toBeNull();
    });

    describe('highlight success e2e', () => {
        it('should render success level highlight, without icon', async () => {
            const page: E2EPage = await newE2EPage();
            await page.setContent('<joy-highlight level="success"></joy-highlight>');
            const cmp = await page.find('joy-highlight >>> .joy-highlight_success');

            expect(cmp).not.toBeNull();
        });

        it('should render success level highlight, with default icon', async () => {
            const page: E2EPage = await newE2EPage();
            await page.setContent('<joy-highlight level="success" display-icon></joy-highlight>');
            const cmp = await page.find('joy-highlight >>> .joy-highlight_success');
            const icon = await cmp.find('joy-icon');

            expect(icon).not.toBeNull();
            const iconName = await icon.getProperty('name');
            expect(iconName).toBe('check');
        });
    });

    describe('highlight info e2e', () => {
        it('should render info level highlight, without icon', async () => {
            const page: E2EPage = await newE2EPage();
            await page.setContent('<joy-highlight level="info"></joy-highlight>');
            const cmp = await page.find('joy-highlight >>> .joy-highlight_info');

            expect(cmp).not.toBeNull();
        });

        it('should render info level highlight, with default icon', async () => {
            const page: E2EPage = await newE2EPage();
            await page.setContent('<joy-highlight level="info" display-icon></joy-highlight>');
            const cmp = await page.find('joy-highlight >>> .joy-highlight_info');
            const icon = await cmp.find('joy-icon');

            expect(icon).not.toBeNull();
            const iconName = await icon.getProperty('name');
            expect(iconName).toBe('info-circle');
        });
    });

    describe('highlight warning e2e', () => {
        it('should render warning level highlight, without icon', async () => {
            const page: E2EPage = await newE2EPage();
            await page.setContent('<joy-highlight level="warning"></joy-highlight>');
            const cmp = await page.find('joy-highlight >>> .joy-highlight_warning');

            expect(cmp).not.toBeNull();
        });

        it('should render warning level highlight, with default icon', async () => {
            const page: E2EPage = await newE2EPage();
            await page.setContent('<joy-highlight level="warning" display-icon></joy-highlight>');
            const cmp = await page.find('joy-highlight >>> .joy-highlight_warning');
            const icon = await cmp.find('joy-icon');

            expect(icon).not.toBeNull();
            const iconName = await icon.getProperty('name');
            expect(iconName).toBe('info-circle');
        });
    });

    describe('highlight error e2e', () => {
        it('should render error level highlight, without icon', async () => {
            const page: E2EPage = await newE2EPage();
            await page.setContent('<joy-highlight level="error"></joy-highlight>');
            const cmp = await page.find('joy-highlight >>> .joy-highlight_error');

            expect(cmp).not.toBeNull();
        });

        it('should render error level highlight, with default icon', async () => {
            const page: E2EPage = await newE2EPage();
            await page.setContent('<joy-highlight level="error" display-icon></joy-highlight>');
            const cmp = await page.find('joy-highlight >>> .joy-highlight_error');
            const icon = await cmp.find('joy-icon');

            expect(icon).not.toBeNull();
            const iconName = await icon.getProperty('name');
            expect(iconName).toBe('warning-triangle');
        });
    });

    it('should render any level highlight, with custom icon', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent('<joy-highlight icon="mood-good" display-icon></joy-highlight>');
        const cmp = await page.find('joy-highlight >>> .joy-highlight_info');
        const icon = await cmp.find('joy-icon');

        expect(icon).not.toBeNull();
        const iconName = await icon.getProperty('name');
        expect(iconName).toBe('mood-good');
    });
});
