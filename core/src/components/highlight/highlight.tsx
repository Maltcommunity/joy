import {Component, h, Prop} from '@stencil/core';
import {HighlightLevels} from '../../types';
import {iconLevel} from '../../utils';

/** @slot default - Text content of your highlight */

@Component({
    tag: 'joy-highlight',
    styleUrl: 'highlight.scss',
    shadow: true,
})
export class Panel {
    /** Override the icon type used for level. Size can't be overridden. Won't show if displayIcon prop isn't set to true */
    @Prop() icon?: string;
    /** Allows to display the level status icon */
    @Prop() displayIcon = false;
    /** Defines the criticalness of the highlight */
    @Prop() level: HighlightLevels = 'info';

    private get getRelevantIcon() {
        return this.icon ? this.icon : iconLevel(this.level);
    }

    render() {
        return (
            <div class={'joy-highlight joy-highlight_' + this.level}>
                {this.displayIcon && <joy-icon name={this.getRelevantIcon}></joy-icon>}
                <div>
                    <slot />
                </div>
            </div>
        );
    }
}
