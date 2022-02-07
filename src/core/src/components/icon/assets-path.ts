import {Env, getAssetPath} from '@stencil/core';

export function getSvgPath(): string {
    if (Env.E2E_ENV) {
        // Local light mock svg-sprite version only for end 2 end testing to prevent 404 because of window constants missing
        return getAssetPath('./__mocks__/icons-sprite-wc.svg');
    }

    if (window.__malt_cdn_url && window.__svg_sprite_url) {
        // integration/production only
        const link = window.__svg_sprite_url.replace(window.__malt_cdn_url, '');
        // xlinkHref does not allow to use a svg from another domain
        // We've set a rule in order to use assets from malt domains, which actually points to our cdn
        // For our icons-sprite, we need to access it with /public/icons-sprite-wc.svg
        return link.replace('/assets', '');
    } else {
        // local
        return '/assets/public/icons-sprite-wc.svg';
    }
}
