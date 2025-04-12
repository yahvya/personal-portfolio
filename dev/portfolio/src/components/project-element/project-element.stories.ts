import {Meta, StoryObj} from "@storybook/react"
import {ProjectElement} from "@/components/project-element/project-element"
import projectImage from "./stories-assets/project-image.png"

type ProjectElementStory = StoryObj<typeof ProjectElement>

const meta: Meta = {
    title: "UI/Project element",
    component: ProjectElement,
    argTypes: {
        imageLink: {control: "file"}
    }
}

export default meta

// stories

export const DefaultProjectElement: ProjectElementStory = {
    args: {
        index: 1,
        projectName: "Portfolio",
        technologies: [ "NextJs", "Storybook", "Make" ],
        imageLink: projectImage.src,
        onClickHandler: (): void => console.log("click sur la div")
    }
}
