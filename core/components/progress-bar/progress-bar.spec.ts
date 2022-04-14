import {ProgressBar} from './progress-bar';

describe('Unit tests - Progress bar', () => {
    it('should return the right width for computeInnerWidth method corresponding to given steps & currentStep', async () => {
        const toggle = new ProgressBar();
        toggle.steps = 6;
        toggle.currentStep = 5;
        expect(toggle.computeInnerWidth).toBe('83%');
    });

    it('should prevent returning values over 100% width if we set a currentStep > steps', async () => {
        const toggle = new ProgressBar();
        toggle.steps = 5;
        toggle.currentStep = 6;
        expect(toggle.computeInnerWidth).toBe('100%');
    });

    it('should prevent returning values below 0 width if we set a currentStep < 0', async () => {
        const toggle = new ProgressBar();
        toggle.steps = 5;
        toggle.currentStep = -1;
        expect(toggle.computeInnerWidth).toBe('0%');
    });

    it('should return the right width for computeInnerWidth method corresponding to given percentage', async () => {
        const toggle = new ProgressBar();
        toggle.percentage = 55;
        expect(toggle.computeInnerWidth).toBe('55%');
    });

    it('should return the right width for computeInnerWidth method, percentage must override currentStep & step props', async () => {
        const toggle = new ProgressBar();
        toggle.percentage = 42;
        toggle.currentStep = 5;
        toggle.steps = 6;
        expect(toggle.computeInnerWidth).toBe('42%');
    });
});
