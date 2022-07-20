/**
 * @param {String} id - the ID attribute of the product tour you want to display. Can be a data-product-tour as well.
 * @param {String} target - the highlighted target DOM element.
 * @return {void | null}
 */
export async function showProductTour(id: string, target: HTMLElement): Promise<void> {
    hideProductTour(true);

    const productTour = document.body.querySelector(`#${id}`) || document.body.querySelector(`[data-product-tour="${id}"]`);

    if (!productTour || productTour.tagName !== 'JOY-PRODUCT-TOUR') {
        console.error(`Unable to find any joy-product-tour with ID nor data-id "${id}"`);
        return;
    }

    await (productTour as HTMLJoyProductTourElement).showProductTour(target);
}

export function hideProductTour(removeBackdrop = true): void {
    Array.from(document.querySelectorAll('joy-product-tour')).map((productTour) => {
        productTour.style.display = '';
    });

    if (removeBackdrop) {
        document.body.querySelector('.joy-product-tour--overlay')!.remove();
        document.body.querySelector('joy-product-tour-spotlight')!.remove();
    }
}
