import {
    ProjectsFetchResponse,
    StackElementsFetchResponse
} from "@/application/api-handlers/personal-github/responses.dto";

/**
 * Request the projects
 * @returns ProjectsFetchResponse Fetched projects
 */
export async function requestProjects(): Promise<ProjectsFetchResponse> {
    const result: Response = await fetch(process.env.NEXT_PUBLIC_PERSONAL_PROJECTS_FETCH_LINK!)

    return await result.json() as ProjectsFetchResponse
}

/**
 * Request the technical stack
 * @returns StackElementsFetchResponse Fetched stack elements
 */
export async function requestTechnicalStackElements(): Promise<StackElementsFetchResponse> {
    const result: Response = await fetch(process.env.NEXT_PUBLIC_PERSONAL_TECHNICAL_STACK_LINK!)

    return await result.json() as StackElementsFetchResponse
}
