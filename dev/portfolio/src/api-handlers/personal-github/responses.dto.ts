/**
 * A project data format
 */
export type ProjectDescriptor = {
    projectName: string
    technologies: string[]
    previewImageLink: string
    projectImagesLinks: string[]
    tasks: string[]
    projectHtmlDescription: string
    visitLink: string | null
    year: number
}

/**
 * A stack element data format
 */
export type StackElementDescriptor = {
    image: string
    text: string
}

export type ProjectsFetchResponse = ProjectDescriptor[]
export type StackElementsFetchResponse = StackElementDescriptor[]
