export default function (): void {
    const currentScript = import.meta; // For JS Modules
    const currentScriptUrl = currentScript.url;
    const parts = currentScriptUrl.split('/');
    /**
     * Here the aim is to auto-load the svg-sprite file that is actually included in the build.
     *  https://our-cdn/assets/wc/build/the-script.js
     *  Returns https://our-cdn/assets/wc/assets/icons-sprite.svg
     *  Please see configuration and "copy" parts in outputTargets
     */
    const dsEntryPath = parts.slice(0, parts.length - 2);
    const svgSprite = dsEntryPath.join('/') + '/assets/icons-sprite.svg';

    fetch(svgSprite, {
        method: 'GET',
        // headers,
        mode: 'cors',
        cache: 'default'
    })
        .then((content) => content.text())
        .then((svgResponse) => {
            const doc = new DOMParser();
            const xml = doc.parseFromString(svgResponse, 'image/svg+xml');
            const svg = xml.querySelector('svg');

            if (!svg) {
                return console.warn(`Missing svg element in ${svgSprite}. Unable to load svg icons library.`);
            }

            document.body.appendChild(svg);
        });
}