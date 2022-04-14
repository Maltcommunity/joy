import {Component, h} from '@stencil/core';

/** @slot panel-title - Title of the panel. Mandatory
 *   @slot panel-title-action - CTA in top right corner. Not mandatory
 *   @slot panel-subtitle - Subtitle of the panel. Not mandatory
 *   @slot panel-body - All the content you need in your panel. Insert what you want here
 *   @slot panel-right-action - If you need a right-aligned CTA, use this
 *   @slot panel-left-action - If you need a left-aligned CTA, use this
 *   */

@Component({
    tag: 'joy-panel',
    styleUrl: 'panel.scss',
    shadow: true,
})
export class Panel {
    render() {
        return (
            <section class="joy-panel">
                <header class="joy-panel__header">
                    <h2 class="joy-panel__title">
                        <slot name="panel-title" />
                    </h2>
                    <slot name="panel-title-action" />
                    <p class="joy-panel__subtitle">
                        <slot name="panel-subtitle" />
                    </p>
                </header>
                <div class="joy-panel__body">
                    <slot name="panel-body" />
                </div>
                <footer class="joy-panel__footer">
                    <div class="c-btn_block">
                        <slot name="panel-left-action" />
                        <slot name="panel-right-action" />
                    </div>
                </footer>
            </section>
        );
    }
}
