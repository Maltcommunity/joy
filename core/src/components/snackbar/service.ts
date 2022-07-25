const LEVELS = ['success', 'info', 'warning', 'error'];

interface PushParams {
    level: string;
    duration: number;
    closable?: boolean;
    triggerActionText?: string;
    cancellationCallback?: () => void;
    timeoutCallback?: () => void;
}

const DEFAULT_SNACKBAR_OPTIONS: PushParams = {
    level: LEVELS[0],
    duration: 5000,
    closable: true,
};

function fallbackFunction() {
    console.info('A triggerActionText option has been given. Please specify a callbackFunction and a timeoutCallback then.');
    return {};
}

class Service {
    notificationServiceId;
    notificationIdx: number;
    private id!: string;
    cancellationCallback!: () => void;
    timeoutCallback!: () => void;
    private timeout!: ReturnType<typeof setTimeout>;

    constructor() {
        this.notificationServiceId = Date.now();
        this.notificationIdx = -1;
        this.triggerAnyAction = this.triggerAnyAction.bind(this);
    }

    get _snackbarId() {
        return `joy-snackbar_${this.notificationIdx}`;
    }

    _generateNewNotificationId() {
        this.notificationIdx = this.notificationIdx + 1;
        return this._snackbarId;
    }

    get snackbar() {
        return document.getElementById(this._snackbarId);
    }

    _notificationContentBuilder(dangerousHtmlMessage: string, id: string, {level, duration, closable, triggerActionText}: PushParams) {
        const snackbar = document.createElement('joy-snackbar');

        snackbar.setAttribute('level', level);
        snackbar.setAttribute('dangerous-html-message', dangerousHtmlMessage);
        snackbar.setAttribute('closable', `${closable}`);
        snackbar.setAttribute('duration', `${duration}`);
        snackbar.setAttribute('id', id);

        triggerActionText && snackbar.setAttribute('trigger-action-text', triggerActionText);

        return snackbar;
    }

    push(dangerousHtmlMessage: string, options: PushParams = DEFAULT_SNACKBAR_OPTIONS) {
        this.deleteAllSnackbars();
        this.id = this._generateNewNotificationId();
        const notificationContent = this._notificationContentBuilder(dangerousHtmlMessage, this.id, {
            level: options.level,
            duration: options.duration,
            closable: options.closable,
            triggerActionText: options.triggerActionText,
        });

        this._display(notificationContent);

        /**
         * If you need to "cancel" an action anywhere in the product, you can pass a cancellationText option which contains a simple text to add in the Snackbar.
         * Use cancellationCallback option to give a function that will be triggered clicking on the the cancellationText DOM element.
         * Use timeoutCallback option to give a function that will be triggered after the duration time (default 5 seconds) if you click nowhere.
         */
        if (options.triggerActionText) {
            this.cancellationCallback = options.cancellationCallback || fallbackFunction;
            this.timeoutCallback = options.timeoutCallback || fallbackFunction;
            this.timeout = this._setUpLifeDuration(options.duration);
        }
        this._bindListeners();
    }

    _display(content: HTMLElement) {
        document.body.appendChild(content);
    }

    triggerAnyAction(event: Event) {
        clearTimeout(this.timeout);

        if (event.type === 'blur') {
            this.timeoutCallback();
        } else {
            this.cancellationCallback();
        }
        this.deleteAllSnackbars();
    }

    _setUpLifeDuration(duration: number) {
        return setTimeout(() => {
            this.timeoutCallback();
        }, duration);
    }

    deleteAllSnackbars() {
        document.querySelectorAll('joy-snackbar').forEach((snackbar) => {
            snackbar.remove();
        });
    }

    _bindListeners() {
        this.snackbar?.addEventListener('joy-snackbar-trigger-action', this.triggerAnyAction, {once: true});
    }
}

const snackbarService = new Service();

export {LEVELS, DEFAULT_SNACKBAR_OPTIONS, snackbarService};
