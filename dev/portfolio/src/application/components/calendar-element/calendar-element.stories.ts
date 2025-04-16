import {Meta, StoryObj} from "@storybook/react"
import {CalendarElement} from "@/application/components/calendar-element/calendar-element";

type CalendarElementStory = StoryObj<typeof CalendarElement>

const meta: Meta = {
    title: "UI/Calendar element",
    component: CalendarElement,
    argTypes: {
        onSelect: {context: "object"}
    }
}

export default meta

// stories

export const NotSelectedElement: CalendarElementStory = {
    args: {
        dayNumber: 12,
        selected: false,
        onSelect: (): void => console.log("not selected")
    }
}

export const SelectedElement: CalendarElementStory = {
    args: {
        dayNumber: 30,
        selected: true,
        onSelect: (): void => console.log("selected")
    }
}
