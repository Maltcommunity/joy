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
