import {Component, h, Prop, Host} from '@stencil/core';

@Component({
    tag: 'joy-spinner',
    styleUrl: 'spinner.scss',
    shadow: true,
})
export class JoySpinner {
    /** Spinner colors, 2 possible values */
    @Prop() color?: string;

    private get spinnerColor() {
        return {['joy-spinner_' + this.color]: this.color};
    }

    render() {
        return (
            <Host
                class={{
                    'joy-spinner': true,
                    ...this.spinnerColor,
                }}
            ></Host>
        );
    }
}
