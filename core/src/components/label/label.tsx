import {Component, Prop, h, Element} from '@stencil/core';
import {LabelSizes} from '../../types';

@Component({
    tag: 'joy-label',
    styleUrl: 'label.scss',
    scoped: true,
})
export class Label {
    @Element() host!: HTMLJoyLabelElement;

    /** Label size **/
    @Prop({reflect: true}) size: LabelSizes = 'medium';
    /** for attribute to associate label to an input **/
    @Prop() htmlFor?: string;
    /** Required status of parent form field **/
    @Prop() required = false;

    render() {
        return (
            <label class="joy-label" htmlFor={this.htmlFor}>
                <slot />
                {this.required && <span class="joy-label-required">*</span>}
            </label>
        );
    }
}
