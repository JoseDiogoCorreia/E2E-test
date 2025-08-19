import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { config } from "../cucumber/config";
import { context } from "../cucumber/hooks";
import { expectElementById, fillInputById, clickButtonById } from "./utils";
import {
  welcomeSAGId,
  dayInputId,
  monthInputId,
  yearInputId,
  submitSAGId,
  brandSelectionAreaId,
  flowSelectionAreaId,
  createAccountTitleId,
  gavsUiTitleId,
  underAgeSAGPageId,
} from "../page-objects/elements";

// Set default timeout for steps
setDefaultTimeout(60000);

Given("I open the global frontend for {string} with retailerId {string}", async (marketCode: string, retailerId: string) => {
  context.browser = await chromium.launch({ headless: config.headless });
  const browserContext = await context.browser.newContext();
  context.page = await browserContext.newPage();

  let url = `${config.baseURL}/${marketCode}/en?coach=coach&campaign=camp`;
  if (retailerId !== 'NA') {
    url += `&retailer=${retailerId}`;
  }

  await context.page.goto(url);

  // Check if the SAG page is visible
  await expectElementById(context.page, welcomeSAGId);
});


When("I input the date {string} and submit", async (date: string) => {
  const [day, month, year] = date.split("/");
  await fillInputById(context.page, dayInputId, day);
  await fillInputById(context.page, monthInputId, month);
  await fillInputById(context.page, yearInputId, year);
  await clickButtonById(context.page, submitSAGId);
});

Then("I should see the {string} page", async (nextPageType: string) => {
  if (nextPageType === "brand") {
    await expectElementById(context.page, brandSelectionAreaId);
  } else if (nextPageType === "flow") {
    await expectElementById(context.page, flowSelectionAreaId);
  } else if (nextPageType === "Create Account") {
    await expectElementById(context.page, createAccountTitleId);
  } else if (nextPageType === "Age Verification") {
    await expectElementById(context.page, gavsUiTitleId);
  } else if (nextPageType === "underAge") {
    await expectElementById(context.page, underAgeSAGPageId);
 }
});
