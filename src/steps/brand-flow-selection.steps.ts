import { When, Then } from '@cucumber/cucumber';
import { context } from '../cucumber/hooks';
import { clickButtonById, expectElementById } from './utils';
import {
  registerAccountFlowId,
  registerDeviceFlowId,
  brandSelectionIQOSId,
  brandSelectionVEEVId,
  iQOSlandingPageTitleId,
  vEEVLandingPageTitleId
} from '../page-objects/elements';

When('I select the flow {string}', async function (flowSelection: string) {
  if (flowSelection !== 'NA') {
    const flowId = flowSelection === 'account' ? registerAccountFlowId : registerDeviceFlowId;
    await clickButtonById(context.page, flowId);
  }
});

When('I select the brand {string}', async function (brandSelection: string) {
  if (brandSelection !== 'NA') {
    const brandId = brandSelection === 'IQOS' ? brandSelectionIQOSId : brandSelectionVEEVId;
    await clickButtonById(context.page, brandId);
  }
});

Then('I should see the landing page of {string}', async function (landingPage: string) {
    if (landingPage !== 'NA') {
        const landingPageTitleId = landingPage === 'IQOS' ? iQOSlandingPageTitleId : vEEVLandingPageTitleId;
        await expectElementById(context.page, landingPageTitleId);
    }
});
