import {Component, Prop, h, Event, EventEmitter, Watch, State} from '@stencil/core';

/**
 @slot pagination-prev - Link to go to previous page. Use if it contains too many custom attributes for tracking or whatever.
 @slot pagination-next - Link to go to next page. Use if it contains too many custom attributes for tracking or whatever.
 @slot pagination-pages - Loop over your pages. Use if it contains too many custom attributes for tracking or whatever.
 */

@Component({
    tag: 'joy-pagination',
    styleUrl: 'pagination.scss',
    shadow: true,
})
export class Pagination {
    @State() pages: number[] = [];

    /** Current page number */
    @Prop({mutable: true}) currentPage = 1;

    /** Total number of pages in order to construct the pagination */
    @Prop() totalPages = 1;

    /** Can be used as aria-label attribute for the full component */
    @Prop() labelPagination?: string;

    /** Can be used as title and aria-label attributes for the previous CTA */
    @Prop() labelPrev? = '';

    /** For synchrone implementations (not SPA, basically), allows to inject the URL for previous CTA */
    @Prop() linkPrev?: string;
    /** data-heap attribute for previous CTA. We should avoid as much as possible to use this kind of props inside the webcomponents */
    @Prop() heapPrev?: string;

    /** Can be used as title and aria-label attributes for the next CTA */
    @Prop() labelNext? = '';
    /** For synchrone implementations (not SPA, basically), allows to inject the URL for next CTA */
    @Prop() linkNext?: string;
    /** data-heap attribute for next CTA. We should avoid as much as possible to use this kind of props inside the webcomponents */
    @Prop() heapNext?: string;

    private maxPagesToDisplay = 6; // first page, last page, and 4 others

    /** use @joyChangePage="yourMethod" for Vue apps, to handle pagination change. Clicked page is returned */
    @Event({eventName: 'joyChangePage'}) changePage!: EventEmitter<number>;

    @Watch('totalPages')
    updatePages(value: number) {
        if (Number.isInteger(value)) {
            this.setArrayFromTotalPages();
        }
    }

    private onChangePage = (e: MouseEvent) => {
        e.preventDefault();
        // @ts-ignore
        this.currentPage = e.target.dataset.page; // data-page attr
        this.changePage.emit(this.currentPage);
        this.setArrayFromTotalPages();
    };

    private displayGapToLastPage(): boolean {
        const pagesLength = this.pages.length;
        const lastItemOfArray = this.pages[pagesLength - 1];

        // Page Z value = Page Y value + 1
        return lastItemOfArray !== this.pages[pagesLength - 2] + 1;
    }

    private displayGapToFirstPage(): boolean {
        // Page 1 value = Page 2 value - 1
        return this.pages[0] !== this.pages[1] - 1;
    }

    private setRange(start: number, end: number) {
        const range = [];

        range.push(1);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        range.push(this.totalPages);
        return range;
    }

    private createPagesEntries() {
        let before = this.currentPage - 2;
        let after = this.currentPage + 1;

        if (before <= 1) {
            before = 2;
            after = 5;
        }

        if (after >= this.totalPages) {
            after = this.totalPages - 1;
            before = after - 3;
        }

        return this.setRange(before, after);
    }

    private setArrayFromTotalPages(): void {
        this.resetNumberOfPages();

        if (this.totalPages < this.maxPagesToDisplay) {
            this.pages = this.setRange(2, this.totalPages - 1);
        } else {
            this.pages = this.createPagesEntries();
        }
    }

    private resetNumberOfPages() {
        this.pages = [];
    }

    connectedCallback() {
        this.setArrayFromTotalPages();
    }

    get prevIcon(): HTMLJoyIconElement {
        return (
            <joy-icon
                class="joy-pagination__icon"
                aria-label={this.labelPrev}
                title={this.labelPrev}
                data-page={this.currentPage - 1}
                color="grey"
                onClick={this.onChangePage}
                name="chevron-left"
            ></joy-icon>
        );
    }

    get nextIcon(): HTMLJoyIconElement {
        return (
            <joy-icon
                class="joy-pagination__icon"
                aria-label={this.labelNext}
                title={this.labelNext}
                data-page={this.currentPage + 1}
                onClick={this.onChangePage}
                name="chevron-right"
            ></joy-icon>
        );
    }

    get prevCustomAttributes() {
        return {
            'data-heap': this.heapPrev || null,
        };
    }

    get nextCustomAttributes() {
        return {
            'data-heap': this.heapNext || null,
        };
    }

    render() {
        return (
            <nav role="navigation" aria-label={this.labelPagination} class="joy-pagination" data-current={this.currentPage}>
                <ul>
                    <li
                        class={{
                            'joy-pagination__previous': true,
                            'joy-pagination__arrow': true,
                            'joy-pagination__hidden': this.currentPage === 1,
                        }}
                        {...this.prevCustomAttributes}
                    >
                        <slot name="pagination-prev">
                            {this.linkPrev && (
                                <a href={this.linkPrev} rel="prev">
                                    {this.prevIcon}
                                </a>
                            )}
                            {!this.linkPrev && this.prevIcon}
                        </slot>
                    </li>

                    <li>
                        <slot name="pagination-pages">
                            <ul>
                                {this.pages.map((page: number) => (
                                    <li>
                                        <button
                                            type="button"
                                            data-page={page}
                                            aria-current={page === this.currentPage ? 'true' : 'false'}
                                            class={{
                                                'current': page === this.currentPage,
                                                'joy-pagination__separator joy-pagination__separator-after':
                                                    page === 1 && this.displayGapToFirstPage(),
                                                'joy-pagination__separator joy-pagination__separator-before':
                                                    page === this.totalPages && this.displayGapToLastPage(),
                                            }}
                                            onClick={this.onChangePage}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </slot>
                    </li>

                    <li
                        class={{
                            'joy-pagination__next joy-pagination__arrow': true,
                            'joy-pagination__hidden': this.currentPage === this.totalPages,
                        }}
                        {...this.nextCustomAttributes}
                    >
                        <slot name="pagination-next">
                            {this.linkNext && (
                                <a href={this.linkNext} rel="next">
                                    {this.nextIcon}
                                </a>
                            )}
                            {!this.linkNext && this.nextIcon}
                        </slot>
                    </li>
                </ul>
            </nav>
        );
    }
}
