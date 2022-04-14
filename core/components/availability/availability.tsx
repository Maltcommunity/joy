import {Component, h, Prop, Host} from '@stencil/core';

@Component({
    tag: 'joy-availability',
    styleUrl: 'availability.scss',
    shadow: true,
})
export class Availability {
    /** Text Availability content, if null, only dot will be display */
    @Prop() label: string | null = null;

    /** Status Availability, define color */
    @Prop() status: 'AVAILABLE' | 'AVAILABLE_AND_VERIFIED' | 'NOT_AVAILABLE_WITH_DATE' | 'AVAILABLE_SOON' | 'NOT_AVAILABLE' | '' = '';

    /** isPartial dot, define fill or stroke dot display */
    @Prop() isPartial: boolean = false;

    get dotClass() {
        return {
            'joy-availability__dot': true,
            [this.status]: true,
            'PARTIAL': this.isPartial,
        };
    }

    render() {
        if (this.label) {
            return (
                <Host
                    class={{
                        'joy-availability': true,
                        'joy-availability-has-label': !!this.label,
                    }}
                >
                    <span class={this.dotClass} />
                    {this.label}
                </Host>
            );
        } else {
            return <span class={this.dotClass} />;
        }
    }
}
