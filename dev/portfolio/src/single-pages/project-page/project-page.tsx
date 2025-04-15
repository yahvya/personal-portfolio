import "./project-page.scss"
import React, {RefObject, useEffect, useState} from "react"
import {useQuery} from "react-query"
import {ProjectElement} from "@/components/project-element/project-element"
import {ReactTyped} from "react-typed";
import {typingConfig} from "@/single-pages/project-page/config"
import {motion} from "motion/react"
import classNames from "classnames";
import {opacityGreatSlideUpAnimation, opacitySlideUpAnimation} from "@/animations/motion-common"
import {requestProjects} from "@/api-handlers/personal-github/requests"
import {ProjectDescriptor} from "@/api-handlers/personal-github/responses.dto"

/**
 * Show project details
 * @param project Project details
 * @param onExit Action on exit click
 * @param ref Page ref
 * @constructor
 */
function ProjectDetailsPage(
    {
        project,
        onExit,
        ref
    }:
    {
        project: ProjectDescriptor,
        onExit: (project: ProjectDescriptor) => void,
        ref: RefObject<HTMLDivElement | null>,
    }
): React.ReactElement {
    const [ typingIndex, setTypingIndex ] = useState(0)

    return (
        <div
            className="project-details-page page"
            id="projects"
            ref={ref}
        >
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
                                {...opacitySlideUpAnimation}
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
                        {...opacitySlideUpAnimation}
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
                                    {...opacitySlideUpAnimation}
                                    key={index}
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
 * @param ref Page ref
 * @constructor
 */
function ProjectListPage(
    {
        show,
        projects,
        onProjectChose,
        ref
    }:
    {
        ref: RefObject<HTMLDivElement | null>
        show: boolean,
        projects: ProjectDescriptor[],
        onProjectChose: (chosenProject: ProjectDescriptor) => any
    }
): React.ReactElement {
    const classnames: string[] = [ "project-page", "page" ]

    if (!show)
        classnames.push("hide")

    const classnamesList: string = classNames(...classnames)

    return (
        <div
            className={classnamesList}
            id="projects"
            ref={ref}
        >
            {
                projects.map((project: ProjectDescriptor, index: number): React.ReactElement => (
                    <motion.div
                        {...opacityGreatSlideUpAnimation}
                        key={index}
                    >
                        <ProjectElement
                            index={index + 1}
                            projectName={project.projectName}
                            technologies={project.technologies}
                            imageLink={project.previewImageLink}
                            onClickHandler={() => {
                                onProjectChose(project)
                            }}
                        />
                    </motion.div>
                ))
            }
        </div>
    )
}

/**
 * Project page
 * @param ref Page ref
 * @constructor
 */
export function ProjectPage(
    {ref}:
    { ref: RefObject<HTMLDivElement | null> }
): React.ReactElement {
    // states
    const {data} = useQuery({
        queryKey: "projects",
        queryFn: requestProjects,
        refetchOnWindowFocus: false
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
                ref={ref}
                show={showProjects}
                projects={projects}
                onProjectChose={(projectDetails: ProjectDescriptor) => setProjectToShowDetails(projectDetails)}
            />
            {
                projectToShowDetails &&
                <ProjectDetailsPage
                    ref={ref}
                    project={projectToShowDetails}
                    onExit={() => setProjectToShowDetails(null)}
                />
            }
        </>
    )
}
