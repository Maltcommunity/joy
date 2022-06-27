import {Component, Prop, h} from '@stencil/core';

@Component({
    tag: 'joy-divider-cta',
    styleUrl: 'divider-cta.scss',
    shadow: true,
})
export class DividerCta {
    /**
     * Disabled or not
     */
    @Prop({reflect: true}) disabled = false;

    render() {
        return (
            <button
                type="button"
                class={{
                    'joy-divider-cta': true,
                    'joy-divider-cta__disabled': this.disabled,
                }}
                part="divider"
            >
                <div class="joy-divider-cta--icon">
                    <joy-icon name="add"></joy-icon>
                </div>
                <div class="joy-divider-cta--content">
                    <p class="joy-divider-cta--content---title">
                        <slot />
                    </p>
                    <slot name="divider-content"></slot>
                </div>
            </button>
        );
    }
}
