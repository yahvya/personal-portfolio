import React, {RefObject, useRef} from "react"
import "./technical-stack-page.scss"
import {useQuery} from "react-query"
import {requestTechnicalStackElements} from "@/api-handlers/personal-github/requests"
import {StackElementDescriptor, StackElementsFetchResponse} from "@/api-handlers/personal-github/responses.dto"
import {motion, useInView} from "motion/react"
import {StackElement} from "@/components/stack-element/stack-element"
import {opacityGreatSlideUpAnimation} from "@/animations/motion-common"
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

    const {data} = useQuery({
        queryKey: "technical-stack",
        queryFn: requestTechnicalStackElements
    })

    const technicalStackElements = data as StackElementsFetchResponse ?? []

    return (
        <div
            className="technical-stack-page page"
            id="technical-stack"
            ref={ref}
        >
            <div className="page-title" ref={titleRef}>
                {
                    isInView && (
                        <ReactTyped
                            strings={[ "Une idée de ma stack technique ?" ]}
                            showCursor={false}
                            className="large-text-bold"
                            typeSpeed={30}
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
