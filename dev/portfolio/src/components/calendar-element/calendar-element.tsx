import classNames from "classnames"
import React from "react"
import "./calendar-element.scss"

/**
 * Calendar element
 * @param dayNumber Day number to show
 * @param onSelect Action on element select / click
 * @param selected Default selection state
 * @constructor
 */
export function CalendarElement(
    {
        dayNumber,
        onSelect,
        selected
    }:
    {
        dayNumber: number,
        onSelect: (dayNumber: number) => void,
        selected: boolean
    }
): React.ReactElement {
    const classnameList: string[] = [ "calendar-element", "basic-text" ]

    if (selected)
        classnameList.push("selected")

    const classnames: string = classNames(...classnameList)

    return (
        <div
            className={classnames}
            onClick={(): void => onSelect(dayNumber)}
        >
            <span>{dayNumber}</span>
        </div>
    )
}
