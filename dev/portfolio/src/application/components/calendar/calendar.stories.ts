import {StoryObj} from "@storybook/react"
import {AvailabilityMap, Calendar} from "@/application/components/calendar/calendar"
import {Meta} from "@storybook/react"

type CalenderStory = StoryObj<typeof Calendar>

const meta: Meta = {
    title: "UI/Calendar",
    component: Calendar
}

export default meta

// stories

export const DefaultCalendar: CalenderStory = {
    args: {
        startMonth: 4,
        year: 2025,
        availabilityGetter: async (selectedMonth: number): Promise<AvailabilityMap> => {
            console.log(selectedMonth)
            return {
                1: [
                    {start: "8H", end: "10H"},
                    {start: "12H", end: "14H"},
                ]
            }
        },
        onAvailabilityChosen: () => console.log("availability chosen")
    }
}
