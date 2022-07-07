export type BrandColors = 'blue' | 'pink';
export type FunctionalColors = 'success' | 'error' | 'warning' | 'info';
export type ProductColors = 'teal' | 'red' | 'yellow' | 'turquoise' | 'grey';
export type ProductColorsExtended = ProductColors | FunctionalColors | 'white';
export type Colors = BrandColors | ProductColorsExtended;

/**
 * AVATARS
 */
export type FreelancerAvatarColors = ProductColors;
export type CompanyAvatarColors = Exclude<ProductColors, 'grey'>;

export interface AvatarColors {
    freelancer: FreelancerAvatarColors | 'transparent';
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
