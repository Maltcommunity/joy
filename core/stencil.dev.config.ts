import {Config} from '@stencil/core';
import {config as baseConfig} from './stencil.config';

export const config: Config = {
    ...baseConfig,
    globalStyle: './playground/style/_index.scss',
    outputTargets: [
        {
            type: 'www',
            empty: false, // to prevent playground compiled css (by sass CLI) to be overriden
            serviceWorker: null, // disable service workers
        },
        {
            type: 'stats',
            file: './www/joy-stats.json',
        },
        { 
            type: 'docs-vscode',
            file: './www/vscode-data.json',
        }
    ],
};