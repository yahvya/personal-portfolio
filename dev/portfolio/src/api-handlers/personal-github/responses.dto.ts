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
 * Projects fetch response
 */
export type ProjectsFetchResponse = ProjectDescriptor[]
