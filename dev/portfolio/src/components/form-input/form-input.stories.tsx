import {FormInput} from "@/components/form-input/form-input"
import {Meta, StoryObj} from "@storybook/react"
import envelopeImage from "./stories-assets/envelope.png"
import {useRef} from "react"

type FormInputStory = StoryObj<typeof FormInput>

const meta: Meta = {
    title: "UI/Form input",
    component: FormInput,
    argTypes: {
        iconImageLink: {control: "file"}
    }
}

export default meta

// stories

export const DefaultInput: FormInputStory = {
    args: {
        inputPlaceholder: "Entrez votre email",
        iconImageLink: envelopeImage.src
    },
    render: (args) => {
        return (
            <FormInput
                {...args}
                controlRef={useRef<HTMLInputElement>(null)}
            />
        )
    }
}
