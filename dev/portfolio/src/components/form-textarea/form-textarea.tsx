import React from "react"
import "./form-textarea.scss"

/**
 * Form textarea
 * @param placeholder Placeholder
 * @param customDescriptors Other descriptors
 * @param textareaRef Element ref
 * @constructor
 */
export function FormTextarea(
    {
        placeholder,
        customDescriptors,
        textareaRef
    }:
    {
        placeholder: string,
        customDescriptors: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        textareaRef: React.RefObject<HTMLTextAreaElement | null>
    }
): React.ReactElement {
    return (
        <textarea
            {...customDescriptors}
            className="form-textarea"
            placeholder={placeholder}
            ref={textareaRef}
        ></textarea>
    )
}
