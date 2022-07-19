const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customSnapshotIdentifier: (params) => {
        const arrayFromTestName = params.currentTestName.split(' ');
        return arrayFromTestName
            .join('-')
            .replace(/["',]/gm, '')
            .toLowerCase() +  '--' + params.counter
    },
    customDiffConfig: {
        threshold: 0.2,
        failureThresholdType: 'pixel',
        dumpDiffToConsole: true
    },
});

expect.extend({toMatchImageSnapshot})