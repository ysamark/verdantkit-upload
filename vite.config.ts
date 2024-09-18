import path from "node:path";

import { pathsToModuleAliases } from "tsconfig-paths-to-module-name-mapper";
import { AliasOptions } from "vite";
import { defineConfig } from "vitest/config";

import { compilerOptions } from "./tsconfig.json";

const pathAliases = pathsToModuleAliases(compilerOptions.paths, {
  prefix: path.resolve(__dirname, compilerOptions.baseUrl),
});

export default defineConfig({
  test: {
    alias: pathAliases as AliasOptions,
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    setupFiles: ["./tests/setup.ts"],
    browser: {
      name: "chrome",
      enabled: true,
      headless: true,
      provider: "webdriverio",
    },
    env: {
      API_CLIENT_ID: "MyAPIClientId",
      API_SECRET_KEY: "MyAPISecretKey",
    },
    coverage: {
      enabled: true,
      provider: "istanbul",
    },
    environmentMatchGlobs: [
      ["src/**/*.test.ts", "node"],
      ["src/**/*.spec.ts", "happy-dom"],
    ],
  },
});
