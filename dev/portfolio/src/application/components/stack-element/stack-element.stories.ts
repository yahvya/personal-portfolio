import {StackElement} from "@/application/components/stack-element/stack-element"
import {Meta, StoryObj} from "@storybook/react"
import jsImage from "@/application/components/stack-element/stories-assets/js.jpg"

type StackElementStory = StoryObj<typeof StackElement>

const meta: Meta = {
    title: "UI/Stack element",
    component: StackElement,
    argTypes: {
        elementImageUrl: {control: "file"}
    }
}

export default meta

// stories

export const AnimatedVersion: StackElementStory = {
    args: {
        text: "Javascript",
        elementImageUrl: jsImage.src,
        animate: true
    }
}

export const UnAnimatedVersion: StackElementStory = {
    args: {
        text: "Javascript",
        elementImageUrl: jsImage.src,
        animate: false
    }
}
