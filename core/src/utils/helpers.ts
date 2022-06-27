import {BackDropOrigin, Level} from '../types';
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

/**
 * @param {Boolean} prevent - If you want to prevent scrolling or enable it again. Used by dialog component
 * @return {void}
 */
export function preventBodyScroll(prevent: boolean): void {
    if (prevent) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.removeProperty('overflow');
    }
}

/**
 * @param {String} origin - which component has triggered the backdrop
 * @param {HTMLElement} target - where the component is injected. Default to body root.
 * @return {Promise<void>}
 */
export function createBackDrop(origin: BackDropOrigin, target?: HTMLElement): Promise<void | CustomElementConstructor> {
    let dest;
    !target ? (dest = document.body) : (dest = target);

    if (!document.querySelector('joy-backdrop')) {
        const backdrop = document.createElement('joy-backdrop');
        backdrop.origin = origin;
        dest.appendChild(backdrop);
    }

    return window.customElements.whenDefined('joy-backdrop');
}

/**
 * @return {void}
 */
export function destroyBackdrop(): void {
    const backdrop = document.querySelector('joy-backdrop');
    if (backdrop) {
        backdrop.remove();
        preventBodyScroll(false);
    }
}

export enum Levels {
    DEFAULT = 'default',
    INFORMATION = 'information',
    WARNING = 'warning',
    SUCCESS = 'success',
    ERROR = 'error',
}

export function iconLevel(level: Level): string {
    let icon;

    switch (level) {
        case Levels.ERROR:
            icon = 'warning-triangle';
            break;
        case Levels.SUCCESS:
            icon = 'check';
            break;
        default:
            icon = 'info-circle';
    }

    return icon;
}

/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. This helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 *
 * @param {HTMLElement} el - root element of the component
 * @param {Array} attributes - attribute you want to inherit
 * @return {Object} - attributes list
 */
export const inheritAttributes = (el: HTMLElement, attributes: string[] = []): {[k: string]: any} => {
    const attributeObject: {[k: string]: any} = {};

    attributes.forEach((attr) => {
        if (el.hasAttribute(attr)) {
            const value = el.getAttribute(attr);
            if (value !== null) {
                attributeObject[attr] = el.getAttribute(attr);
            }
            el.removeAttribute(attr);
        }
    });

    return attributeObject;
};
