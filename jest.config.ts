import type { JestConfigWithTsJest } from "ts-jest";
import { defaults as tsjPreset } from "ts-jest/presets";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: "node",
  transform: { ...tsjPreset.transform },
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePathIgnorePatterns: ["build/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/handler/**/*.ts", "src/helper/**/*.ts"],
  coverageReporters: ["text", "text-summary", "lcov"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};

export default jestConfig;
