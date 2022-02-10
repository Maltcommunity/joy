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
    minifyJs: true,
    minifyCss: true,
    bundles: [
        {
            /**
             * Critical bundle. joy-all-critical is a simple hack because we can't give a custom name to this bundle made of multiple components.
             * By default, the name of the generated output is : first-in_alphabetical-order_{number_of_chunks}
             * example : joy-all-critical_3.js
             * So instead of having joy-availability_3.js (bit confusing), we've created a fake component called joy-critical...
             * and TADAAA
             */
            components: ['joy-all-critical', 'joy-checkbox', 'joy-textarea'],
        },
    ],
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
    plugins: [sass({
        includePaths: [path.resolve('node_modules')]
    })],
    extras: polyfills,
};
