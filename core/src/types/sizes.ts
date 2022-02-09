export type Sizes = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall';
export type BinarySizes = 'default';

export type AvatarSizes = Extract<Sizes, 'small' | 'medium' | 'large'>;

export type ButtonSizes = Extract<Sizes, 'xsmall' | 'small' | 'medium' | 'large'>;

export type DividerCTASizes = BinarySizes | Extract<Sizes, 'small'>;

export type IconsSizes = Sizes;

export type RatingStarsSizes = Extract<Sizes, 'small' | 'medium' | 'large'>;

export type SeparatorSizes = BinarySizes | Extract<Sizes, 'small'>;

export type TagSizes = Extract<Sizes, 'xsmall' | 'small' | 'medium' | 'large'>;

