/**
 * Jest Configuration File
 * -----------------------
 * This file sets up Jest to run JavaScript unit tests in a browser-like
 * environment using JSDOM and Babel.
 *
 * Key configurations:
 *  - testEnvironment: Simulates browser APIs (DOM).
 *  - transform: Uses Babel to support ES modules.
 *  - coverageDirectory: Output folder for coverage reports.
 *  - collectCoverageFrom: Specifies which frontend files are included.
 */

export default {
  // Simulated browser environment for DOM-based tests
  testEnvironment: "jest-environment-jsdom",

  // Babel transformation for ES6+ modules
  transform: {
    "^.+\\.js$": "babel-jest"
  },

  // Supported file types
  moduleFileExtensions: ["js"],

  // Output folder for coverage reports
  coverageDirectory: "coverage",

  // Files included in coverage calculations
  collectCoverageFrom: ["js/**/*.js"],
};
