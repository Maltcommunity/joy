import SnackbarUtils from '../../components-triggers/snackbar/snackbar-utils.js';

describe('Snackbar utils unit tests', () => {
    it('should create snackbar with default properties', () => {
        const spyCreate = jest.spyOn(SnackbarUtils, 'createSnackbar');
        SnackbarUtils.pushNotification('Test');
        expect(spyCreate).toHaveBeenCalledWith('Test', {level: 'success', duration: 5000, closable: true});
    });

    it('should create snackbar with given properties', () => {
        const spyCreate = jest.spyOn(SnackbarUtils, 'createSnackbar');

        SnackbarUtils.pushNotification('Test', {level: 'error'});
        expect(spyCreate).toHaveBeenCalledWith('Test', {level: 'error', duration: 5000, closable: true});

        SnackbarUtils.pushNotification('Test', {level: 'info', duration: 1000});
        expect(spyCreate).toHaveBeenCalledWith('Test', {level: 'info', duration: 1000, closable: true});

        SnackbarUtils.pushNotification('Test', {duration: 2000, closable: false});
        expect(spyCreate).toHaveBeenCalledWith('Test', {level: 'success', duration: 2000, closable: false});
    });

    it.skip('should create snackbar with given properties', () => {
        const spyCreate = jest.spyOn(SnackbarUtils, 'createSnackbar');
        // const spyFallback = jest.spyOn(SnackbarUtils, 'fallbackFunction');

        SnackbarUtils.pushNotification('Test', {triggerActionText: 'Trigger action'});
        expect(spyCreate).toHaveBeenCalledWith('Test', {
            level: 'success',
            duration: 5000,
            closable: true,
            triggerActionText: 'Trigger action',
        });
    });
});
