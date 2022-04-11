import {domSandbox} from '@malt/testing-utils';
import {renderInputOutsideShadowRoot} from '../dom';

describe('Utils - DOM - generatedInputNameAndId', () => {
    it('should create a basic hidden input', () => {
        const sandbox = domSandbox.mount(template());
        const container = sandbox.querySelector('[data-container]')!;

        renderInputOutsideShadowRoot(container, 'my-input-name', 'my-value', false);
        const hiddenInput = container.querySelector('input.input-hidden') as HTMLInputElement;

        expect(hiddenInput).not.toBeNull();
        expect(hiddenInput['value']).toBe('my-value');
        expect(hiddenInput['name']).toBe('my-input-name');
        expect(hiddenInput['disabled']).toBe(false);
    });

    it('should bind the props to hidden input, especially useful for debugging', () => {
        const sandbox = domSandbox.mount(template());
        const container = sandbox.querySelector('[data-container]')!;

        renderInputOutsideShadowRoot(container, 'my-input-name', 'true', true);
        const hiddenInput = container.querySelector('input.input-hidden') as HTMLInputElement;

        expect(hiddenInput['name']).toBe('my-input-name');
        expect(hiddenInput['disabled']).toBe(true);
    });

    it('should not add a second input hidden as it already exists, only updates specific attributes', () => {
        const sandbox = domSandbox.mount(template());
        const container = sandbox.querySelector('[data-container]')!;

        renderInputOutsideShadowRoot(container, 'my-input-name', 'my-value', true);
        const hiddenInputs = container.querySelectorAll('input.input-hidden');
        const hiddenInput = hiddenInputs[0] as HTMLInputElement;

        renderInputOutsideShadowRoot(container, 'my-input-name', '', false);
        renderInputOutsideShadowRoot(container, 'my-input-name', '', false);
        renderInputOutsideShadowRoot(container, 'my-input-name', '', false);

        expect(hiddenInput['disabled']).toBe(false);
        expect(hiddenInput['value']).toBe('');
        expect(hiddenInputs.length).toBe(1);
    });
});

function template() {
    // Chosen component is not that important, we can use any component type actually
    // But we'll need it for forms inputs
    return `<div data-container></div>`;
}
