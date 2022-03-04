import {Component, Element, h, Host, Prop} from '@stencil/core';

@Component({
    tag: 'joy-select-option',
    styleUrl: 'select-option.scss',
    shadow: true,
})
export class SelectOption {
    @Element() el!: HTMLJoySelectOptionElement;
    @Prop({reflect: true}) disabled: boolean = false;
    @Prop() selected = false;
    @Prop() value!: string;

    render() {
        const {selected} = this;
        const classes = {
            'joy-select-option': true,
            'joy-select-option_selected': this.selected,
            'joy-select-option_disabled': this.disabled,
        };

        return (
            <Host role="option" selected={selected} class={{...classes}}>
                <slot />
            </Host>
        );
    }
}
