import {Config} from '@stencil/core';
import {sass} from '@stencil/sass';
import * as path from 'path';

function isEnv(flag: string): boolean {
    return process.argv && process.argv.indexOf(flag) > -1;
}

const E2E_ENV = isEnv('--e2e');
const PROD_ENV = isEnv('--prod');
const DEV_ENV = isEnv('--dev');

const env = Object.assign({},  E2E_ENV ? {E2E_ENV: 'e2e'} : {});
const polyfills = Object.assign({}, PROD_ENV ? { 
    cssVarsShim: true,
    dynamicImportShim: true,
    shadowDomShim: true,
    safari10: true,
    scriptDataOpts: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: true,
    
} : {});

export const config: Config = {
    namespace: 'joy',
    /**
     * Avoid "clipping" effect while components are loading
     * Not all components are easy to style before they are actually loading
     * Especially components that actually uses other components
     */
    invisiblePrehydration: false,
    globalStyle: './src/style/index.scss',
    globalScript: './src/scripts/global-script.ts',
    // bundles: [
    //     {
    //         // Critical bundle
    //         components: ['joy-checkbox', 'joy-counter', 'joy-radio', 'joy-radio-group', 'joy-textarea', 'joy-toggle'],
    //     },
    //     {components: ['joy-avatar', 'joy-avatars-list', 'joy-user-card']},
    //     {components: ['joy-tabs', 'joy-tab', ' environment variablesjoy-tab-button']},
    //     {components: ['joy-tag', 'joy-tags-list']},
    //     {components: ['joy-link', 'joy-text']},
    //     {components: ['joy-tooltip', 'joy-tooltip-trigger']},
    // ],
    hashFileNames: false,
    enableCache: false,
    buildEs5: 'prod',
    sourceMap: true,
    outputTargets: [
        {
            type: 'dist',
            dir: './dist',
        },
        {
            type: 'dist-custom-elements',
            dir: './dist/components',
        },
        {
            type: 'www',
            dir: './dist/www/',
            serviceWorker: null, // disable service workers
        },
        {
            type: 'stats',
            file: './dist/joy-stats.json',
        },
    ],
    env,
    testing: {
        /**
         * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
         * before it can run your tests
         */
        browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
        pixelmatchThreshold: 0.05,
        waitBeforeScreenshot: 20,
        allowableMismatchedPixels: 200,
    },
    plugins: [sass()],
    extras: polyfills,
};
