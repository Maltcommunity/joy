import {E2EPage, newE2EPage} from '@stencil/core/testing';
import {createPage} from '../../tests';

const pathToAssets = `${__dirname}/test-assets/`;

describe('Dropzone', () => {
    it('should render properly', async () => {

        const page = await createPage();
        await page.setContent(`
            <joy-dropzone></joy-dropzone>
        `);

        const result = await page.screenshot();
        expect(result).toMatchImageSnapshot();
    });

    it('should valid file', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-dropzone accept="image/jpeg,image/png"></joy-dropzone>
        `);

        const validateFileDropzoneEvent = await page.spyOnEvent('joy-dropzone-dropped-files');
        const input = await page.$$('input[type=file]');

        await input[0].uploadFile(`${pathToAssets}test-dropzone.png`);

        await page.waitForChanges();

        expect(validateFileDropzoneEvent).toHaveReceivedEvent();

        const elm = await page.find('joy-dropzone .joy-dropzone__item');
        expect(elm).toEqualText('test-dropzone.png');
    });

    it('should invalid file format', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-dropzone accept="image/jpeg',image/png"></joy-dropzone>
        `);

        const invalidateFileDropzoneEvent = await page.spyOnEvent('joy-dropzone-invalidate-file');
        const input = await page.$$('input[type=file]');

        await input[0].uploadFile(`${pathToAssets}test-dropzone.txt`);

        await page.waitForChanges();

        expect(invalidateFileDropzoneEvent).toHaveReceivedEvent();

        const elm = await page.find('joy-dropzone joy-form-error >>> span');
        expect(elm).toEqualText('The file format is invalid');
    });

    it('should invalid file size', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-dropzone max-size="0.0001"></joy-dropzone>
        `);

        const invalidateFileDropzoneEvent = await page.spyOnEvent('joy-dropzone-invalidate-file');
        const input = await page.$$('input[type=file]');

        await input[0].uploadFile(`${pathToAssets}test-dropzone.png`);

        await page.waitForChanges();

        expect(invalidateFileDropzoneEvent).toHaveReceivedEvent();

        const elm = await page.find('joy-dropzone joy-form-error >>> span');
        expect(elm).toEqualText('Your file exceeds the 0.0001 MB size limit');
    });
    it('should allow multiple files upload (and delete them after)', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-dropzone multiple></joy-dropzone>
        `);

        const validateFileDropzoneEvent = await page.spyOnEvent('joy-dropzone-dropped-files');
        const removeFileDropzoneEvent = await page.spyOnEvent('joy-dropzone-remove-file');
        const input = await page.$$('input[type=file]');

        await input[0].uploadFile(`${pathToAssets}test-dropzone.png`,`${pathToAssets}test-dropzone.txt`);
        await page.waitForChanges();

        expect(validateFileDropzoneEvent).toHaveReceivedEvent();

        const items = await page.findAll('joy-dropzone .joy-dropzone__item');
        expect(items[0]).toEqualText('test-dropzone.png');
        expect(items[1]).toEqualText('test-dropzone.txt');

        // deletion
        await page.click('joy-dropzone .joy-dropzone__item joy-icon');
        await page.waitForChanges();
        expect(removeFileDropzoneEvent).toHaveReceivedEvent();

        await page.click('joy-dropzone .joy-dropzone__item joy-icon');
        await page.waitForChanges();
        expect(removeFileDropzoneEvent).toHaveReceivedEvent();

        const itemsAfterRemoving = await page.findAll('joy-dropzone .joy-dropzone__item');
        expect(itemsAfterRemoving[0]).toBeUndefined();
        expect(itemsAfterRemoving[1]).toBeUndefined();
    });
    it('should allow only ONE file upload', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`

            <joy-dropzone></joy-dropzone>
        `);

        const validateFileDropzoneEvent = await page.spyOnEvent('joy-dropzone-dropped-files');
        const input = await page.$$('input[type=file]');

        await input[0].uploadFile(`${pathToAssets}test-dropzone.png`);
        await page.waitForChanges();
        expect(validateFileDropzoneEvent).toHaveReceivedEvent();

        await input[0].uploadFile(`${pathToAssets}test-dropzone.txt`);
        await page.waitForChanges();
        expect(validateFileDropzoneEvent).toHaveReceivedEvent();

        const items = await page.findAll('joy-dropzone .joy-dropzone__item');
        expect(items[0]).toEqualText('test-dropzone.txt');
        expect(items[1]).toBeUndefined();
    });
});
