import {Component, Event, EventEmitter, h, Prop, Build} from '@stencil/core';

@Component({
    tag: 'joy-progress-bar',
    styleUrl: 'progress-bar.scss',
    shadow: true,
})
export class ProgressBar {
    /**
     * Activate specific color mode. Documentation purpose.
     */
    @Prop() mode: 'desktop' | 'mobile' = 'desktop';

    /**
     * Total number of steps.
     */
    @Prop() steps: number | undefined;

    /**
     * Current step number.
     */
    @Prop() currentStep: number | undefined;

    /**
     * Progress bar percentage, percentage usage will override steps & currentStep definition.
     */
    @Prop() percentage: number | undefined;

    /**
     * When the progress bar gets updated
     */
    @Event({eventName: 'joy-progress-bar-update'}) joyProgressBarUpdate!: EventEmitter<void>;

    private computedPercentage = 0;

    private updateComputedPercentage() {
        if (this.percentage) {
            this.computedPercentage = this.percentage;
        } else if (this.currentStep && this.steps) {
            this.computedPercentage = Math.round((this.currentStep / this.steps) * 100);
        } else {
            this.computedPercentage = 0;
        }

        if (this.computedPercentage < 0) {
            this.computedPercentage = 0;
        }

        if (this.computedPercentage > 100) {
            this.computedPercentage = 100;
        }

        if (!Build.isTesting) { // we only use unit test, we don't need this one
            this.joyProgressBarUpdate.emit();
        }
    }

    get computeInnerWidth(): string {
        this.updateComputedPercentage();
        return `${this.computedPercentage}%`;
    }

    render() {
        return (
            <div class="joy-progress-bar-wrapper">
                <div
                    class={{
                        'joy-progress-bar-inner': true,
                        [`joy-progress-bar-inner_${this.mode}`]: true,
                    }}
                    style={{width: this.computeInnerWidth}}
                ></div>
            </div>
        );
    }
}
