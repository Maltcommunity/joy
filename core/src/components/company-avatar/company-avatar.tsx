import {Component, h, Prop} from '@stencil/core';
import {AvatarColors, AvatarSizes} from '../../types';

@Component({
    tag: 'joy-company-avatar',
    styleUrl: 'company-avatar.scss',
    shadow: true,
})
export class CompanyAvatar {
    /** Company avatar color */
    @Prop() color: AvatarColors['company'] = 'teal';
    /**
     * Company name. Required to give image alt text.
     */
    @Prop() companyName: string = '';
    /**
     * URL source for img. Optional.
     */
    @Prop() imgSrc?: string;
    /**
     * Size of the image. Optionnal.
     */
    @Prop() size?: AvatarSizes = 'large';

    get sizeClass(): Record<string, boolean> | null {
        return {[`joy-company-avatar_${this.size}`]: true};
    }

    get computedClasses() {
        return {
            'joy-company-avatar': true,
            'joy-company-avatar_has-logo': !!this.imgSrc,
            ...this.sizeClass,
        };
    }

    get iconSize() {
        switch (this.size) {
            case 'large':
                return 'small';
            case 'medium':
                return 'xsmall';
            case 'small':
                return 'xxsmall';
            default:
                return 'xsmall';
        }
    }

    render() {
        return <div class={this.computedClasses}>{this.imgSrc ? <img src={this.imgSrc} alt={this.companyName}/> :
            <joy-icon name="company-placeholder" size={this.iconSize}></joy-icon>}</div>;
    }
}
