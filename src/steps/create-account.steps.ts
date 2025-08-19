import {Then, When} from '@cucumber/cucumber';
import { context } from '../cucumber/hooks';
import {fillInputById, clickButtonById} from './utils';
import { generateTestUser } from '../cucumber/config';
import {
  firstNameFieldId,
  lastNameFieldId,
  termsAndConditionsCheckboxId,
  privacyPolicyCheckboxId,
  marketingOptInCheckboxId, emailInputId, phoneInputId
} from '../page-objects/elements';

let otpCode: string;

When('I create an account for {string}', async (loginType) => {
  const user = generateTestUser();
  context.testUser = user;

  await context.page.fill(`#${firstNameFieldId}`, user.firstName);
  await context.page.fill(`#${lastNameFieldId}`, user.lastName);

  if (loginType === 'email' || loginType === 'both') {
    await context.page.fill(`#${phoneInputId}`, user.phoneNumber);
  }
  if (loginType === 'phone' || loginType === 'both') {
    await context.page.fill(`#${emailInputId}`, user.email);
  }

  // Check the required checkboxes
  await context.page.check(`#${termsAndConditionsCheckboxId}`);
  await context.page.check(`#${privacyPolicyCheckboxId}`);
  await context.page.check(`#${marketingOptInCheckboxId}`);

  // Click the Continue button
  await context.page.click('button:has-text("Continue")');
});