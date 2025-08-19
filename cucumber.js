module.exports = {
  default: {
    parallel: 1,
    dryRun: false,
    require: [
      'tsconfig.json',
      'src/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    runFeatures: ['src/features/*.feature'],
    paths: ['src/features/*.feature'],
    requireModule: ['ts-node/register'],
    timeout: 60000 // Increase timeout to 60 seconds
  },
  only: {
    parallel: 1,
    dryRun: false,
    require: [
      'tsconfig.json',
      'src/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    runFeatures: ['src/features/*.feature'],
    paths: ['src/features/*.feature'],
    requireModule: ['ts-node/register'],
    timeout: 60000, // Increase timeout to 60 seconds
    tags: '@only' // Add this line to run only scenarios with @only tag
  }
};
