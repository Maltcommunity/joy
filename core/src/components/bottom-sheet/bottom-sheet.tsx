import {Component, Element, h, Method, Prop} from '@stencil/core';
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

    private TRANSLATION_Y_LIMIT = 50;
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
        this.getJoyBottomSheet()?.classList.add(this.CSS_CLASS_OPENED);
    }

    /**
     * Call this method to close the bottom sheet.
     * Example: el.close()
     */
    @Method()
    async close() {
        this.restoreBodyScroll();
        this.getJoyBottomSheet()?.classList.remove(this.CSS_CLASS_OPENED);
    }

    private getJoyBottomSheet(): HTMLElement | undefined {
        const shadowRoot = this.el.shadowRoot;
        return shadowRoot?.querySelector('.joy-bottom-sheet') as HTMLElement;
    }

    private getJoyBottomSheetContainer(): HTMLElement | undefined {
        const shadowRoot = this.el.shadowRoot;
        return shadowRoot?.querySelector('.joy-bottom-sheet-container') as HTMLElement;
    }

    private onClick = () => {
        this.isMoving = false;
        this.close();
    };

    private onStartMoving = (e: MouseEvent) => {
        this.isMoving = true;
        this.getJoyBottomSheetContainer()?.classList.add(this.CSS_CLASS_MOVING);
        this.initialPosY = e.clientY;
    };

    private onStopMoving = (e: MouseEvent) => {
        if (this.isMoving) {
            const translationY = this.calcTranslationY(e);
            if (translationY > 0) {
                this.close();
            }
            this.stopMoving();
        }
    };

    private onMoving = (e: MouseEvent) => {
        if (this.isMoving) {
            const translationY = this.calcTranslationY(e);

            if (translationY > this.TRANSLATION_Y_LIMIT) {
                this.close();
            } else if (translationY > 0) {
                this.moveContainer(translationY);
            }
        }
    };

    private calcTranslationY(e: MouseEvent) {
        return e.clientY - this.initialPosY;
    }

    private moveContainer(translationY: number) {
        const container = this.getJoyBottomSheetContainer();
        (container as HTMLElement).style.setProperty('transform', `translateY(${translationY}px)`);
    }

    private stopMoving() {
        const container = this.getJoyBottomSheetContainer();
        container?.classList.remove(this.CSS_CLASS_MOVING);
        (container as HTMLElement).style.removeProperty('transform');
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
            <div>
                <div class="joy-bottom-sheet">
                    <div class="joy-bottom-sheet-container">
                        <div
                            class="joy-bottom-sheet_header"
                            onMouseDown={this.onStartMoving}
                            onMouseUp={this.onStopMoving}
                            onMouseMove={this.onMoving}
                            onMouseLeave={this.onStopMoving}
                        >
                            <div class="joy-bottom-sheet_header-close"></div>
                        </div>
                        <div class="joy-bottom-sheet_content" data-testid="bottom-sheet-content">
                            <slot name="bottom-sheet-content" />
                        </div>
                        <div class="joy-bottom-sheet_footer" data-testid="bottom-sheet-footer">
                            <joy-button class="joy-bottom-sheet_footer-close" variant={this.closeVariant} onClick={this.onClick}>
                                {this.closeLabel}
                            </joy-button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
