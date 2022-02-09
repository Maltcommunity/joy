import {Component, Prop, h, Host} from '@stencil/core';

const badgeTypes = ['highpotential', 'maltlinker', 'new', 'supermalter', 'verified'];

@Component({
    tag: 'joy-badge-level',
    styleUrl: 'badge-level.scss',
    shadow: true,
})
export class JoyBadgeLevel {
    /** Badge type: highpotential, maltlinker, new, supermalter or verified */
    @Prop() type!: typeof badgeTypes[number];

    /** SuperMalter level from 1 to 3 */
    @Prop() superMalterLevel: number = 1;

    /** Display text label */
    @Prop() visibleText: boolean = true;

    get superMalterIcons(): HTMLElement[] {
        const smIcons = [];
        for (let i = 1; i <= this.superMalterLevel; i++) {
            smIcons.push(
                <svg class="joy-badge-level__supermalter" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 18">
                    <path fill="#264FFA" d="M5.71533 12.2962 11.4243 18l.0049-11.45716-5.71387 5.75336Z" />
                    <path fill="#FC5757" d="M.00195312 6.54284.00671145 18 5.7158 12.2962.00195312 6.54284Z" />
                    <path
                        fill="#FFC200"
                        d="M11.4289 5.68249c-.0059-1.52434-.6069-2.9554-1.69067-4.02851C8.95862.882797 7.99681.362073 6.9506.132677 6.95037.132599 6.95021.132599 6.94998.132521c-.04337-.009516-.08681-.018408-.13041-.02691-.0057-.001092-.01147-.002184-.01724-.003276-.0383-.0073317-.07675-.0142735-.11529-.0208255-.01068-.001794-.02144-.00351-.03213-.005304-.03385-.0055379-.06778-.0108418-.10179-.0158338-.01505-.002184-.03011-.0042121-.04516-.0063181-.03011-.0041339-.06022-.008112-.0904-.0117779-.01857-.002262-.03721-.0042901-.05577-.006396C6.33472.0328377 6.30766.029952 6.28051.0273 6.25914.025194 6.23769.0233999 6.21624.0215279 6.19144.0194219 6.16671.017316 6.14183.015522 6.11851.013806 6.09511.0123239 6.07171.0109199 6.04831.00951588 6.02483.00811199 6.00135.006942 5.9771.00577201 5.95276.00483616 5.92842.00397816 5.90541.00312017 5.8824.00234019 5.85931.00179419c-.02433-.00062399-.04874-.0009362-.07316-.0012482C5.76267.000234 5.73912 0 5.71564 0c-.02355 0-.04703.000234-.07051.000546-.02442.000312-.04883.0006242-.07316.00124819-.02309.000546-.0461.00140398-.06911.00218397-.02434.000858-.04859.00179385-.07293.00296384-.02348.00116999-.04696.00257388-.07036.0039779-.0234.001404-.0468.0028861-.07012.0046021-.0248.001794-.0496.0038999-.07441.0060059-.02145.001872-.0429.0036661-.06427.0057721-.02714.002652-.05421.0055377-.08135.0085797-.01857.0021059-.03721.004134-.05577.006396-.03019.0036659-.06037.007644-.09048.0117779-.01506.002106-.03011.0041341-.04516.0063181-.03401.004992-.06794.0102959-.10179.0158338-.01077.001794-.02145.00351-.03214.005304-.03853.006552-.07699.0134938-.11528.0208255-.00578.001092-.01155.002184-.01724.003276-.0436.008502-.08705.017394-.13041.02691-.00024.000078-.00047.000078-.00071.000156C3.43424.361995 2.4725.882719 1.6929 1.65398.609098 2.72702.00811193 4.15815.00218397 5.68249L0 6.15064l.00171623.39226L5.71556 12.2962l5.71384-5.7533.0017-.39202-.0022-.46839Z"
                    />
                </svg>,
            );
        }
        return smIcons;
    }

