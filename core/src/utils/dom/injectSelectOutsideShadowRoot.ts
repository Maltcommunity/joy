import {generatedInputNameAndId} from './generatedInputNameAndId';

export function renderSelectOutsideShadowRoot(
    container: HTMLElement,
    inputName: string,
    value: string | null | undefined,
    disabled: boolean,
    required = false,
    options: Array<HTMLJoySelectOptionElement>,
): HTMLSelectElement {
    /**
     * Creates an hidden input outside our component shadowDOM, in the lightDOM
     * It can be handled normally by forms
     */
    let select: HTMLSelectElement | null = container.querySelector('select.select-hidden');

    if (!select) {
        select = container.ownerDocument.createElement('select');
        select.classList.add('select-hidden');
        select.setAttribute('slot', 'native-select');
        container.appendChild(select);

        for (let i = 0; i < options.length; i++) {
            const option = container.ownerDocument.createElement('option');
            option.value = options[i].value || '';
            option.disabled = options[i].disabled;
            option.textContent = options[i].textContent;
            option.selected = value ? options[i].value === value : options[i].selected;
            select.appendChild(option);
        }
    }

    select.id = inputName || generatedInputNameAndId(container);
    select.name = inputName || generatedInputNameAndId(container);
    select.disabled = disabled;
    select.required = required;
    select.tabIndex = 0;

    return select;
}
