class SnackbarUtils {
    _cancellationCallback;
    _timeoutCallback;
    _timeout;

    constructor() {
        this.DEFAULT_SNACKBAR_OPTIONS = {
            level: 'success',
            duration: 5000,
            closable: true,
        };
        this.triggerAnyAction = this.triggerAnyAction.bind(this);
    }

    fallbackFunction() {
        console.info('A triggerActionText option has been given. Please specify a cancellationCallback and a timeoutCallback then.');
        return {};
    }

    getSnackbar() {
        return document.querySelector('joy-snackbar');
    }

    bindListeners() {
        this.getSnackbar().addEventListener('joy-snackbar-trigger-action', this.triggerAnyAction, {once: true});
    }

    triggerAnyAction(event) {
        clearTimeout(this._timeout);

        if (event.type === 'blur') {
            this._timeoutCallback();
        } else {
            this._cancellationCallback();
        }
        this.deleteAllSnackbars();
    }

    setUpLifeDuration(duration) {
        return setTimeout(() => {
            this._timeoutCallback();
        }, duration);
    }

    formatDefaultOptions(opts) {
        return {
            level: opts.level || this.DEFAULT_SNACKBAR_OPTIONS.level,
            duration: opts.duration || this.DEFAULT_SNACKBAR_OPTIONS.duration,
            closable: opts.closable !== undefined ? opts.closable : this.DEFAULT_SNACKBAR_OPTIONS.closable,
        };
    }

    createSnackbar(message, options) {
        const snackbar = document.createElement('joy-snackbar');

        snackbar.setAttribute('level', options.level);
        snackbar.setAttribute('dangerous-html-message', message);
        snackbar.setAttribute('closable', options.closable);
        snackbar.setAttribute('duration', options.duration);

        options.triggerActionText && snackbar.setAttribute('trigger-action-text', options.triggerActionText);

        document.body.appendChild(snackbar);
    }

    deleteAllSnackbars() {
        Array.from(document.querySelectorAll('joy-snackbar')).forEach((snackbar) => snackbar.remove());
    }

    pushNotification(message, options = {}) {
        const defaultOptions = this.formatDefaultOptions(options);
        Object.assign(options, defaultOptions);

        this.deleteAllSnackbars();
        this.createSnackbar(message, options);

        /**
         * If you need to "cancel" an action anywhere, you can pass a cancellationText option which contains a simple text to add in the Snackbar.
         * Use cancellationCallback option to give a function that will be triggered clicking on the cancellationText DOM element.
         * Use timeoutCallback option to give a function that will be triggered after the duration time (default 5 seconds) if you click nowhere.
         */
        if (options.triggerActionText) {
            this._cancellationCallback = options.cancellationCallback || this.fallbackFunction;
            this._timeoutCallback = options.timeoutCallback || this.fallbackFunction;
            this._timeout = this.setUpLifeDuration(options.duration);
        }

        this.bindListeners();
    }
}

export default new SnackbarUtils();
