import {h} from '@stencil/core';
import {newSpecPage} from '@stencil/core/testing';
import {CounterComponent} from './counter';

async function increment(instance: HTMLJoyCounterElement, times = 1) {
    const increments = [...Array(times)].map(async () => await instance.increment());

    return Promise.all(increments);
}

async function decrement(instance: HTMLJoyCounterElement, times = 1) {
    const increments = [...Array(times)].map(async () => await instance.decrement());

    return Promise.all(increments);
}

describe('Counter step testing', () => {
    it('should increment/decrement the value with step at 10', async () => {
        const page = await newSpecPage({
            components: [CounterComponent],
            template: () => <joy-counter step={10}></joy-counter>,
        });

        await increment(page.rootInstance);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(10);

        await increment(page.rootInstance, 3);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(40);

        await decrement(page.rootInstance, 3);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(10);
    });

    it('should increment/decrement the value with step at 0.2', async () => {
        const page = await newSpecPage({
            components: [CounterComponent],
            template: () => <joy-counter value={10} step={0.2}></joy-counter>,
        });

        await increment(page.rootInstance);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(10.2);

        await increment(page.rootInstance, 3);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(10.8);

        await decrement(page.rootInstance, 3);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(10.2);
    });

    it('should increment/decrement the value with step at 0.05', async () => {
        const page = await newSpecPage({
            components: [CounterComponent],
            template: () => <joy-counter value={10} step={0.05}></joy-counter>,
        });

        await increment(page.rootInstance);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(10.05);

        await increment(page.rootInstance, 3);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(10.2);

        await decrement(page.rootInstance, 3);
        await page.waitForChanges();
        expect(page.rootInstance.value).toBe(10.05);
    });
});
