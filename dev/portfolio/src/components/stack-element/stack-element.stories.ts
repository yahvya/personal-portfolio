import StackElement from "@/components/stack-element/stack-element"
import {Meta, StoryObj} from "@storybook/react"
import jsImage from "stories-assets/js.jpg"

type StackElementStory = StoryObj<typeof StackElement>

const meta: Meta = {
    title: "Stack element",
    component: StackElement
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
