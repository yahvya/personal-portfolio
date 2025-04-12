import type {StorybookConfig} from "@storybook/experimental-nextjs-vite";

const config: StorybookConfig = {
    "stories": [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@chromatic-com/storybook",
        "@storybook/experimental-addon-test",
        "@storybook/addon-a11y"
    ],
    "framework": {
        "name": "@storybook/experimental-nextjs-vite",
        "options": {}
    },
    "staticDirs": [
        "..\\public"
    ]
};
export default config;
