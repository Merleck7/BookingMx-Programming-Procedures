export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: ["js"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["js/**/*.js"],
};
