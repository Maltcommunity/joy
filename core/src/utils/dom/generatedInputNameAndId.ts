export function generatedInputNameAndId(element: HTMLElement): string {
    if (!element) {
        throw Error('Invalid custom element, or the element does not exists');
    }

    const tagsList = Array.from(document.querySelectorAll(element.tagName));
    /**
     * returns joy-custom-element-$number
     */
    const index = tagsList.findIndex((el) => el === element);

    return `${element.tagName}-${index + 1}`.toLowerCase();
}

export function generatedIndex(element: HTMLElement, container?: HTMLElement): number {
    if (!element) {
        throw Error('Invalid custom element, or the element does not exists');
    }

    const context = container || document;

    const tagsList = Array.from(context.querySelectorAll(element.tagName));
    /**
     * returns joy-custom-element-$number
     */
    let index = tagsList.findIndex((el) => el === element) + 1;

    return index++;
}
