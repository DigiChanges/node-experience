/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "dist/src/**/*.{js,jsx,ts,tsx}",
      "!<rootDir>/node_modules/",
      "!dist/src/Auth/**/*.{js,ts}",
      "!dist/src/Config/**/*.{js,ts}",
      "!dist/src/initTestServer.{js,ts}",
      "!dist/src/**/*.d.ts",
      "!dist/src/**/*.d.ts.map",
      "!dist/src/register.{js,ts}",
      "!dist/src/seed.{js,ts}",
      "!dist/src/exceptions.{js,ts}",
      "!dist/src/crons.{js,ts}",
      "!dist/src/command.{js,ts}",
      "!dist/src/index.{js,ts}",
      "!dist/src/worker.{js,ts}",
      "!dist/src/closed.{js,ts}",
      "!dist/src/initCommand.{js,ts}",
      "!dist/src/**/I*.{js,ts}",
      "!dist/src/**/Infrastructure/Notifications/*.{js,ts}",
      "!dist/src/**/*Mikro*.{js,ts}",
      "!dist/src/Shared/**/*.{js,ts}",
      "!dist/src/Notification/**/*.{js,ts}",
      "!dist/src/Main/Infrastructure/Crons/*.{js,ts}",
      "!dist/src/Main/Infrastructure/Factories/*.{js,ts}",
      "!dist/src/Main/Infrastructure/Repositories/RedisCacheDataAccess.{js,ts}",
      "!dist/src/Main/Infrastructure/Repositories/CacheRepository.{js,ts}",
      "!dist/src/Main/Infrastructure/Repositories/RedisCacheRepository.{js,ts}",
      "!dist/src/Main/Infrastructure/Repositories/BaseMongooseRepository.{js,ts}",
      "!dist/src/Main/Infrastructure/Orm/MongooseAggregatePaginator.{js,ts}",
      "!dist/src/Main/Infrastructure/Filesystem/MinioStrategy.{js,ts}",
      "!dist/src/Main/Infrastructure/UseCases/SyncDbUseCase.{js,ts}",
      "!dist/src/**/*Command*.{js,ts}",
      "!dist/src/**/*Document.{js,ts}",
      "!dist/src/**/Tests/*.{js,ts}",
      "!dist/src/**/*Payload.{js,ts}",
      "!dist/src/**/MainConfig.{js,ts}",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.eslintrc.json",
  ],
  coverageProvider: "babel",
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "html"
  ],
  coverageThreshold: {
    global: {
      statements: '75',
      branches: '50',
      functions: '50',
      lines: '75',
    }
  },
  errorOnDeprecated: false,
  maxWorkers: "70%",
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "node"
  ],
  moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./dist/src/Tests/__mocks__/mocks.js",
      "\\.(css|less)$": "./dist/src/Tests/__mocks__/mocks.js"
  },
  preset: "@shelf/jest-mongodb",
  roots: [
    "./dist/src"
  ],
  testEnvironment: "node",
  testRegex: '((\\.|/)(spec))\\.js?$',
  verbose: true,
  testTimeout: 16000,
  watchPathIgnorePatterns: ['globalConfig'],
};
