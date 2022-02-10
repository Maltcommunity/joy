import {snackbarService} from './SnackbarService';
jest.useFakeTimers();

function getSnackbar() {
    return document.body.querySelector('joy-snackbar') as HTMLElement;
}

function cancellationCallback(){}
function timeoutCallback() {}

describe('Notification - NotificationService', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        snackbarService.notificationIdx = -1; // Just to be able to run tests once by once
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('should inject a custom-element from a push method', () => {
        snackbarService.push('I am a message');
        expect(getSnackbar()).not.toBe(null);
    });

    it('should inject a custom-element from a push method with default values', () => {
        snackbarService.push('I am a message');

        expect(getSnackbar()!.getAttribute('dangerous-html-message')).toBe('I am a message');
        expect(getSnackbar()!.getAttribute('duration')).toBe('5000');
        expect(getSnackbar()!.getAttribute('id')).toBe('joy-snackbar_0');
        expect(getSnackbar()!.getAttribute('level')).toBe('success');
    });

    it('should inject a custom-element according to specific options', () => {
        snackbarService.push('I am a message', {
            level: 'error',
            duration: 10000,
        });

        expect(getSnackbar().getAttribute('duration')).toBe('10000');
        expect(getSnackbar().getAttribute('id')).toBe('joy-snackbar_0');
        expect(getSnackbar().getAttribute('level')).toBe('error');
    });

    it('should inject a custom-element according to other specific options', () => {
        snackbarService.push('I am a message', {
            level: 'info',
            duration: 2000,
        });

        expect(getSnackbar().getAttribute('duration')).toBe('2000');
        expect(getSnackbar().getAttribute('id')).toBe('joy-snackbar_0');
        expect(getSnackbar().getAttribute('level')).toBe('info');
    });

    it('should listen to custom-element custom event and execute functions to hide itself', () => {
        const triggerFn = jest.spyOn(snackbarService, 'triggerAnyAction');
        const clearFn = jest.spyOn(snackbarService, 'deleteAllSnackbars');

        snackbarService.push('I am a message', {
            level: 'info',
            duration: 2000,
            triggerActionText: 'Cancel action',
            cancellationCallback,
            timeoutCallback,
        });

        const cancellationFn = jest.spyOn(snackbarService, 'cancellationCallback');

        getSnackbar().dispatchEvent(new CustomEvent('joySnackbarTriggerAction', {bubbles: true}));
        expect(triggerFn).toHaveBeenCalled();
        expect(clearFn).toHaveBeenCalled();
        expect(cancellationFn).toHaveBeenCalled();
    });

    it("should execute given timeout function after duration time if we don't trigger any action", () => {
        snackbarService.push('I am a message', {
            level: 'info',
            duration: 2000,
            triggerActionText: 'Cancel action',
            cancellationCallback,
            timeoutCallback,
        });

        const timeoutFn = jest.spyOn(snackbarService, 'timeoutCallback');
        const cancellationFn = jest.spyOn(snackbarService, 'cancellationCallback');

        jest.advanceTimersByTime(2000);

        expect(timeoutFn).toHaveBeenCalled();
        expect(cancellationFn).not.toHaveBeenCalled();
    });
});
