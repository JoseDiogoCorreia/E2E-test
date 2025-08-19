import { config as dotenv } from "dotenv";
import { generateTestUser, TestUser } from '../utils/test-data';

dotenv();

export { generateTestUser, TestUser };

export const config = {
  device: process.env.DEVICE,
  headless: process.env.HEADLESS === "true",
  baseURL: process.env.SSR_GLOBAL_HOST,
};