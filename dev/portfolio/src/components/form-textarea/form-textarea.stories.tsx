import {Meta, StoryObj} from "@storybook/react"
import {FormTextarea} from "@/components/form-textarea/form-textarea"
import React, {useRef} from "react"

type FormTextareaStory = StoryObj<typeof FormTextarea>

const meta: Meta = {
    title: "UI/Form textarea",
    component: FormTextarea
}

export default meta

// stories

export const DefaultArea: FormTextareaStory = {
    args: {
        placeholder: "Contenu de votre message",
        customDescriptors: {}
    },
    render: (args): React.ReactElement => {
        return (
            <FormTextarea
                {...args}
                textareaRef={useRef(null)}
            />
        )
    }
}
