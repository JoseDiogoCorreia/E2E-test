import { When, Then } from '@cucumber/cucumber';
import { context } from '../cucumber/hooks';
import { fillInputById, clickButtonById, requestOtpCode } from './utils';
import { generateTestUser } from '../cucumber/config';
import {
  emailAddressTitleId,
  emailAddressInputId,
  phoneNumberTitleId,
  phoneNumberInputId,
  submitButtonId,
  resendOtpButtonId,
} from '../page-objects/elements';

let otpCode: string;

When('I input the test user {string} and submit', async (loginType: string) => {
  const user = generateTestUser();
  context.testUser = user;

  if (loginType === 'email') {
    await clickButtonById(context.page, emailAddressTitleId);
    await fillInputById(context.page, emailAddressInputId, user.email);
    await context.page.waitForTimeout(5000);
  } else if (loginType === 'phone') {
    await clickButtonById(context.page, phoneNumberTitleId);
    await fillInputById(context.page, phoneNumberInputId, user.phoneNumber);
  } else {
    throw new Error(`Unsupported channel: ${loginType}`);
  }

  otpCode = await requestOtpCode(context.page, submitButtonId);
});

When('I wait 60 sec and ask for a new otp code', {timeout : 120 * 1000}, async () => {
  otpCode = await requestOtpCode(context.page, resendOtpButtonId, 60000);
});

When('I enter the {string} OTP code', async (_loginType: string) => {
  await fillInputById(context.page, 'OTP', otpCode);
  await clickButtonById(context.page, 'submit-otp-code');
});

Then('I am redirected to the Create Account page', async () => {
  await context.page.waitForURL('**/create-account');
});
