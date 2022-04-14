import {validateContent} from './validate';

export const joyIconContent = new Map<string, string>();
const requests = new Map<string, Promise<string | void>>();

export const getSvgContent = (url: string, sanitize: boolean): Promise<string | void> => {
    // see if we already have a request for this url
    let req = requests.get(url);

    if (!req) {
        if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
            // we don't already have a request
            req = fetch(url).then((rsp) => {
                if (rsp.ok) {
                    return rsp.text().then((svgContent) => {
                        if (svgContent && sanitize !== false) {
                            svgContent = validateContent(svgContent);
                        }
                        joyIconContent.set(url, svgContent || '');
                    });
                }
                joyIconContent.set(url, '');
            });

            // cache for the same requests
            requests.set(url, req);
        } else {
            // set to empty for ssr scenarios and resolve promise
            joyIconContent.set(url, '');
            return Promise.resolve();
        }
    }

    return req;
};
