import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.{js,ts,jsx,tsx,mjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "quotes": ["warn", "double"],
            "arrow-parens": ["warn", "always"],
            "semi": ["error", "never"],
            "max-len": "off",
            "indent": ["warn", 4],
            "comma-dangle": ["warn", "never"]
        }
    }
];

export default eslintConfig;
