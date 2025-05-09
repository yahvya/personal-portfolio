import {Meta, StoryObj} from "@storybook/react"
import {MouseScroll} from "@/application/components/mouse-scroll/mouse-scroll";

type MouseScrollStory = StoryObj<typeof MouseScroll>

const meta: Meta = {
    title: "UI/Mouse scroll",
    component: MouseScroll
}

export default meta

// stories

export const NotAnimatedVersion: MouseScrollStory = {
    args: {
        appearAnim: false
    }
}

export const AnimatedVersion: MouseScrollStory = {
    args: {
        appearAnim: true
    }
}

