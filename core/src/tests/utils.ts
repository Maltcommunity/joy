import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {Page as PuppeteerPage} from 'puppeteer';
import { NewE2EPageOptions } from '@stencil/core/testing/puppeteer/puppeteer-declarations';

export type CustomE2EPage = E2EPage & Pick<PuppeteerPage, 'screenshot'>

export async function createPage(opts?: NewE2EPageOptions) {
    const page = (await newE2EPage(opts)) as CustomE2EPage;
    await page.setViewport({
        height: 600,
        width: 1000,
    });
    return page;
}