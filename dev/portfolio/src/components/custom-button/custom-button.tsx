import React from "react"
import "./custom-button.scss"

/**
 * Custom button
 * @param buttonText Button text
 * @param iconImageLink If specified , the button icon image will be shown
 * @param buttonCustomDescriptors Custom button attributes
 * @constructor
 */
export function CustomButton(
    {
        buttonText,
        iconImageLink,
        buttonCustomDescriptors
    }:
    {
        buttonText: string,
        iconImageLink?: string,
        buttonCustomDescriptors: React.ButtonHTMLAttributes<HTMLButtonElement>
    }
): React.ReactElement {
    return (
        <button
            {...buttonCustomDescriptors}
            className="custom-button basic-text-bold"
        >
            {
                iconImageLink &&
                <img src={iconImageLink} alt="icon"/>
            }
            <span>{buttonText}</span>
        </button>
    )
}
