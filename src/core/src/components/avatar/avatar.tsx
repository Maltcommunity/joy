import {Component, Element, h, Prop} from '@stencil/core';
import {AvatarColors, AvatarSizes, Sizes} from '../../types';

/**
 * If both photoUrl and fullName are empty, it will display an icon placeholder.
 */
@Component({
    tag: 'joy-avatar',
    styleUrl: 'avatar.scss',
    shadow: true,
})
export class JoyAvatar {
    @Element() el!: HTMLJoyAvatarElement;
    /**
     * Avatar size, 3 possible values (can't be overridden)
     */
    @Prop() size?: AvatarSizes = 'medium';
    /**
     * Specify a photo url to display.
     */
    @Prop() photoUrl?: string;
    /**
     * Freelancer full name. Will be used to display its initials if no photoUrl is given.
     */
    @Prop() fullName?: string;
    /**
     * Specify a background color. Handy for avatars list. The value is the index of css custom property array made from CSS Custom Properties value (see next table)
     */
    @Prop() color?: AvatarColors['freelancer'] = 'teal';
    /**
     * Specify the total amount of persons remaining from a list.
     */
    @Prop() totalNumber?: number;
    /**
     * Specify the link to redirect to the full list
     */
    @Prop() totalNumberLink?: string;
    /**
     * The prop is given automatically by avatars-list component when you set compress prop to true. You won't need this prop out of an avatars-list.
     */
    @Prop() compress = false;
    /**
     * The prop is given automatically by avatars-list component when you set compress prop to true. You won't need this prop out of an avatars-list.
     */
    @Prop() isFirstFromList = false;

    /** Url you need to link your avatar to */
    @Prop() href?: string;

    /** Target attribute if href is used */
    @Prop() target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';

    get sizeClass() {
        return this.size ? {[`joy-avatar__${this.size}`]: true} : null;
    }

    private getFirstLetter(str: string) {
        const cleanedString = str.replace(/[';,:()]/g, '');
        return cleanedString.charAt(0);
    }

    private getInitials(): string {
        let arrayName = this.fullName!.split(' ');
        arrayName = arrayName.slice(0, 2);
        arrayName.forEach((str, idx) => {
            arrayName[idx] = this.getFirstLetter(str);
        });

        return arrayName.join('').toUpperCase();
    }

    get imgSize() {
        if (this.size === 'medium') {
            return 60;
        } else if (this.size === 'small') {
            return 30;
        }

        return 100;
    }

    get iconSize(): Sizes {
        if (this.size === 'large') {
            return 'medium';
        } else if (this.size === 'medium') {
            return 'small';
        } else if (this.size === 'small') {
            return 'xsmall';
        }
        return 'small';
    }

    get avatarClasses() {
        return {
            'joy-avatar': true,
            'joy-avatar__compress': this.compress,
            'joy-avatar__first': this.isFirstFromList,
            ...this.sizeClass,
            ...this.avatarColor,
        };
    }

    get avatarColor() {
        return {[`joy-avatar__${this.color}`]: true};
    }

    render() {
        /**
         * Photo is defined
         */
        if (this.photoUrl) {
            if (this.href) {
                return (
                    <a href={this.href} target={this.target ? this.target : ''}>
                        {this.avatarPicture}
                    </a>
                );
            } else {
                return this.avatarPicture;
            }
            /**
             * Photo is not defined but we want to display initials
             */
        } else if (!this.photoUrl && this.fullName) {
            if (this.href) {
                return <a href={this.href}>{this.initialsTemplate}</a>;
            } else {
                return this.initialsTemplate;
            }
            /**
             * Too many avatars so we display a "+ X" placeholder
             */
        } else if (!this.photoUrl && !this.fullName && this.totalNumber) {
            /**
             * The placeholder is a link to the full list
             */
            if (this.totalNumberLink) {
                return (
                    <a href={this.totalNumberLink} class={this.avatarClasses}>
                        + {this.totalNumber}
                    </a>
                );
                /**
                 * If no link to full list
                 */
            } else {
                return <div class={this.avatarClasses}>+{this.totalNumber}</div>;
            }
            /**
             * Simply display an user icon placeholder
             */
        } else {
            return (
                <div
                    class={{
                        ...this.avatarClasses,
                        'joy-avatar__placeholder': true,
                    }}
                >
                    <joy-icon name="user-photo" color="white" size={this.iconSize}></joy-icon>
                </div>
            );
        }
    }
    get avatarPicture() {
        return (
            <picture class={this.avatarClasses}>
                <img src={this.photoUrl} title={this.fullName} alt="" loading="lazy" width={this.imgSize} height={this.imgSize} />
            </picture>
        );
    }

    get initialsTemplate() {
        return (
            <div class={this.avatarClasses} title={this.fullName}>
                {this.getInitials()}
            </div>
        );
    }
}
