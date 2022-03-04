import {Component, Prop, h, Element, Host, Method} from '@stencil/core';

@Component({
    tag: 'joy-tab',
    styleUrl: 'tab.scss',
})
export class JoyTab {
    @Element() host!: HTMLJoyTabElement;

    /**
     * Selected status of the current tab
     */
    @Prop({mutable: true}) selected = false;
    /**
     * A tab id or name must be provided for each `joy-tab`. It's used internally to reference
     * the selected tab
     */
    @Prop() tab!: string;

    async componentWillLoad() {
        if (this.selected) {
            await this.setActive();
        }
    }

    /** Set the active component for the tab */
    @Method()
    async setActive(): Promise<void> {
        this.selected = true;
    }

    render() {
        const {tab, selected} = this;

        return (
            <Host
                role="tabpanel"
                aria-hidden={!selected ? 'true' : null}
                aria-labelledby={`joy-tab-${tab}`}
                id={`joy-tab-${tab}`}
                tabindex="0"
                class={{
                    'joy-tab': true,
                    'joy-tab__selected': selected,
                }}
            >
                <slot />
            </Host>
        );
    }
}
