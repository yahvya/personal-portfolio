import {Meta, StoryObj} from "@storybook/react"
import {CalendarDayChoice} from "@/components/calendar-day-choice/calendar-day-choice"

type CalendarDayChoiceStory = StoryObj<typeof CalendarDayChoice>

const meta: Meta = {
    title: "UI/Calendar day choice",
    component: CalendarDayChoice,
    argTypes: {
        onSelect: {context: "object"}
    }
}

export default meta

// stories

export const NotSelectedDayChoice: CalendarDayChoiceStory = {
    args: {
        startTimeText: "8h30",
        endTimeText: "9H",
        selected: false,
        onSelect: () => console.log("not selected")
    }
}

export const SelectedDayChoice: CalendarDayChoiceStory = {
    args: {
        startTimeText: "8h",
        endTimeText: "9H",
        selected: true,
        onSelect: () => console.log("selected")
    }
}

