import { E2EPage, newE2EPage } from '@stencil/core/testing';
import {Page as PuppeteerPage} from 'puppeteer';
import { NewE2EPageOptions } from '@stencil/core/testing/puppeteer/puppeteer-declarations';

export type CustomE2EPage = E2EPage & Pick<PuppeteerPage, 'screenshot'>

export async function createPage(opts?: NewE2EPageOptions) {
    const page = (await newE2EPage(opts)) as CustomE2EPage;
    await page.addStyleTag({content: 'body{font-family: Moderat,Arial,Helvetica,sans-serif;}'})
    await page.evaluateHandle(() => (document as any).fonts.ready);
    await page.setViewport({
        height: 600,
        width: 1000,
    });
    return page;
}

export async function setPageContent(page: CustomE2EPage, html: string) {
    await page.setContent(html, { waitUntil: 'networkidle0' });
    return page;
}