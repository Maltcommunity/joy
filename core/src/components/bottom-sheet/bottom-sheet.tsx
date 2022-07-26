import {Component, Element, Event, EventEmitter, h, Method, Prop} from '@stencil/core';
import {ButtonVariants} from '../../types';

@Component({
    tag: 'joy-bottom-sheet',
    styleUrl: 'bottom-sheet.scss',
    shadow: true,
})
export class BottomSheet {
    /**
     * close-label used for close button. Default: 'Close'
     */
    @Prop() closeLabel = 'Close';
    /**
     * close-variant used for close button. Default: 'primary'
     * See: joy-button documentation
     */
    @Prop() closeVariant: ButtonVariants = 'primary';
    @Element() el!: HTMLJoyBottomSheetElement;

    /** Custom event fired when user close bottom sheet */
    @Event({eventName: 'joy-bottom-sheet-closed'}) joyBottomSheetClosed!: EventEmitter<void>;

    private bottomSheetElement!: HTMLElement;
    private bottomSheetContainerElement!: HTMLElement;

    private TRANSLATION_Y_LIMIT = 75;
    private CSS_CLASS_MOVING = 'moving';
    private CSS_CLASS_OPENED = 'opened';

    private isMoving = false;
    private initialPosY = 0;
    private initialBodyOverflow: string | undefined;

    /**
     * Call this method to open the bottom sheet.
     * Example: el.open()
     */
    @Method()
    async open() {
        this.suspendBodyScroll();
        this.bottomSheetElement.classList.add(this.CSS_CLASS_OPENED);
    }

    /**
     * Call this method to close the bottom sheet.
     * Example: el.close()
     */
    @Method()
    async close() {
        this.restoreBodyScroll();
        this.bottomSheetElement.classList.remove(this.CSS_CLASS_OPENED);
    }

    private async closeByUser() {
        await this.close();
        this.joyBottomSheetClosed.emit();
    }

    private onClickClose = async () => {
        this.isMoving = false;
        await this.closeByUser();
    };

    private onStartMoving = (e: MouseEvent | TouchEvent) => {
        this.isMoving = true;
        this.bottomSheetContainerElement.classList.add(this.CSS_CLASS_MOVING);
        this.initialPosY = this.getClientYFromEvent(e);
    };

    private onStopMoving = async (e: MouseEvent | TouchEvent) => {
        if (this.isMoving) {
            const translationY = this.calcTranslationY(e);
            if (translationY > 0) {
                await this.closeByUser();
            }
            this.stopMoving();
        }
    };

    private onMoving = async (e: MouseEvent | TouchEvent) => {
        if (this.isMoving) {
            const translationY = this.calcTranslationY(e);

            if (translationY > this.TRANSLATION_Y_LIMIT) {
                await this.closeByUser();
            } else if (translationY > 0) {
                this.moveContainer(translationY);
            }
        }
    };

    private onOuterClick = async (e: MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains('opened')) {
            await this.closeByUser();
        }
    };

    private calcTranslationY(e: MouseEvent | TouchEvent) {
        return this.getClientYFromEvent(e) - this.initialPosY;
    }

    private getClientYFromEvent(e: MouseEvent | TouchEvent) {
        const touchEvents = ['touchend', 'touchmove', 'touchstart'];
        if (touchEvents.includes(e.type)) {
            return (e as TouchEvent).changedTouches[0].clientY;
        } else {
            return (e as MouseEvent).clientY;
        }
    }

    private moveContainer(translationY: number) {
        this.bottomSheetContainerElement.style.setProperty('transform', `translateY(${translationY}px)`);
    }

    private stopMoving() {
        this.bottomSheetContainerElement.classList.remove(this.CSS_CLASS_MOVING);
        this.bottomSheetContainerElement.style.removeProperty('transform');
        this.isMoving = false;
    }

    private restoreBodyScroll() {
        if (this.initialBodyOverflow) {
            document.querySelector('body')!.style.setProperty('overflow', this.initialBodyOverflow);
        } else {
            document.querySelector('body')!.style.removeProperty('overflow');
        }
    }

    private suspendBodyScroll() {
        this.initialBodyOverflow = document.querySelector('body')?.style.getPropertyValue('overflow');
        document.querySelector('body')!.style.setProperty('overflow', 'hidden');
    }

    render() {
        return (
            <div class="joy-bottom-sheet" ref={(el) => (this.bottomSheetElement = el as HTMLElement)} onClick={this.onOuterClick}>
                <div class="joy-bottom-sheet-container" ref={(el) => (this.bottomSheetContainerElement = el as HTMLElement)}>
                    <div
                        class="joy-bottom-sheet_header"
                        onMouseDown={this.onStartMoving}
                        onMouseUp={this.onStopMoving}
                        onMouseMove={this.onMoving}
                        onMouseLeave={this.onStopMoving}
                        onTouchStart={this.onStartMoving}
                        onTouchEnd={this.onStopMoving}
                        onTouchMove={this.onMoving}
                    >
                        <div class="joy-bottom-sheet_header-close"></div>
                    </div>
                    <div class="joy-bottom-sheet_content" data-testid="bottom-sheet-content">
                        <slot name="bottom-sheet-content" />
                    </div>
                    <div class="joy-bottom-sheet_footer" data-testid="bottom-sheet-footer">
                        <joy-button class="joy-bottom-sheet_footer-close" variant={this.closeVariant} onClick={this.onClickClose}>
                            {this.closeLabel}
                        </joy-button>
                    </div>
                </div>
            </div>
        );
    }
}
