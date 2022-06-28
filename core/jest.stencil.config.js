// Here we use core Stencil preset, but we override rootDir in order to execute spec files only in our webcomponents folder
// In this way we can dissociate our "legacy" spec and new ones, without too much tooling

module.exports = {
    preset: '@stencil/core/testing',
    testRunner: 'jest-jasmine2',
    // Enable using pure js files for specs
    transform: {
        '^.+\\.(js|ts|tsx|jsx|css)$': '@stencil/core/testing/jest-preprocessor.js',
    },
};
