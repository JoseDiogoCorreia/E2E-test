import {After, AfterStep, Before, Status} from '@cucumber/cucumber';
import {Page, Browser, chromium} from 'playwright';
import {takeScreenshot} from '../steps/utils';
import { generateTestUser } from '../utils/test-data';

interface TestContext {
    page: Page;
    browser: Browser;
    testUser?: ReturnType<typeof generateTestUser>;
}

const context: TestContext = {} as TestContext;

Before(async function () {
    context.browser = await chromium.launch();
    context.page = await context.browser.newPage();
});

After(async function (scenario) {
    if (scenario.result && scenario.result.status === Status.FAILED) {
        await takeScreenshot(context.page, this.attach);
    }
    await context.browser.close();
});

/*AfterStep(async function (this: any) {
  await takeScreenshot(context.page, this.attach);
});
*/

export {context};
