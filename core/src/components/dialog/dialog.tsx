import {Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State} from '@stencil/core';
import {ButtonSizes, DialogSizes} from '../../types';
import {destroyBackdrop, preventBodyScroll} from '../../utils';
import {hideAllDialogs} from './dialog-service';

@Component({
    tag: 'joy-dialog',
    styleUrl: 'style/dialog.scss',
    shadow: true,
})
export class Dialog {
    private dialogChain = false;

    @State() hasFooterSlot = false;
    @State() hiding = false;

    @Element() host!: HTMLJoyDialogElement;

    /** @internal **/
    @Prop() demo = false;
    /** Dialog open state **/
    @Prop({reflect: true, mutable: true}) open = false;
    /** Dialog sizes **/
    @Prop() size: DialogSizes = 'default';
    /** Main CTA text. If none given, it won't show the CTA **/
    @Prop() confirmText?: string;
    /** Secondary CTA text. If none given, it won't show the CTA **/
    @Prop() cancelText?: string;
    /** If you want to change the CTA sizes, please choose between small, medium, large **/
    @Prop() buttonSize: ButtonSizes = 'small';
    /** Set the URL of the image you can inject as pre-header banner **/
    @Prop() bannerSrc?: string;
    /** Set the alt text of the banner **/
    @Prop() bannerSrcAlt?: string;
    /** Set the height of the banner. Default to 250 **/
    @Prop() bannerHeight? = 250;
    /** Set the position of the banner image. Work exactly like css background-position property **/
    @Prop() bannerPosition = 'center';

    /** Custom event fired when clicking on confirm button */
    @Event() joyConfirmDialog!: EventEmitter<void>;
    /** Custom event fired when clicking on cancel button or cross icon */
    @Event() joyCancelDialog!: EventEmitter<void>;

    /**
     * If you want to trigger specific ction after the dialog opening.
     * @param {Function} callback
     */
    @Method()
    async openDialog(callback?: () => any) {
        this.dialogChain = this.dialogChainOnGoing();
        this.open = true;

        preventBodyScroll(true);

        if (!this.demo) {
            this.host.focus();
        }

        if (callback) {
            callback();
        }
    }

    /**
     * Hide the dialog from outside
     * @return {Promise}
     */
    @Method()
    async closeDialog(): Promise<void> {
        this.onClose(false);
    }

    @Listen('backdropClick', {target: 'document'})
    backdropClick(event: CustomEvent) {
        if (event.detail !== 'dialog') {
            return;
        }

        hideAllDialogs();
    }

    @Listen('keydown', {target: 'document'})
    onEscapePress(ev: any) {
        if (ev.code === 'Escape' && this.open) {
            this.onClose();
        }
    }

    @Listen('joyIndicatorsChange')
    async onStepChange() {
        this.open = false;
    }

    private onClose = (fireEvent = true) => {
        if (this.demo) {
            return;
        }

        this.hiding = true;

        setTimeout(() => {
            this.hiding = false;
            this.open = false;
            preventBodyScroll(false);
            destroyBackdrop();

            if (fireEvent) {
                this.joyCancelDialog.emit();
            }
        }, 300);
    };

    private onConfirm = () => {
        this.joyConfirmDialog.emit();
    };

    private dialogChainOnGoing() {
        return !!document.body.querySelector('joy-dialog.joy-dialog--open');
    }

    render() {
        return (
            <Host
                tabindex="1"
                role="dialog"
                aria-labelledby="dialogTitle"
                class={{
                    'joy-dialog--open': this.open,
                    'joy-dialog--closed': !this.open,
                    'joy-dialog--demo': this.demo,
                    [`joy-dialog--size-${this.size}`]: true,
                }}
            >
                <div
                    class={{
                        'joy-dialog--wrapper': true,
                        'joy-dialog--wrapper-open': this.open,
                        'joy-dialog--wrapper-demo': this.demo,
                        'joy-dialog--wrapper-hiding': this.hiding,
                    }}
                >
                    <div class="joy-dialog--overlay" onClick={() => this.onClose()} />
                    <div class="joy-dialog">
                        {this.bannerSrc && (
                            <div
                                class="joy-dialog--banner"
                                style={{
                                    backgroundImage: `url(${this.bannerSrc})`,
                                    backgroundPosition: this.bannerPosition,
                                    height: `${this.bannerHeight}px`,
                                }}
                            />
                        )}
                        <div class="joy-dialog--header">
                            <h5 id="dialogTitle">
                                <slot name="dialog-header" />
                            </h5>
                            <p class="joy-dialog--subheader" id="dialogDescription">
                                <slot name="dialog-subheader" />
                            </p>
                            <joy-icon id="joy-dialog--close" tabindex="1" name="cross" class="joy-dialog--close" onClick={() => this.onClose()} />
                        </div>
                        <div class="joy-dialog--body">
                            <slot name="dialog-body" />
                        </div>
                        <div
                            class={{
                                'joy-dialog--footer': true,
                                'joy-dialog--footer-filled': !!this.cancelText || !!this.confirmText,
                            }}
                        >
                            {this.cancelText && (
                                <joy-button onClick={() => this.onClose()} variant="ghost" size={this.buttonSize}>
                                    {this.cancelText}
                                </joy-button>
                            )}
                            {this.confirmText && (
                                <joy-button onClick={this.onConfirm} variant="main" size={this.buttonSize}>
                                    {this.confirmText}
                                </joy-button>
                            )}
                        </div>
                        <div
                            class={{
                                'joy-dialog--indicators': true,
                            }}
                        >
                            <slot name="dialog-indicators" />
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
