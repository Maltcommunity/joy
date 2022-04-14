import {Component, Element, h, Host, Prop} from '@stencil/core';
import {hideAllDialogs, showDialog} from '../dialog/dialog-service';

@Component({
    tag: 'joy-dialog-trigger',
    shadow: true,
})
export class DialogTrigger {
    @Element() host!: HTMLJoyDialogTriggerElement;

    /** The ID of the dialog you want to show. Required **/
    @Prop({reflect: true}) dialog!: string;
    /** For dialogs containing joy-indicators with multiple steps, you can specify a step number **/
    @Prop({reflect: true}) step?: number;

    private onClick = async () => {
        hideAllDialogs(false);
        await showDialog(this.dialog);
    };

    render() {
        return (
            <Host onClick={this.onClick}>
                <slot />
            </Host>
        );
    }
}
