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
    /** Inject the right wording if your field is not required. the "-" separator is already handled internally. **/
    @Prop() optionalLabel?: string;


    render() {
        return (
            <label class="joy-label" htmlFor={this.htmlFor}>
                <slot />
                {this.required && <span class="joy-label-required">*</span>}
                {this.optionalLabel && <span class="joy-label-optional"> - {this.optionalLabel}</span>}
            </label>
        );
    }
}
