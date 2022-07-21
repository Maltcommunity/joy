/**
 * @param {String} id - the ID attribute of the product tour you want to display. Can be a data-product-tour as well.
 * @param {String} target - the highlighted target DOM element.
 * @return {void | null}
 */
export async function showProductTour(id: string, target: HTMLElement): Promise<void> {
    const hasOpenProductTour = getOpenedProductTour().length > 0;

    hideProductTour();

    const productTour = document.body.querySelector(`#${id}`) || document.body.querySelector(`[data-product-tour="${id}"]`);

    if (!productTour || productTour.tagName !== 'JOY-PRODUCT-TOUR') {
        console.error(`Unable to find any joy-product-tour with ID nor data-id "${id}"`);
        return;
    }

    await (productTour as HTMLJoyProductTourElement).showProductTour(target, hasOpenProductTour);
}

export function hideProductTour(): void {
    getOpenedProductTour()
        .map(async (productTour) => {
        await productTour.closeProductTour();
    });
}

function getOpenedProductTour(): HTMLJoyProductTourElement[] {
    return Array.from(document.querySelectorAll('joy-product-tour'))
        .filter(productTour => productTour.open);
}
