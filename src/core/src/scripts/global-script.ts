import svgSprite from './../components/icon/assets/icons-sprite.svg?format=text';

export default function (): void {
    /**
    * Here the aim is to auto-load in the DOM the svg-sprite file that is actually included in the build.
    */
    const doc = new DOMParser();
    const xml = doc.parseFromString(svgSprite, 'image/svg+xml');
    const svg = xml.querySelector('svg');
    if (!svg) {
        return console.warn('Unable to find svg selector. Please check @maltjoy project contains a valid svg sprite file.');
    }

    const svgWrapper = document.createElement('div');
    svgWrapper.id = 'svg-icons-list';
    svgWrapper.appendChild(svg);

    document.body.insertBefore(svgWrapper, document.body.firstChild);
}