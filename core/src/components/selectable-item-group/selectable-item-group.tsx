import {Component, Element, Event, EventEmitter, h, Listen, Method, Prop} from '@stencil/core';

@Component({
    tag: 'joy-selectable-item-group',
    styleUrl: 'selectable-item-group.scss',
    shadow: true,
})
export class SelectableItemGroup {

    @Element() host!: HTMLJoySelectableItemGroupElement;
    /** If multiple is set to true, it means you'll have to add joy-checkbox items. If not, a hidden radio box is included **/
    @Prop() multiple = false;
    /** If set to true, css flex rule will by applied in order to take all horizontal space available **/
    @Prop() fullWidth = false;
    /** Selected item **/
    @Prop() value?: string;

    @Event({eventName: 'joy-selectable-item-group-change'})
    joySelectableItemGroupChange!: EventEmitter<HTMLJoySelectableItemElement>;

    /**
     * @return {Promise}
     */
    @Method()
    async getSelectedItemsValue() {
       if (!this.multiple) {
           return this.value;
       }

       return this.getItems()
           .filter((item) => item.checked)
           .map((item) => item.value);
    }

    private getItems() {
        return Array.from(this.host.querySelectorAll('joy-selectable-item'));
    }

    @Listen('joy-selectable-item-change')
    unselectOtherItems(e: CustomEvent) {
        if (!this.host.contains(e.detail.element)) {
            return;
        }

        if (!this.multiple) {
            this.getItems()
                .filter((item) => item !== e.detail.element)
                .forEach((item) => {
                    item.checked = false;
                });
        }
        this.joySelectableItemGroupChange.emit(e.detail);
    }

    render() {
        return (
            <div class="joy-selectable-item-group">
                <slot />
            </div>
        );
    }
}