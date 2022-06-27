import {Component, Element, h, Host, Prop} from '@stencil/core';

@Component({
    tag: 'joy-option',
    styleUrl: 'option.scss',
    shadow: true,
})
export class Option {
    @Element() el!: HTMLJoyOptionElement;
    /** Disabled state. **/
    @Prop({reflect: true}) disabled: boolean = false;
    /** If the option is selected or not **/
    @Prop() selected = false;
    /** Value bubbled up to the select component **/
    @Prop() value!: string;
    /** For dropdown use, you can transform your option in link **/
    @Prop() href?: string;

    render() {
        const {disabled, selected} = this;
        const classes = {
            'joy-option': true,
            'joy-option_selected': selected,
            'joy-option_disabled': disabled,
        };

        return (
            <Host role="option" selected={selected} class={{...classes}}>
                <slot />
            </Host>
        );
    }
}
