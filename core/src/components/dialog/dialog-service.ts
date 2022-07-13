import {createBackDrop, destroyBackdrop} from '../../utils';

/**
 * @param {String} dialogId - the ID attribute of the dialog you want to display. Can be a data-dialog as well.
 * @param {Function} callback - if you want to trigger a specific action after the dialog is opened
 * @return {Promise | null}
 */
export function showDialog<T>(dialogId: string, callback?: () => T): void | null {
    const dialog: HTMLJoyDialogElement | null = document.body.querySelector(`#${dialogId}`) || document.body.querySelector(`[data-dialog="${dialogId}"]`);

    if (!dialog || dialog.tagName !== 'JOY-DIALOG') {
        console.error(`Unable to find any joy-dialog with ID nor data-id "${dialogId}"`);
        return null;
    }

    const backdropTarget = appendBackDropTarget(dialog);
    createBackDrop('dialog', backdropTarget).then(() => (dialog as HTMLJoyDialogElement)!.openDialog(callback));
}

/**
 * you can hide dialogs without destroying the backdrop. Used to chain dialogs
 * @param {Boolean} removeBackdrop
 * @return {void}
 */
export function hideAllDialogs(removeBackdrop = true): void {
    Array.from(document.querySelectorAll('joy-dialog')).map((dialog) => (dialog.open = false));

    if (removeBackdrop) {
        destroyBackdrop();
    }
}

/**
 * @param {HTMLElement} element - Dialog root element
 * @return {HTMLElement}
 */
export function appendBackDropTarget(element: HTMLJoyDialogElement): HTMLElement {
    return element.appendBackdrop === 'body' ? document.body : element.parentElement!;
}
