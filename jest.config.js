/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/tmp/jest_rs",

  // Automatically clear mock calls and instances between every test
  // clearMocks: false,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "dist/src/**/*.{js,jsx,ts,tsx}",
      "!<rootDir>/node_modules/"
  ],

  // transform: tsjPreset.transform,
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  // },
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "<rootDir>/src/*/I[A-z]*.{js,ts}",
    "<rootDir>/node_modules/",
    "<rootDir>/.eslintrc.json",
    "<rootDir>/src/command.{js,ts}",
    "<rootDir>/src/Infrastructure/Notifications/*.{js,ts}",
    "<rootDir>/src/Auth/Presentation/Commands/*.{js,ts}",
    "<rootDir>/src/FileVersion/Infrastructure/Repositories/FileVersionTypeORMRepository.{js,ts}",
    "<rootDir>/src/File/Infrastructure/Repositories/FileTypeORMRepository.{js,ts}",
    "<rootDir>/src/Auth/Infrastructure/Repositories/UserTypeORMRepository.{js,ts}",
    "<rootDir>/src/Auth/Infrastructure/Repositories/RoleTypeORMRepository.{js,ts}",
    "<rootDir>/src/Auth/Infrastructure/Repositories/TokenRedisRepository.{js,ts}",
    "<rootDir>/src/Item/Infrastructure/Repositories/ItemTypeORMRepository.{js,ts}",
    "<rootDir>/src/Shared/Infrastructure/Database/CreateMikroORMConnection.{js,ts}",
    "<rootDir>/src/Shared/Infrastructure/Database/CreateTypeORMConnection.{js,ts}",
    "<rootDir>/src/Shared/Infrastructure/Orm/MikroORMPaginator.{js,ts}",
    "<rootDir>/src/Shared/Events/*.{js,ts}",
    "<rootDir>/src/*/*.{js,ts}",
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json",
    "text",
    "html"
  ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: '40',
      functions: '40',
      lines: '40',
      statements: '40'
    }
  },

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: false,

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // "globals": {
  //     "ts-jest": {
  //       "babelConfig": true,
  //       "tsconfig": "jest.tsconfig.json"
  //     }
  //   },

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  maxWorkers: "70%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "node"
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./dist/src/Tests/__mocks__/mocks.js",
      "\\.(css|less)$": "./dist/src/Tests/__mocks__/mocks.js"
  },

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  preset: "@shelf/jest-mongodb",

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: "./dist/src/Tests",

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/dist/src"
  ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [
      'dotenv/config'
  ],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: ['./dist/src/Tests/setup.js'],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/Tests/**/*.(spec|test).[j]s?(x)",
  //   "**/?(*.)+(spec|test).[j]s?(x)"
  // ],

  testRegex: '((\\.|/)(spec))\\.js?$',

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jasmine2",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // A map from regular expressions to paths to transformers
  // transform: {
  //     "^.+\\.ts?$": "ts-jest"
  // },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  testTimeout: 16000,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  watchPathIgnorePatterns: ['globalConfig'],

  // Whether to use watchman for file crawling
  // watchman: true,
};
