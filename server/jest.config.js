const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  preset: "ts-jest",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.{ts,tsx}",
    "!src/**/types.{ts,tsx}",
    "!src/**/test.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageThreshold:{
    global:{
      branches:10,
      functions:10,
      lines:10,
      statements:10
    }
  }
};
