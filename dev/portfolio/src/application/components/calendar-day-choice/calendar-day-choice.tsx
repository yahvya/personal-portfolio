import React from "react"
import classNames from "classnames"
import "./calendar-day-choice.scss"

/**
 * Calendar day choice
 * @param startTimeText Start time text (ex :  8h)
 * @param endTimeText End time text (ex : 10h30)
 * @param selected If the element is selected
 * @param onSelect Action handler if element is selected / clicked
 * @constructor
 */
export function CalendarDayChoice(
    {
        startTimeText,
        endTimeText,
        selected,
        onSelect
    }:
    {
        startTimeText: string,
        endTimeText: string,
        selected: boolean,
        onSelect: (startTimeText: string, endTimeText: string) => void
    }
): React.ReactElement {
    const classNamesList: string[] = [ "calendar-day-choice", "basic-text" ]

    if (selected)
        classNamesList.push("selected")

    const classnames: string = classNames(...classNamesList)

    // handlers

    const handleChoiceClick = () => onSelect(startTimeText, endTimeText)

    return (
        <div
            className={classnames}
            onClick={handleChoiceClick}
        >
            <span>{startTimeText}</span>
            <span>-</span>
            <span>{endTimeText}</span>
        </div>
    )
}
