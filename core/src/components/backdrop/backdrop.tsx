import {Component, Event, EventEmitter, h, Host, Prop} from '@stencil/core';
import {BackDropOrigin} from '../../types';

@Component({
    tag: 'joy-backdrop',
    styleUrl: 'backdrop.scss',
    shadow: true,
})
export class Backdrop {
    /** The backdrop can be created from many components **/
    @Prop({reflect: true}) origin!: BackDropOrigin;
    @Event({eventName: 'joy-backdrop-click'}) joyBackdropClick!: EventEmitter<BackDropOrigin>;

    private onClick = () => {
        this.joyBackdropClick.emit(this.origin);
    };

    render() {
        return <Host onClick={this.onClick} />;
    }
}
