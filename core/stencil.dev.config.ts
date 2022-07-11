import {Config} from '@stencil/core';
import {config as baseConfig} from './stencil.config';

export const config: Config = {
    ...baseConfig,
    globalStyle: './playground/style/_index.scss',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
        {
            type: 'stats',
            file: './www/joy-stats.json',
        },
    ],
};