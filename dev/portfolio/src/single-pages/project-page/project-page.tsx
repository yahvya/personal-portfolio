import "./project-page.scss"
import React, {useEffect, useState} from "react"
import {useQuery} from "react-query"
import {ProjectElement} from "@/components/project-element/project-element"
import {ReactTyped} from "react-typed";
import {typingConfig} from "@/single-pages/project-page/config"
import {motion} from "motion/react"
import classNames from "classnames";

/**
 * Project description
 */
interface ProjectDescriptor {
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
 * Show project details
 * @param project Project details
 * @constructor
 */
function ProjectDetailsPage(
    {
        project,
        onExit
    }:
    {
        project: ProjectDescriptor,
        onExit: (project: ProjectDescriptor) => void
    }
): React.ReactElement {
    const [ typingIndex, setTypingIndex ] = useState(0)

    return (
        <div className="project-details-page">
            <div className="container">
                <p
                    className="close basic-text-bold"
                    onClick={() => onExit(project)}
                >&lt;- Fermer</p>

                <p className="large-text-bold">
                    <ReactTyped
                        {...typingConfig}
                        strings={[ project.projectName ]}
                        onComplete={() => setTypingIndex(1)}
                    />
                </p>

                {
                    typingIndex > 0 &&
                    <div className="a-section">
                        <p className="basic-text-bold">
                            <ReactTyped
                                {...typingConfig}
                                strings={[ "Description" ]}
                                onComplete={() => setTypingIndex(2)}
                            />
                        </p>
                        {
                            typingIndex > 1 &&
                            <motion.div
                                initial={{
                                    opacity: 0
                                }}
                                whileInView={{
                                    opacity: 1
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: project.projectHtmlDescription
                                }}
                            />
                        }
                    </div>
                }

                {
                    typingIndex > 1 &&
                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1
                        }}
                    >
                        <div className="a-section">
                            <p className="basic-text-bold">En</p>
                            <p>{project.year}</p>
                        </div>

                        <div className="a-section">
                            <p className="basic-text-bold">Stack technique</p>
                            <p>{project.technologies.join(" - ")}</p>
                        </div>

                        <div className="a-section">
                            <p className="basic-text-bold">Réalisés</p>
                            <ul>
                                {
                                    project.tasks.map((task: string, index: number): React.ReactElement => (
                                        <li key={index}>{task}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </motion.div>
                }
            </div>

            <div className="images-container">
                {
                    typingIndex > 0 &&
                    (<>
                        {
                            project.projectImagesLinks.map((imageLink: string, index: number): React.ReactElement => (
                                <motion.img
                                    key={index}
                                    initial={{
                                        opacity: 0
                                    }}
                                    whileInView={{
                                        opacity: 1
                                    }}
                                    src={imageLink}
                                    alt="Project image"
                                />
                            ))
                        }
                    </>)
                }
            </div>
        </div>
    )
}

/**
 * Project pages
 * @param show If true show list of hide it on false
 * @param projects projects to show
 * @param onProjectChose On project chose
 * @constructor
 */
function ProjectListPage(
    {
        show,
        projects,
        onProjectChose
    }:
    {
        show: boolean,
        projects: ProjectDescriptor[],
        onProjectChose: (chosenProject: ProjectDescriptor) => any
    }
): React.ReactElement {
    const classnames: string[] = [ "project-page" ]

    if (!show)
        classnames.push("hide")

    const classnamesList: string = classNames(...classnames)

    return (
        <div className={classnamesList}>
            {
                projects.map((project: ProjectDescriptor, index: number): React.ReactElement => (
                    <ProjectElement
                        key={index}
                        index={index + 1}
                        projectName={project.projectName}
                        technologies={project.technologies}
                        imageLink={project.previewImageLink}
                        onClickHandler={() => {
                            onProjectChose(project)
                        }}
                    />
                ))
            }
        </div>
    )
}

/**
 * Project page
 * @constructor
 */
export function ProjectPage(): React.ReactElement {
    // states
    const {data} = useQuery({
        cacheTime: 0,
        staleTime: 0,
        queryKey: "projects",
        queryFn: async (): Promise<ProjectDescriptor[]> => {
            const result = await fetch(process.env.NEXT_PUBLIC_PERSONAL_PROJECTS_FETCH_LINK!)

            return await result.json()
        }
    })

    const [ projectToShowDetails, setProjectToShowDetails ] = useState<ProjectDescriptor | null>(null)
    const [ showProjects, setShowProjects ] = useState<boolean>(true)

    useEffect(() => {
        if (projectToShowDetails)
            setShowProjects(false)
        else
            setShowProjects(true)
    }, [ projectToShowDetails ])

    // configs

    const projects: ProjectDescriptor[] = (data ?? []) as ProjectDescriptor[]

    return (
        <>
            <ProjectListPage
                show={showProjects}
                projects={projects}
                onProjectChose={(projectDetails: ProjectDescriptor) => setProjectToShowDetails(projectDetails)}
            />
            {
                projectToShowDetails &&
                <ProjectDetailsPage
                    project={projectToShowDetails}
                    onExit={() => setProjectToShowDetails(null)}
                />
            }
        </>
    )
}
