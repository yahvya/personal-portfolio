import React from "react"
import "./form-input.scss"

/**
 * Form input
 * @param iconImageLink Icon image link
 * @param inputPlaceholder Input placeholder
 * @param controlRef Input control ref
 * @param inputCustomDescriptors Other input attributes
 * @constructor
 */
export function FormInput(
    {
        iconImageLink,
        inputPlaceholder,
        controlRef,
        inputCustomDescriptors
    }:
    {
        iconImageLink: string,
        inputPlaceholder: string,
        inputCustomDescriptors: React.InputHTMLAttributes<HTMLInputElement>,
        controlRef: React.RefObject<HTMLInputElement | null>,
    }
): React.ReactElement {
    return (
        <div className="form-input basic-text-bold">
            <img src={iconImageLink} alt="icon"/>
            <input
                placeholder={inputPlaceholder}
                ref={controlRef}
                {...inputCustomDescriptors}
            />
        </div>
    )
}
