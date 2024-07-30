import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { ignores: ["**/node_modules/", "**build/"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-unused-vars": "error",
      "arrow-body-style": "error",
      "quotes": [2, "double"]
    }
  }
];