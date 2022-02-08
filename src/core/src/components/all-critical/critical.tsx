import {Component, h} from '@stencil/core';

@Component({
    tag: 'joy-all-critical',
})
export class Critical {
    render() {
        return ('This component is not meant to be used.');
    }
}
