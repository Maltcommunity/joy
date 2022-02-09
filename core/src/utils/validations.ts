/**
 * @return {Boolean}
 * @param {String[] | string} value
 */
export function checkEmailsValidity(value: string [] | string): boolean {
    if (!Array.isArray(value) && typeof value !== 'string') {
        console.warn('Values needs to be an array of emails, or email.');
        return false;
    }

    function singleEmailValidation(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (!Array.isArray(value)) {
        return singleEmailValidation(value);
    } else {
        const invalidEmail = value.find((email) => {
           if (!singleEmailValidation(email)) {
               return email;
           }
        });

        // It means that we've found no invalid email
        // We could have used the Array.prototype.some(), but it's harder to debug
        return invalidEmail === undefined;
    }
}
