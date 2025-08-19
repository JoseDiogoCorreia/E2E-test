import Chance from 'chance';
import { getHumanReadableTimestamp } from './timestamp';

const chance = new Chance();

export type TestUser = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

function cleanEmailPart(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
}

export const generateTestUser = (): TestUser => {
  const timestamp = getHumanReadableTimestamp();
  const firstName = chance.first();
  const lastName = chance.last();

  const email = `${cleanEmailPart(firstName.toLowerCase())}.${cleanEmailPart(lastName.toLowerCase())}.${timestamp}@test.ssr.ciam.pmi.com`;
  const phoneNumber = `7${timestamp.replace(/[^0-9]/g, '').slice(-9)}`;

  return {
    firstName,
    lastName,
    email,
    phoneNumber,
  };
};
