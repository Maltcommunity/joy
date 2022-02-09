export type BrandColors = 'blue' | 'pink';
export type ProductColors = 'teal' | 'red' | 'yellow' | 'turquoise' | 'grey';
export type ProductColorsExtended = ProductColors | 'white';
export type Colors = BrandColors | ProductColorsExtended;

/**
 * AVATARS
 */
export type FreelancerAvatarColors = ProductColors;
export type CompanyAvatarColors = Exclude<ProductColors, 'grey'>;

export interface AvatarColors {
    freelancer: FreelancerAvatarColors;
    company: CompanyAvatarColors;
}

/**
 * ICONS
 */
export type IconColors = ProductColorsExtended;
export type IconButtonColors = Extract<ProductColorsExtended, 'white'>;

/**
 * LINKS
 */
export type LinksColors = Extract<ProductColorsExtended, 'white' | 'teal'>;
