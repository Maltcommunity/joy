import {Component, Element, h, Prop, Host, Method} from '@stencil/core';
import {ButtonSizes, ButtonVariants} from '../../types';

@Component({
    tag: 'joy-button',
    styleUrl: 'button.scss',
    shadow: true,
})
export class JoyButton {
    @Element() el!: HTMLJoyButtonElement;
    /** Disabled attribute for buttons */
    @Prop({mutable: true}) disabled = false;
    /** Type attribute for buttons */
    @Prop() type: 'button' | 'submit' | 'reset' = 'button';
    /** Set the href of your link */
    @Prop() href?: string;
    /** If the link as a downloadable content */
    @Prop() download = false;
    /** Native rel attribute for hyperlinks. See https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/rel */
    @Prop() rel?: string;
    /** Native target attribute for hyperlinks. */
    @Prop() target?: '_blank' | '_self' | '_parent' | '_top';
    /** Button or Link color theme */
    @Prop() variant: ButtonVariants = 'primary';
    /** Button or Link size */
    @Prop() size: ButtonSizes = 'medium';
    /** Set the icon name if you need one */
    @Prop() icon?: string;
    /** Set the button in loading state */
    @Prop() loading = false;

    /**
     * Allows to display the spinner while asynchronous tasks are pending
     * @param {Boolean} loading - loading status
     * @param {Number} timeout - if you want to display the loader during a specific timeout
     */
    @Method()
    async buttonLoading(loading: boolean, timeout = 400) {
        /**
         * To be able to actually see the loader, even for fast internets, we need to set a minimum lifetime
         * But we set a timeout only to hide the spinner, not to show it
         */
        setTimeout(
            () => {
                this.loading = loading;
                this.disabled = loading;
            },
            loading ? 0 : timeout,
        );
    }

    private handleClick = (ev: Event) => {
        if (this.type === 'submit') {
            // this button wants to specifically submit a form
            // climb up the dom to see if we're in a <form>
            // and if so, then use JS to submit it
            const form = this.el.closest('form');
            if (form) {
                ev.preventDefault();

                const fakeButton = document.createElement('button');
                fakeButton.type = this.type;
                fakeButton.style.display = 'none';
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    };

    private get buttonColorClass() {
        return {['joy-button_' + this.variant]: this.variant};
    }

    private get buttonSizeClass() {
        return {['joy-button_' + this.size]: this.size};
    }

    private get spinnerColor() {
        if (this.variant !== 'white' && this.variant !== 'ghost' && this.variant !== 'secondary') {
            return 'white';
        }
        return 'teal';
    }

    render() {
        const {disabled, href, icon, rel, type, loading, spinnerColor} = this;
        const TagType = href === undefined ? 'button' : ('a' as any);
        const attrs =
            TagType === 'button'
                ? {
                      type,
                  }
                : {
                      href,
                      rel,
                  };
        return (
            <Host onClick={this.handleClick} aria-disabled={disabled ? 'true' : null}>
                <TagType
                    {...attrs}
                    disabled={disabled || loading}
                    class={{
                        'joy-button': true,
                        'joy-button_loading': this.loading,
                        ...this.buttonColorClass,
                        ...this.buttonSizeClass,
                    }}
                >
                    {icon && <joy-icon name={icon}></joy-icon>}
                    {loading && <joy-spinner color={spinnerColor}></joy-spinner>}
                    <slot />
                </TagType>
            </Host>
        );
    }
}
