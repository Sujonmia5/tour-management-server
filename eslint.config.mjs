// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",
    },
  },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "warn",
      "prefer-const": ["warn", { ignoreReadBeforeAssign: true }],
      "no-undef": "warn",
      "no-console": "warn",
    },
  },
);
