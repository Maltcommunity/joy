import {Component, Prop, h} from '@stencil/core';
import {RatingStarsSizes} from '../../types';

/**
 @slot rating-stars-slot - Generic slot to add some additional content that requires translations, not only numbers.
 */
@Component({
    tag: 'joy-rating-stars',
    styleUrl: 'rating-stars.scss',
    shadow: true,
})
export class RatingStars {
    /**
     * The actual rating, between 0 and 5.
     */
    @Prop() ratingValue: number = 0;
    /**
     * Star size. 3 possible values but you can't give a number as value
     */
    @Prop() size: RatingStarsSizes = 'medium';
    /**
     * Review count. it will be displayed with parenthesis : (5)
     */
    @Prop() reviewCount: number = 0;

    private getFullStarSvg(size: number): string {
        return `
            <svg class="star-full" width="${size}" height="${size}" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.51738 0.317102L10.8968 5.03115L15.4764 5.48484C15.7915 5.51103 16.0257 5.78767 15.9995 6.10274C15.9882 6.2386 15.9288 6.36597 15.832 6.46193L12.063 10.1975L13.4604 15.2735C13.5424 15.5821 13.3586 15.8987 13.05 15.9806C12.9134 16.0169 12.7682 16.0019 12.6419 15.9384L7.99897 13.6393L3.36244 15.9355C3.07717 16.079 2.72963 15.964 2.58619 15.6787C2.52268 15.5524 2.50765 15.4073 2.54393 15.2706L3.94129 10.1946L0.169485 6.45908C-0.0550713 6.23653 -0.0566948 5.87408 0.165859 5.64952C0.261822 5.55269 0.389191 5.49329 0.525048 5.482L5.10469 5.0283L7.48056 0.317103C7.62715 0.0307927 7.97809 -0.0824695 8.2644 0.0641246C8.37318 0.119821 8.46168 0.208323 8.51738 0.317102Z" fill="#FFC200"/>
            </svg>
        `;
    }

    private getHalfStarSvg(size: number): string {
        return `
            <svg class="star-half" width="${size}" height="${size}" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path d="M9.51738 1.3171L11.8968 6.03115L16.4764 6.48484C16.7915 6.51103 17.0257 6.78767 16.9995 7.10274C16.9882 7.2386 16.9288 7.36597 16.832 7.46193L13.063 11.1975L14.4604 16.2735C14.5424 16.5821 14.3586 16.8987 14.05 16.9806C13.9134 17.0169 13.7682 17.0019 13.6419 16.9384L8.99897 14.6393L4.36244 16.9355C4.07717 17.079 3.72963 16.964 3.58619 16.6787C3.52268 16.5524 3.50765 16.4073 3.54393 16.2706L4.94129 11.1946L1.16949 7.45908C0.944928 7.23653 0.943304 6.87408 1.16586 6.64952C1.26182 6.55269 1.38919 6.49329 1.52505 6.482L6.10469 6.0283L8.48056 1.3171C8.62715 1.03079 8.97809 0.917532 9.2644 1.06412C9.37318 1.11982 9.46168 1.20832 9.51738 1.3171Z" stroke="#FFC200" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.36243 16.9355L8.99897 14.6393V1C8.78748 1.00017 8.58356 1.11591 8.48055 1.3171L6.10469 6.0283L1.52504 6.482C1.38919 6.49329 1.26182 6.55269 1.16586 6.64952C0.943301 6.87408 0.944925 7.23653 1.16948 7.45908L4.94129 11.1946L3.54393 16.2706C3.50765 16.4073 3.52268 16.5524 3.58618 16.6787C3.72963 16.964 4.07717 17.079 4.36243 16.9355Z" fill="#FFC200"/>
            </svg>
        `;
    }

    private getEmptyStarSvg(size: number): string {
        return `
            <svg class="star-empty" width="${size}" height="${size}" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5746 6.09904C11.6613 6.27083 11.8298 6.38638 12.0213 6.40535L16.8867 6.88741L16.8867 6.88748L16.8956 6.88821C16.9207 6.8903 16.9394 6.91236 16.9373 6.93758C16.9364 6.94846 16.9317 6.95863 16.9239 6.96629L16.9239 6.9663L12.9198 10.9353C12.7754 11.0784 12.7195 11.2882 12.7734 11.4841L14.2569 16.8736C14.2635 16.9009 14.2471 16.9285 14.2199 16.9358C14.2077 16.939 14.1948 16.9377 14.1835 16.932L14.1804 16.9304L9.24773 14.4877C9.09041 14.4098 8.90575 14.4098 8.74844 14.4877L3.82259 16.9274L3.82259 16.9274L3.81953 16.929C3.79405 16.9418 3.76297 16.9315 3.75011 16.906C3.7446 16.895 3.74316 16.8824 3.74605 16.8705L5.22955 11.4811C5.2835 11.2851 5.2275 11.0752 5.08306 10.9321L1.07604 6.96327C1.07601 6.96323 1.07597 6.9632 1.07593 6.96316C1.0581 6.94537 1.05801 6.91646 1.07575 6.89856C1.08341 6.89083 1.09357 6.88609 1.1044 6.88519L1.1044 6.88526L1.11327 6.88438L5.97868 6.40233C6.17024 6.38335 6.3388 6.26773 6.42547 6.09584L8.94803 1.09326C8.94815 1.09302 8.94827 1.09279 8.9484 1.09255C8.96278 1.06539 8.99633 1.05479 9.02371 1.06881C9.03399 1.07407 9.0424 1.08237 9.04781 1.09259C9.04793 1.09281 9.04804 1.09303 9.04816 1.09326L11.5746 6.09904Z" stroke="#E0DED9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    private setStars(rating: number, size: number): string {
        let icons = '';
        let on = 0.24;
        let half = 0.75;

        for (let i = 0; i < 5; i++) {
            let img = '';

            if (rating > on) {
                img = rating < half ? this.getHalfStarSvg(size) : this.getFullStarSvg(size);
            } else {
                img = this.getEmptyStarSvg(size);
            }

            icons += `<li>${img}</li>`;
            on += 1;
            half += 1;
        }

        return icons;
    }

    get starSize() {
        switch (this.size) {
            case 'large':
                return 17;
            case 'medium':
                return 14;
            case 'small':
                return 11;
            default:
                return 14;
        }
    }

    get ratingStarsWrapper() {
        return <ul class="joy-rating-stars" innerHTML={this.setStars(this.ratingValue, this.starSize)}></ul>;
    }

    get numberOfRateTextContent() {
        return this.reviewCount > 0 ? <span>({this.reviewCount})</span> : '';
    }

    render() {
        return (
            <div class="joy-rating-stars__wrapper">
                {this.ratingStarsWrapper}
                <slot name="rating-stars-slot">{this.numberOfRateTextContent}</slot>
            </div>
        );
    }
}
