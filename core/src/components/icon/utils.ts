import {getAssetPath} from '@stencil/core';

let CACHED_MAP: Map<string, string>;

export const getIconMap = (): Map<string, string> => {
    if (typeof window === 'undefined') {
        return new Map();
    } else {
        if (!CACHED_MAP) {
            const win = window as any;
            win.JoyIcons = win.JoyIcons || {};
            CACHED_MAP = win.JoyIcons.map = win.JoyIcons.map || new Map();
        }
        return CACHED_MAP;
    }
};

export const getIconUrl = (icon: string) => {
    const url = getIconMap().get(icon);
    if (url) {
        return url;
    }
    return getAssetPath(`./icons/${icon}.svg`);
}

export const getSrc = (src: string | undefined) => {
    if (isStr(src)) {
        src = src.trim();
        if (isSrc(src)) {
            return src;
        }
    }
    return null;
};

export const isSrc = (str: string) => str.length > 0 && /(\/|\.)/.test(str);

export const isStr = (val: any): val is string => typeof val === 'string';