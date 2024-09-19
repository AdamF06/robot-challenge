/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest"

const config: Config = {
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The test environment that will be used for testing
  testEnvironment: "node",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/tests"],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],

  moduleNameMapper: {
    "^consts/(.*)$": "<rootDir>/src/consts/$1",
    "^models/(.*)$": "<rootDir>/src/models/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^commands/(.*)$": "<rootDir>/src/commands/$1",
  },
}

export default config
