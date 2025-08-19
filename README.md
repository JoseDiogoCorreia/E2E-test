# Run E2E tests for frontend global locally

## Get started

1. Install dependencies: `npm ci`

2. Set your environment by creating a `.env` file based on `.env.example` (if you're running against local be sure to use `http` instead of `https`)

3. Run tests: `npm run test`
   - Run tests with tag @only: `npm run test:@only`

## Tips for debugging - Add screenshot to the report in different steps/functions

1. Add an AfterStep in "hooks.ts" with Screenshot to see frontend in that position:

   ```typescript
   AfterStep(async function (this: any) {
     await takeScreenshot(context.page, this.attach);
   });
   ```

2. Take a screenshot inside certain function (PS: function must be an "async function"):
   ```typescript
   await takeScreenshot(context.page, this.attach);
   ```
