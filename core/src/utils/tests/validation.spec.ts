import {checkEmailsValidity} from '../validations';

describe('emailsValidation utils', () => {
    it('should not be able to validate email in other type than string or array', () => {
        const value = '{}';
        expect(checkEmailsValidity(value)).toBe(false);
    });

    it('should be able to validate a single email', () => {
        const value = 'email@email.fr';
        expect(checkEmailsValidity(value)).toBe(true);
    });

    it('should be able to validate array of emails', () => {
        const value = ['valid@email.fr', 'invalid-email@dfsdfsd@.fr'];
        expect(checkEmailsValidity(value)).toBe(false);
    });
});

