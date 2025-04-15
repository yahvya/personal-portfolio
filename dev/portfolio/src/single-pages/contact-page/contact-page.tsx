import React, {RefObject, useRef, useState} from "react"
import {FormInput} from "@/components/form-input/form-input"
import {FormTextarea} from "@/components/form-textarea/form-textarea"
import "./contact-page.scss"
import {CustomButton} from "@/components/custom-button/custom-button"
import {motion} from "motion/react"
import {opacitySlideUpAnimation} from "@/animations/motion-common"
import {Availability, AvailabilityMap, Calendar} from "@/components/calendar/calendar"
import {requestAvailabilityListFor, requestBookMeet} from "@/api-handlers/portfolio-api/requests"
import {BookMeetResponse} from "@/api-handlers/portfolio-api/responses.dto"
import {ReactTyped} from "react-typed"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2";

/**
 * Contact page
 * @param ref Page ref
 * @constructor
 */
export function ContactPage(
    {ref}:
    { ref: RefObject<HTMLDivElement | null> }
): React.ReactElement {
    const currentDate: Date = new Date()
    const currentYear: number = currentDate.getFullYear()
    let currentMonth: number = currentDate.getMonth()
    currentMonth = currentMonth === 0 ? 12 : currentMonth + 1

    // refs

    const emailInputRef: RefObject<HTMLInputElement | null> = useRef<null | HTMLInputElement>(null)
    const messageObjectInputRef: RefObject<HTMLInputElement | null> = useRef<null | HTMLInputElement>(null)
    const messageAreaRef: RefObject<HTMLTextAreaElement | null> = useRef<null | HTMLTextAreaElement>(null)

    // states

    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ requestMessage, setRequestMessage ] = useState<string | null>(null)

    // handlers

    const handleMeetButtonClick = () => {
        !showCalendar && setShowCalendar(true)
    }

    const availabilityGetterHandler = async (selectedMonth: number, selectedDay: number): Promise<AvailabilityMap> => {
        try {
            return await requestAvailabilityListFor({
                month: selectedMonth,
                monthDay: selectedDay
            })
        } catch (_) {
            setRequestMessage("Une erreur s'est produite durant la récupération des disponibilités du jour :)")
            return {}
        }
    }

    const meetValidationChoiceHandler = (selectedMonth: number, selectedDay: number, availability: Availability): void => {
        const AppSwal = withReactContent(Swal)

        AppSwal
            .fire({
                title: "Votre email",
                inputPlaceholder: "Entrez votre email pour le meet",
                input: "email",
                showCancelButton: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                cancelButtonText: "Annuler",
                confirmButtonText: "Valider le meet",
                background: "var(--primary-background)",
                confirmButtonColor: "var(--secondary-background)",
                cancelButtonColor: "var(--secondary-background)",
                color: "var(--primary-text)",
                validationMessage: "Veuillez saisir une email valide"
            })
            .then((result) => {
                if (!result.isConfirmed)
                    return

                requestBookMeet({
                    monthDay: selectedDay,
                    month: selectedMonth,
                    availabilityStart: availability.start,
                    availabilityEnd: availability.end,
                    email: result.value
                })
                    .then((response: BookMeetResponse) => {
                        setRequestMessage(response.error ?? "C'est noté ;)")
                    })
                    .catch(_ => {
                        setRequestMessage("Une erreur s'est produite durant la prise du rendez-vous :)")
                    })
            })

        setShowCalendar(false)
    }

    return (
        <div
            className="contact-page page"
            id="contact"
            ref={ref}
        >
            <p className="page-title large-text-bold">Me contacter</p>

            <CustomButton
                buttonCustomDescriptors={{
                    onClick: handleMeetButtonClick
                }}
                buttonText="Prévoir un meet"
                iconImageLink="/images/google-meet.png"
            />

            {
                showCalendar && (
                    <motion.div
                        {...opacitySlideUpAnimation}
                        className="calendar-page-container"
                    >
                        <Calendar
                            startMonth={currentMonth}
                            year={currentYear}
                            availabilityGetter={availabilityGetterHandler}
                            onAvailabilityChosen={meetValidationChoiceHandler}
                        />
                    </motion.div>
                )
            }

            {
                requestMessage && (
                    <ReactTyped
                        strings={[ requestMessage ]}
                        showCursor={false}
                        typeSpeed={20}
                        className="request-message small-text-bold"
                    />
                )
            }

            <p className="or">OU</p>

            <form>
                <motion.div
                    {...opacitySlideUpAnimation}
                >
                    <FormInput
                        iconImageLink="/images/envelope.png"
                        inputPlaceholder="Entrez votre email"
                        inputCustomDescriptors={{
                            type: "email",
                            required: true
                        }}
                        controlRef={emailInputRef}
                    />
                </motion.div>

                <motion.div
                    {...opacitySlideUpAnimation}
                >
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
                </motion.div>

                <motion.div
                    {...opacitySlideUpAnimation}
                >
                    <FormTextarea
                        placeholder={"Message (veuillez fournir le plus de détails possible)"}
                        customDescriptors={{
                            required: true,
                            minLength: 20
                        }}
                        textareaRef={messageAreaRef}
                    />
                </motion.div>

                <CustomButton
                    buttonText="Envoyer"
                    buttonCustomDescriptors={{
                        type: "submit"
                    }}
                />
            </form>
        </div>
    )
}
