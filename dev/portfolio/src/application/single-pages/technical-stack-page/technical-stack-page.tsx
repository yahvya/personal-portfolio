import React, {RefObject, useRef, useState} from "react"
import "./technical-stack-page.scss"
import {useQuery} from "react-query"
import {requestTechnicalStackElements} from "@/application/api-handlers/personal-github/requests"
import {
    StackElementDescriptor,
    StackElementsFetchResponse
} from "@/application/api-handlers/personal-github/responses.dto"
import {motion, useInView} from "motion/react"
import {StackElement} from "@/application/components/stack-element/stack-element"
import {opacityGreatSlideUpAnimation} from "@/application/animations/motion-common"
import {ReactTyped} from "react-typed"

/**
 * Technical stack page
 * @param ref Page ref
 * @constructor
 */
export function TechnicalStackPage(
    {ref}:
    { ref: RefObject<HTMLDivElement | null> }
): React.ReactElement {
    // states

    const titleRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(titleRef, {once: false})
    const [ alreadyPast, setAlreadyPast ] = useState(false)

    const {data} = useQuery({
        queryKey: "technical-stack",
        queryFn: requestTechnicalStackElements
    })

    const technicalStackElements = data as StackElementsFetchResponse ?? []

    if (isInView && !alreadyPast)
        setAlreadyPast(true)

    return (
        <div
            className="technical-stack-page page"
            id="technical-stack"
            ref={ref}
        >
            <div className="page-title" ref={titleRef}>
                {
                    (isInView || alreadyPast) && (
                        <ReactTyped
                            strings={[ "Une idée de ma stack technique ?" ]}
                            showCursor={false}
                            className="large-text-bold"
                            typeSpeed={30}
                            loop={false}
                        />
                    )
                }
            </div>

            <div className="stack-elements-container">
                {
                    technicalStackElements.map((stackElementConfig: StackElementDescriptor, index: number): React.ReactElement => (
                        <motion.div
                            {...opacityGreatSlideUpAnimation}
                            key={index}
                        >
                            <StackElement
                                text={stackElementConfig.text}
                                elementImageUrl={stackElementConfig.image}
                                animate={true}
                            />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}
