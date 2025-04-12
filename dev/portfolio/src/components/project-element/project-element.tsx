import React from "react"
import "./project-element.scss"

/**
 * Project element
 * @param index Project index
 * @param projectName Project name
 * @param technologies List of technologies names
 * @param imageLink Image link
 * @param onClickHandler Click on project handler
 * @constructor
 */
export function ProjectElement(
    {
        index,
        projectName,
        technologies,
        imageLink,
        onClickHandler
    }:
    {
        index: number,
        projectName: string,
        technologies: string[],
        imageLink: string,
        onClickHandler: React.MouseEventHandler<HTMLDivElement>
    }
): React.ReactElement {
    const indexString: string = [ 0, 1 ].includes(index) ? `0${index}` : `${index}`

    return (
        <div
            className="project-element large-text-bold"
            onClick={onClickHandler}
        >
            <div className="data-side">
                <div className="row-1">
                    <p className="index">_{indexString}.</p>
                    <p className="project-name">{projectName}</p>
                </div>

                <p className="technologies basic-text-bold">{technologies.join(" - ")}</p>
            </div>

            <div className="image-side">
                <img src={imageLink} alt="Project"/>
            </div>
        </div>
    )
}
