import {Component, h, Prop} from '@stencil/core';
import {HighlightLevels} from '../../types';

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

    private get getColorAccordingToLevel() {
        switch (this.level) {
            case 'neutral':
                return 'grey';
            case 'info':
                return 'teal';
            case 'success':
                return 'turquoise';
            case 'warning':
                return 'yellow';
            case 'error':
                return 'red';
            default:
                return 'teal';
        }
    }

    private get getIconAccordingToLevel() {
        switch (this.level) {
            case 'neutral':
                return 'info-circle';
            case 'info':
                return 'info-circle';
            case 'success':
                return 'check';
            case 'warning':
                return 'info-circle';
            case 'error':
                return 'warning-triangle';
            default:
                return 'info-circle';
        }
    }

    private get getRelevantIcon() {
        return this.icon ? this.icon : this.getIconAccordingToLevel;
    }

    render() {
        return (
            <div class={'joy-highlight joy-highlight_' + this.level}>
                {this.displayIcon && <joy-icon name={this.getRelevantIcon} color={this.getColorAccordingToLevel}></joy-icon>}
                <div>
                    <slot />
                </div>
            </div>
        );
    }
}
