import type {Preview} from "@storybook/react";
import "../src/app/global.scss";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            test: "todo",
        },
    },
};

export default preview;
