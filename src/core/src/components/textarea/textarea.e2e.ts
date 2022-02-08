import {E2EPage, newE2EPage} from '@stencil/core/testing';

describe('Textarea - e2e', () => {
    it('should render the textarea', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-textarea></joy-textarea>
        `);

        const textarea = await page.find('joy-textarea');
        expect(textarea).toHaveClass('hydrated');
        const actualTextarea = await page.find('joy-textarea >>> textarea');
        // at least we can write someting !
        expect(actualTextarea).not.toBeNull();
    });

    it('should display an hidden input for light DOM', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-textarea name="my-awesome-name"></joy-textarea>
        `);

        const input = await page.find('joy-textarea input[name="my-awesome-name"]');
        // at least we can write someting !
        expect(input).not.toBeNull();
    });

    it('should display a more advanced textarea, with maxlength counter', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-textarea maxlength="50"></joy-textarea>
        `);

        // Default count. No default value
        const counter = await page.find('joy-textarea >>> .joy-textarea-count');
        expect(counter).not.toBeNull();
        expect(counter.textContent).toBe('0/50');

        // Start typing. Count has to update
        const textarea = await page.find('joy-textarea >>> textarea');
        await textarea.focus();
        await page.keyboard.type('I am a description');
        await page.waitForChanges();
        expect(counter.textContent).toBe('18/50');

        // Still typing. This time our value is longer than the maxlength, the textarea is invalid
        await page.keyboard.type('in order to overload the max count');
        await page.waitForChanges();
        expect(counter.textContent).toBe('52/50');
        expect(counter).toHaveClass('joy-textarea-count-invalid');

        await counter.click(); // only to trigger a "blur", as blur is not included in E2EElement API
        const textareaWrapper = await page.find('joy-textarea >>> .joy-textarea');
        expect(textareaWrapper).toHaveClass('joy-textarea_invalid');

        // We delete some chars, until the textarea is valid again
        await textarea.focus();
        await textarea.press('Backspace');
        await textarea.press('Backspace');
        expect(counter.textContent).toBe('50/50');
        expect(counter).not.toHaveClass('joy-textarea-count-invalid');
    });

    it('should display a more advanced textarea, with minlength warning', async () => {
        const page: E2EPage = await newE2EPage();
        await page.setContent(`
            <joy-textarea minlength="20"></joy-textarea>
        `);

        // Default count. No default value
        const counter = await page.find('joy-textarea >>> .joy-textarea-min');
        expect(counter).not.toBeNull();
        expect(counter).toHaveClass('joy-textarea-min-invalid');

        // Start typing. Count has to update
        const textarea = await page.find('joy-textarea >>> textarea');
        await textarea.focus();
        await page.keyboard.type('I am a description !!');
        await page.waitForChanges();
        expect(counter).not.toHaveClass('joy-textarea-min-invalid');

        // We delete some chars, until the textarea is invalid again
        await textarea.focus();
        await textarea.press('Backspace');
        await textarea.press('Backspace');
        expect(counter).not.toHaveClass('joy-textarea-count-invalid');
    });
});
