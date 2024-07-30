import { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  testMatch: ["**/**/**/*.test.ts"],
  setupFiles: ["<rootDir>/setEnvVars.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["lcov", "text", "text-summary"],
  /* coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  }, */
  reporters: ["default", ["jest-junit", { outputDirectory: "coverage/junit" }]],
};

export default config;
