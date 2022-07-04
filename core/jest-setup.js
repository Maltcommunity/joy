const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customSnapshotIdentifier: ({currentTestName}) => {
        const arrayFromTestName = currentTestName.split(' ');
        return arrayFromTestName.join('-').toLowerCase();
    },
    customDiffConfig: {
        threshold: 0.2,
        failureThresholdType: 'pixel',
        dumpDiffToConsole: true
    },
});

expect.extend({toMatchImageSnapshot})