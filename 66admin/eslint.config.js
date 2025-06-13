import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig,globalIgnores } from "eslint/config";


export default defineConfig([
  pluginVue.configs["flat/essential"],
  { files: ["**/*.{js,mjs,cjs,vue}"], plugins: { js }, extends: ["js/recommended"],
    rules: {
      'vue/no-mutating-props':'warn',
      'no-empty': 'off',
      "no-unused-vars": "warn",
      "no-undef": "warn",
      'no-console': 0,
      'no-use-before-define': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn',
      'no-prototype-builtins': 'off',
      'no-irregular-whitespace': 'off',
      'space-before-function-paren': 'off',
      'vue/custom-event-name-casing': 'off',
      'vue/attributes-order': 'off',
      'vue/one-component-per-file': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-unused-components': 'warn',
      'vue/no-setup-props-destructure': 'off',
      'vue/script-setup-uses-vars': 'off',
    },

  },
  { files: ["**/*.{js,mjs,cjs,vue}"], languageOptions: { globals: {...globals.browser, ...globals.node} } },
  globalIgnores([
		"node_modules/**", // ignore its content
    "dist/**", // ignore its content
	]),
]);
