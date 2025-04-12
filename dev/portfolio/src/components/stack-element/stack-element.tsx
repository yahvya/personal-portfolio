import React from "react"
import "./stack-element.scss"
import classNames from "classnames"

/**
 * Stack element component
 * @param text Element text (ex : Javascript)
 * @param elementImageUrl Element image url
 * @param animate Specify if it should animate
 * @constructor
 */
export function StackElement(
    {
        text,
        elementImageUrl,
        animate
    }:
    {
        text: string,
        elementImageUrl: string,
        animate: boolean
    }
): React.ReactElement {
    const classnames: string = classNames(
        "stack-element",
        "basic-text-bold",
        {animate: animate}
    )

    return (
        <div className={classnames}>
            <img src={elementImageUrl} alt={text}/>
            <span>{text}</span>
        </div>
    )
}
