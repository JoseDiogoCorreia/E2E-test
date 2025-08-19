import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { context } from "../cucumber/hooks";
import { config } from "../cucumber/config";

Given("The example iframe page", async () => {
  await context.page.goto(
    `${config.baseURL}/assets/integration/example/index.html`
  );
});

When("I Load SSR through iframe", async () => {
  // if SSR object exists, it's because iframe loaded correctly
  expect(await context.page.evaluateHandle("window.SSR")).toBeTruthy();
});

Then("I should see SSR working as expected", async () => {
  const ssrIframe = context.page.frame("ssr-iframe");

  if (!ssrIframe) {
    throw new Error("Could not find iframe");
  }
});
