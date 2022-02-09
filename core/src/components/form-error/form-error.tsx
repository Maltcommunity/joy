import {Component, Prop, h, Host} from '@stencil/core';

@Component({
    tag: 'joy-form-error',
    styleUrl: 'form-error.scss',
    shadow: true,
})
export class FormError {
    /**
     * The error text. Plain string required as any HTML injected will be escaped
     */
    @Prop() noHtmlErrorText: string = 'Error !';
    /**
     * Depending on contexts : maybe you'll need to insert it in the DOM but hide it, or injecting it into the DOM on the fly (like Vue v-if cases)
     */
    @Prop() visible = true;

    render() {
        return (
            <Host aria-hidden={this.visible ? 'false' : 'true'} class={`joy-form-error ${this.visible ? 'joy-has-error' : null}`} role="alert">
                <joy-icon custom-class="joy-icon-error" name="warning-triangle" color="red" bicolor></joy-icon>
                <span>{this.noHtmlErrorText}</span>
            </Host>
        );
    }
}
