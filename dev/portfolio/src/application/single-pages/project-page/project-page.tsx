import "./project-page.scss"
import React, {RefObject, useEffect, useRef, useState} from "react"
import {useQuery} from "react-query"
import {ProjectElement} from "@/application/components/project-element/project-element"
import {ReactTyped} from "react-typed";
import {typingConfig} from "@/application/single-pages/project-page/config"
import {motion, useInView} from "motion/react"
import classNames from "classnames";
import {opacityGreatSlideUpAnimation, opacitySlideUpAnimation} from "@/application/animations/motion-common"
import {requestProjects} from "@/application/api-handlers/personal-github/requests"
import {ProjectDescriptor} from "@/application/api-handlers/personal-github/responses.dto"
import {CustomButton} from "@/application/components/custom-button/custom-button";
import Link from "next/link";

/**
 * Show project details
 * @param project Project details
 * @param onExit Action on exit click
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
    const closeRef = useRef<HTMLParagraphElement|null>(null)

    useEffect(() => {
        if(closeRef !== null && typingIndex > 0)
            closeRef.current!.scrollIntoView()
    }, [closeRef,typingIndex])

    return (
        <div
            className="project-details-page"
            id="projects"
        >
            <div className="container">
                <p
                    className="close basic-text-bold"
                    onClick={() => onExit(project)}
                    ref={closeRef}
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

                        {
                            project.visitLink !== null && (
                                <Link href={project.visitLink!} title={"Voir le projet"} className={"see-project-button"}>
                                    <CustomButton
                                        buttonText={"Voir le projet"}
                                        buttonCustomDescriptors={{}}
                                    />
                                </Link>
                            )
                        }
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
        <div
            className={classnamesList}
            id="projects"
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

    const titleRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(titleRef, {once: false})
    const [ alreadyPast, setAlreadyPast ] = useState(false)

    useEffect(() => {
        if (projectToShowDetails)
            setShowProjects(false)
        else
            setShowProjects(true)
    }, [ projectToShowDetails ])

    // configs

    const projects: ProjectDescriptor[] = (data ?? []) as ProjectDescriptor[]

    if (isInView && !alreadyPast)
        setAlreadyPast(true)

    return (
        <div
            className="page"
            ref={ref}
        >
            <div className="project-page-title" ref={titleRef}>
                {
                    (isInView || alreadyPast) && (
                        <ReactTyped
                            strings={[ "Quelques projets sympa ;)" ]}
                            showCursor={false}
                            className="large-text-bold"
                            typeSpeed={30}
                            loop={false}
                        />
                    )
                }
            </div>

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
        </div>
    )
}
