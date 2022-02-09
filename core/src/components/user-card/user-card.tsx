import {Component, h, Prop} from '@stencil/core';
/**
 * @slot user-card-avatar - Inject a joy-avatar component here, with the photo URL or the full name if no photo available.
 * @slot user-card-title - Main title of the user card. Basically the freelancer's full name, but you can actually pass a company name or whatever you want if you need to customize.
 * Prefer using fullName prop instead.
 * @slot user-card-subtitle - Main subtitle of the user card. Basically the freelancer's job, but you can actually pass any content if you need to customize.
 * Prefer using subTitle prop instead.
 * @slot user-card-free-slot - Hope you won't need to use it, but in case you need to fully customize the right part of the component, use this slot and inject the HTML you need.
 * Deal with your own CSS, don't add it in the core component !
 * @slot user-card-rating-stars - Render your rating stars element if you need its slot access.
 */
@Component({
    tag: 'joy-user-card',
    styleUrl: 'user-card.scss',
    shadow: true,
})
export class UserCard {
    /**
     * Giving a link will make the whole component wrapped by an hyperlink
     */
    @Prop() link?: string;
    /**
     * Given the link, it will open the link in a new tab
     */
    @Prop() newTab?: boolean = false;
    /**
     * Use this prop if you don't want to use the user-card-avatar slot.
     */
    @Prop() photoUrl?: string;
    /**
     * Can be the freelancer's full name, or whatever you want. It will be placed at the top right part.
     */
    @Prop() fullName?: string;
    /**
     * Can be the freelancer's job, a company name or whatever you want. It will be placed at the top right part, below title
     */
    @Prop() subTitle?: string;
    /**
     * Freelancer's public rating.
     */
    @Prop() ratingValue?: string;

    private avatar() {
        return (
            <div class="joy-user-card__picture">
                <slot name="user-card-avatar">
                    <joy-avatar photo-url={this.photoUrl} full-name={this.fullName}></joy-avatar>
                </slot>
            </div>
        );
    }

    private variousInformations() {
        return (
            <div class="joy-user-card__informations">
                <p class="joy-user-card__title">
                    <slot name="user-card-title">{this.fullName}</slot>
                </p>

                <p class="joy-user-card__subtitle">
                    <slot name="user-card-subtitle">{this.subTitle}</slot>
                </p>

                <slot name="user-card-rating-stars">{this.ratingValue && <joy-rating-stars rating-value={this.ratingValue}></joy-rating-stars>}</slot>

                <slot name="user-card-free-slot" />
            </div>
        );
    }

    private innerLayout() {
        return [this.avatar(), this.variousInformations()];
    }

    render() {
        if (this.link) {
            return (
                <a target={this.newTab ? '_blank' : '_self'} class="joy-user-card" href={this.link} title={this.fullName}>
                    {this.innerLayout()}
                </a>
            );
        } else {
            return this.innerLayout();
        }
    }
}
