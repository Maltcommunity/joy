import {domSandbox} from '@malt/testing-utils';
import {generatedInputNameAndId} from '../dom';

describe('Utils - DOM - generatedInputNameAndId', () => {
    it('should create a string for name or input ID with a first component tag', () => {
        const sandbox = domSandbox.mount(template());

        const first = generatedInputNameAndId(sandbox.querySelector('[data-toggle-test="1"]')!);
        const second = generatedInputNameAndId(sandbox.querySelector('[data-toggle-test="2"]')!);
        const third = generatedInputNameAndId(sandbox.querySelector('[data-toggle-test="3"]')!);
        const fourth = generatedInputNameAndId(sandbox.querySelector('[data-toggle-test="4"]')!);

        expect(first).toBe('joy-toggle-1');
        expect(second).toBe('joy-toggle-2');
        expect(third).toBe('joy-toggle-3');
        expect(fourth).toBe('joy-toggle-4');
    });
});

function template() {
    // Choosen component is not that important, we can use any component type actually
    // But we'll need it for forms inputs
    return `
            <joy-toggle data-toggle-test="1"></joy-toggle>
            <joy-toggle data-toggle-test="2"></joy-toggle>
            <joy-toggle data-toggle-test="3"></joy-toggle>
            <joy-toggle data-toggle-test="4"></joy-toggle>
        `;
}
