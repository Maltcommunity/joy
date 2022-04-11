export * from './colors';
export * from './levels';
export * from './sizes';
export * from './variants';

export type HyperLinksTargets = '_blank' | '_self' | '_parent' | '_top';

export type Direction = 'vertical' | 'horizontal';

export type Tab = {
    selectedTab: string;
    href: string;
};

export type BackDropOrigin = 'dialog' | 'select';
