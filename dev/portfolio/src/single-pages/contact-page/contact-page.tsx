import React, {RefObject, useRef} from "react"
import {FormInput} from "@/components/form-input/form-input"
import {FormTextarea} from "@/components/form-textarea/form-textarea"
import "./contact-page.scss"
import {CustomButton} from "@/components/custom-button/custom-button";

/**
 * Contact page
 * @constructor
 */
export function ContactPage(): React.ReactElement {
    const emailInputRef: RefObject<HTMLInputElement | null> = useRef<null | HTMLInputElement>(null)
    const messageObjectInputRef: RefObject<HTMLInputElement | null> = useRef<null | HTMLInputElement>(null)
    const messageAreaRef: RefObject<HTMLTextAreaElement | null> = useRef<null | HTMLTextAreaElement>(null)

    return (
        <div className="contact-page">
            <p className="page-title large-text-bold">Me contacter</p>

            <CustomButton
                buttonCustomDescriptors={{}}
                buttonText="Prévoir un meet"
                iconImageLink="/images/google-meet.png"
            />

            <p className="or">OU</p>

            <form>
                <FormInput
                    iconImageLink="/images/envelope.png"
                    inputPlaceholder="Entrez votre email"
                    inputCustomDescriptors={{
                        type: "email",
                        required: true
                    }}
                    controlRef={emailInputRef}
                />

                <FormInput
                    iconImageLink="/images/question-mark.png"
                    inputPlaceholder="Objet du message"
                    inputCustomDescriptors={{
                        type: "text",
                        required: true,
                        minLength: 10
                    }}
                    controlRef={messageObjectInputRef}
                />

                <FormTextarea
                    placeholder={"Message (veuillez fournir le plus de détails possible)"}
                    customDescriptors={{
                        required: true,
                        minLength: 20
                    }}
                    textareaRef={messageAreaRef}
                />

                <CustomButton
                    buttonText="Envoyer"
                    buttonCustomDescriptors={{}}
                />
            </form>
        </div>
    )
}
