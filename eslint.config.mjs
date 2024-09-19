import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import jest from "eslint-plugin-jest"

export default [
  { ignores: ["dist/", ".idea/"] }, // node_modules is auo-ignored
  { files: ["src/**/*.{js,mjs,cjs,ts}", "tests/**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["tests/**/*.{js,ts,jsx,tsx}"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]
