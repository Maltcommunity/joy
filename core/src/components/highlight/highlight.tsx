import {Component, Element, h, Prop} from '@stencil/core';
import {HighlightLevels} from '../../types';
import {iconLevel} from '../../utils';

/** @slot default - Text content of your highlight */

@Component({
    tag: 'joy-highlight',
    styleUrl: 'highlight.scss',
    shadow: true,
})
export class Panel {
    private hasTitleSlot = false;

    @Element() host!: HTMLJoyHighlightElement;

    /** Override the icon type used for level. Size can't be overridden. Won't show if displayIcon prop isn't set to true */
    @Prop() icon?: string;
    /** Allows to display the level status icon */
    @Prop() displayIcon = false;
    /** Defines the criticalness of the highlight */
    @Prop() level: HighlightLevels = 'neutral';
    /** Add the left border accent on the highlight. */
    @Prop() accent = false;

    private get getRelevantIcon() {
        return this.icon ? this.icon : iconLevel(this.level);
    }

    connectedCallback() {
        /** Not reactive at the moment. No need so far **/
        this.hasTitleSlot = !!this.host.querySelector('[slot="highlight-title"]');
    }

    render() {
        return (
            <div
                class={{
                    'joy-highlight': true,
                    'joy-highlight__accent': this.accent,
                    'joy-highlight__titled': this.hasTitleSlot,
                    [`joy-highlight_${this.level}`]: true,
                }}
            >
                {this.displayIcon && <joy-icon name={this.getRelevantIcon}></joy-icon>}
                <div class="joy-highlight--text">
                    <strong>
                        <slot name="highlight-title" />
                    </strong>
                    <slot />
                </div>
            </div>
        );
    }
}
