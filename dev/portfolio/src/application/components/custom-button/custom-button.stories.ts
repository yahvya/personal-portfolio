import {Meta, StoryObj} from "@storybook/react"
import {CustomButton} from "@/application/components/custom-button/custom-button"
import googleMeetImage from "./stories-assets/google-meet.png"

type CustomButtonStory = StoryObj<typeof CustomButton>

const meta: Meta = {
    title: "UI/Custom button",
    component: CustomButton,
    argTypes: {
        iconImageLink: {context: "file"}
    }
}

export default meta

// stories

export const DefaultButton: CustomButtonStory = {
    args: {
        buttonText: "Envoyer",
        buttonCustomDescriptors: {}
    }
}

export const IconButton: CustomButtonStory = {
    args: {
        buttonText: "Prévoir un meet",
        iconImageLink: googleMeetImage.src,
        buttonCustomDescriptors: {}
    }
}
