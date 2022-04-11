import {Component, Element, h, Host, Prop} from '@stencil/core';

@Component({
    tag: 'joy-select-option',
    styleUrl: 'select-option.scss',
    shadow: true,
})
export class SelectOption {
    @Element() el!: HTMLJoySelectOptionElement;
    /** Disabled state. **/
    @Prop({reflect: true}) disabled: boolean = false;
    /** If the option is selected or not **/
    @Prop() selected = false;
    /** Value bubbled up to the select component **/
    @Prop() value!: string;

    render() {
        const {disabled, selected} = this;
        const classes = {
            'joy-select-option': true,
            'joy-select-option_selected': selected,
            'joy-select-option_disabled': disabled,
        };

        return (
            <Host role="option" selected={selected} class={{...classes}}>
                <slot />
            </Host>
        );
    }
}