    get badgeIcon(): HTMLOrSVGElement | HTMLOrSVGElement[] | null {
        switch (this.type) {
            case badgeTypes[0]:
                return (
                    <svg class="joy-badge-level__highpotential" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 14">
                        <g clip-path="url(#a)">
                            <path
                                fill="#FFC200"
                                d="M.00241952 6.50818C.00887156 4.89669.639559 3.38347 1.77754 2.24877c.8186-.8155 1.82835-1.366202 2.926-1.608251h.00081c.04516-.009747.09113-.019494.1371-.028429.00565-.001625.0121-.002437.01775-.004061.04032-.008123.08065-.015433.12097-.021931.0113-.001624.02259-.004061.03388-.005686.03548-.005685.07097-.011371.10726-.016245.01613-.002436.03146-.004873.04759-.006498.03064-.004873.0629-.008934.09436-.012995.01935-.002437.03871-.004874.05887-.006498.02823-.003249.05646-.006498.08549-.008935.02178-.002437.04436-.004874.06694-.006498.02581-.002437.05242-.004061.07823-.006498.0242-.001625.0492-.003249.07339-.004874.0242-.001624.0492-.003249.0742-.004061.02581-.001624.05081-.002437.07662-.003249.0242-.000812.04839-.001624.07259-.002437C5.87539.500812 5.9004.500812 5.92621.5h.07419c.0242 0 .0492 0 .0734.000812.0258 0 .05161.000812.07661.001625.0242.000812.04839.001624.07259.002436.02581 0 .05162.001625.07742.002437.02501.000812.0492.002437.0742.004061.0242.001625.0492.003249.07339.004874.02581.001624.05243.004061.07824.006498.02177.001624.04435.004061.06694.006498.02822.002437.05645.005686.08549.008935.01935.002436.03871.004061.05887.006498.03145.004061.06291.008122.09436.012183.01613.002437.03145.004874.04758.00731.03549.004874.07098.01056.10646.017058.01129.001624.02259.003249.03388.004873.04032.00731.08065.014621.12097.021931.00565.000812.0121.002436.01775.003249.04597.009747.09194.018681.1371.029241h.00081c1.09846.242861 2.1082.792751 2.92604 1.608251 1.1379 1.1347 1.7686 2.64792 1.7751 4.25941L12 7.00284l-.0016.41506L6.0004 13.5.00161301 7.4179 0 7.00284l.00241952-.49466Z"
                            />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M0 0h12v13H0z" transform="translate(0 .5)" />
                            </clipPath>
                        </defs>
                    </svg>
                );

            case badgeTypes[1]:
                return (
                    <svg class="joy-badge-level__maltlinker" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 10">
                        <g clip-path="url(#a)">
                            <path
                                fill="#12CFC9"
                                d="M4.919 9.893c-1.32-.005-2.558-.526-3.487-1.464C.764 7.754.313 6.922.115 6.016v-.001c-.008-.037-.016-.074-.024-.112 0-.005-.001-.01-.002-.015-.006-.033-.012-.066-.018-.1C.069 5.779.068 5.77.066 5.76c-.005-.029-.009-.058-.014-.088-.002-.013-.003-.026-.005-.039-.004-.026-.007-.052-.01-.078l-.006-.048C.028 5.483.026 5.46.024 5.436.022 5.418.02 5.399.019 5.381c-.002-.022-.004-.043-.006-.065-.001-.02-.003-.04-.004-.061-.001-.02-.002-.041-.003-.061-.001-.02-.002-.041-.003-.062-.001-.02-.001-.04-.002-.06 0-.021 0-.043-.001-.064v-.122c0-.021.001-.042.001-.063 0-.02.001-.04.002-.06L.006 4.7c.001-.02.002-.041.003-.061.001-.02.002-.04.004-.061.002-.021.003-.043.005-.064.002-.019.004-.037.006-.056.002-.024.005-.047.007-.07l.006-.048c.003-.026.007-.052.01-.078.002-.014.003-.027.005-.04.004-.029.009-.059.014-.088.002-.009.003-.019.005-.028.006-.033.012-.067.018-.1l.003-.015c.007-.038.015-.075.023-.113v-.001c.198-.904.649-1.737 1.317-2.412C2.361.527 3.6.007 4.919.002L5.324 0l.34.001 4.98 4.946-4.98 4.946-.34.002-.405-.002Z"
                            />
                            <path
                                fill="#FF91F0"
                                d="M16.3651.002c1.319.005 2.558.525 3.487 1.463.668.675 1.118 1.507 1.317 2.413v.001c.008.038.016.075.023.113l.003.015c.006.033.012.066.018.1.002.009.003.019.005.028.005.029.009.059.014.088.002.013.004.026.005.039.004.026.007.052.01.078l.006.048c.003.023.005.047.007.07.002.019.003.037.005.056.002.021.004.043.005.064.001.02.003.04.004.061.001.02.002.041.003.061l.003.063c.001.02.001.04.002.06.001.021.001.042.001.063v.122c0 .021-.001.042-.001.063 0 .02-.001.04-.002.06l-.003.063c-.001.02-.002.041-.003.061-.001.02-.002.04-.004.061-.002.021-.003.043-.005.064-.002.019-.003.037-.005.056-.002.024-.005.047-.007.07l-.006.048c-.003.026-.007.052-.01.078-.002.013-.004.026-.005.039-.004.029-.009.059-.014.088-.002.009-.003.019-.005.028-.006.033-.012.067-.018.1l-.003.015c-.007.038-.015.075-.023.113v.001c-.199.906-.649 1.738-1.317 2.413-.929.938-2.168 1.458-3.487 1.463l-.405.002-.34-.001-4.98-4.946 4.98-4.946.339-.001.406.002Z"
                            />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M0 0h21.283v9.895H0z" />
                            </clipPath>
                        </defs>
                    </svg>
                );

            case badgeTypes[3]:
                return this.superMalterIcons;

            default:
                return null;
        }
    }

    get badgeTag(): HTMLSpanElement {
        return (
            <span
                class={{
                    'joy-badge-level__tag': this.visibleText,
                    'red': this.type === badgeTypes[2] || this.type === badgeTypes[1],
                    'blue': this.type === badgeTypes[0] || this.type === badgeTypes[3],
                    'turquoise': this.type === badgeTypes[4],
                }}
            >
                {this.visibleText && <slot>{this.badgeText}</slot>}
            </span>
        );
    }

    get badgeText(): string {
        switch (this.type) {
            case badgeTypes[0]:
                return 'High Potential';
            case badgeTypes[1]:
                return 'Malt Linker';
            case badgeTypes[2]:
                return 'New';
            case badgeTypes[3]:
                return 'Supermalter';
            case badgeTypes[4]:
                return 'Verified';
            default:
                return 'Supermalter';
        }
    }

    render() {
        return (
            <Host class="joy-badge-level">
                {this.badgeIcon}
                {this.badgeTag}
            </Host>
        );
    }
}