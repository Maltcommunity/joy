import {generatedInputNameAndId} from './generatedInputNameAndId';

export function renderInputOutsideShadowRoot(
    container: HTMLElement,
    inputName: string,
    value: string | null | undefined,
    disabled: boolean,
    required = false,
): HTMLInputElement {
    /**
     * Creates an hidden input outside our component shadowDOM, in the lightDOM, only if we didn't already injected one
     * It can be handled normally by forms
     */
    let input: HTMLInputElement | null = container.querySelector('input');

    if (!input) {
        input = container.ownerDocument.createElement('input');

        input.type = 'hidden';
        input.classList.add('input-hidden');
        container.appendChild(input);
    }

    input.id = inputName || generatedInputNameAndId(container);
    input.name = inputName || generatedInputNameAndId(container);
    input.value = value || '';
    input.disabled = disabled;
    input.required = required;

    return input;
}
