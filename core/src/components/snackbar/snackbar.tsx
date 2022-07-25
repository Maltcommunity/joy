import {Component, Prop, h, State, Element, Event, EventEmitter, Host} from '@stencil/core';
import {iconLevel} from '../../utils';
import {SnackbarLevels} from '../../types';

@Component({
    tag: 'joy-snackbar',
    styleUrl: 'snackbar.scss',
    shadow: true,
})
export class Snackbar {
    @Element() el!: HTMLJoySnackbarElement;
    /**
     * The criticality level of your notification. Range from simple info to error.
     */
    @Prop() level: SnackbarLevels = 'success';
    /**
     * HTML with your custom message injected in the component. It won't be escaped so please be careful with XSS !
     */
    @Prop() dangerousHtmlMessage!: string;
    /**
     * If you need to create an action link (like cancel an action from snackbar) simply pas its text. Clicking on it will trigger a custom event
     */
    @Prop() triggerActionText?: string;
    /**
     * Time in ms the snackbar is displayed. Give 'forever' to be able to display the snackbar without timeout
     */
    @Prop() duration?: number | 'forever' = 5000;
    /**
     * Display an icon to close the notification manually
     */
    @Prop() closable?: boolean = true;
    /**
     * By default, the snackbar will be displayed in a fixed position at the bottom of the page. You can override this behavior by setting position="relative"
     */
    @Prop() position?: 'fixed' | 'relative' = 'fixed';

    @State() id!: string;

    /**
     * Fire snackbar custom action. Nothing is returned
     */
    @Event({
        eventName: 'joy-snackbar-trigger-action',
    })
    joySnackbarTriggerAction!: EventEmitter<void>;

    private triggerAction = () => {
        this.joySnackbarTriggerAction.emit();
    };

    private destroySnackbar = () => {
        this.el.remove();
    };

    get levelClass(): {[p: string]: boolean} {
        return {[`joy-snackbar_${this.level}`]: true};
    }

    get closeSnackbarCta(): HTMLJoyIconElement {
        return <joy-icon-button onJoyIconButtonClick={this.destroySnackbar} icon="cross" data-close-notification />;
    }

    get icon(): HTMLJoyIconElement {
        return <joy-icon name={iconLevel(this.level)} />;
    }

    componentDidRender() {
        if (this.duration !== 'forever') {
            setTimeout(() => {
                return this.destroySnackbar();
            }, this.duration);
        }
    }

    render() {
        return (
            <Host
                data-level={this.level}
                class={{
                    'joy-snackbar__position___relative': this.position === 'relative',
                }}
            >
                <div
                    class={{
                        'joy-snackbar': true,
                        ...this.levelClass,
                    }}
                    id={this.id}
                    data-level={this.level}
                >
                    <div class="joy-snackbar__img">{this.icon}</div>
                    <div class="joy-snackbar__content">
                        <span innerHTML={this.dangerousHtmlMessage} />
                        {this.triggerActionText && (
                            <strong class="joy-snackbar__trigger___action" onClick={this.triggerAction}>
                                {this.triggerActionText}
                            </strong>
                        )}
                    </div>
                    {this.closable && this.closeSnackbarCta}
                </div>
            </Host>
        );
    }
}
