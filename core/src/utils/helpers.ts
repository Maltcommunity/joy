export {generatedInputNameAndId, renderInputOutsideShadowRoot} from './dom';

/**
 *
 * @param {HTMLElement} el - Supposed to be an HTMLElement with shadowDOM on.
 * @param {HTMLElement} fallback - HTMLElement fallback if el has no shadowRoot.
 * @return {HTMLElement | ShadowRoot}
 */
export function getShadowDom(el: HTMLElement, fallback: HTMLElement = el): HTMLElement | ShadowRoot {
    return el.shadowRoot || fallback;
}

/**
 *
 * @param {Event} event - click event object
 * @param {Node} rootNode - node we'll compare the click target with.
 * @return {Boolean}
 */
function clickOutside(event: Event, rootNode: Node): boolean {
    let parent = event.target as Node;

    while (parent !== null && parent !== rootNode) {
        parent = parent.parentNode as Node;
    }

    return !(parent === rootNode);
}


/**
 *
 * @param {HTMLElement} el -
 * @param {function} fn - the executed callback once you've clicked outside your given element.
 * @return {void}
 */
export function onClickOutside(el: Node, fn: () => void): void {
    function onClickOutsideListener(e: Event) {
        if (clickOutside(e, el)) {
            fn();
            document.removeEventListener('click', onClickOutsideListener);
        }
    }

    document.addEventListener('click', onClickOutsideListener);
}


/**
 *
 * @param {HTMLElement} target - the element you want to dispatch the event to
 * @param {String} eventType - whatever native type you want : change, input, blur, focus...
 * @param {any} eventDetail - as we use a custom event, you can give it the data you need
 * @return {void}
 */
export function dispatchEvent<T>(target: HTMLElement, eventType: string, eventDetail?: T): void {
    const event = new CustomEvent(eventType, {detail: eventDetail, bubbles: true, composed: true});
    target.dispatchEvent(event);
}
