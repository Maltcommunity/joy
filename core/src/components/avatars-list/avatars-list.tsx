import {Component, h, Host, Prop, Element} from '@stencil/core';
import {AvatarColors} from '../../types';

const FREELANCER_AVATAR_COLORS_MAP: Array<AvatarColors['freelancer']> = ['teal', 'turquoise', 'red', 'yellow', 'grey'];

@Component({
    tag: 'joy-avatars-list',
    styleUrl: 'avatars-list.scss',
    shadow: false,
})
export class JoyAvatarsList {
    /**
     * How avatars are spread. With a gap, or overlaped
     */
    @Prop() compress: boolean = false;
    @Element() el!: HTMLJoyAvatarsListElement;

    componentDidRender() {
        let avatarIndex = 0;

        this.el.querySelectorAll('joy-avatar').forEach((avatar, i) => {
            if (i % FREELANCER_AVATAR_COLORS_MAP.length === 0) {
                avatarIndex = 0;
            }

            avatar.setAttribute('color', `${FREELANCER_AVATAR_COLORS_MAP[avatarIndex]}`);

            if (this.compress) {
                avatar.setAttribute('compress', 'true');
                if (i === 0) {
                    avatar.setAttribute('is-first-from-list', 'true');
                }
            }

            avatarIndex++;
        });
    }

    render() {
        return (
            <Host
                class={{
                    'joy-avatars-list': true,
                    'joy-avatars-list__compress': this.compress,
                }}
            >
                <slot />
            </Host>
        );
    }
}
