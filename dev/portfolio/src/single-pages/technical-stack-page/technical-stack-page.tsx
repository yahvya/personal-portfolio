import React from "react"
import "./technical-stack-page.scss"
import {useQuery} from "react-query"
import {requestTechnicalStackElements} from "@/api-handlers/personal-github/requests"
import {StackElementDescriptor, StackElementsFetchResponse} from "@/api-handlers/personal-github/responses.dto"
import {motion} from "motion/react"
import {StackElement} from "@/components/stack-element/stack-element"
import {opacityGreatSlideUpAnimation} from "@/animations/motion-common";

/**
 * Technical stack page
 * @constructor
 */
export function TechnicalStackPage(): React.ReactElement {
    // states

    const {data} = useQuery({
        queryKey: "technical-stack",
        queryFn: requestTechnicalStackElements
    })

    const technicalStackElements = data as StackElementsFetchResponse ?? []

    return (
        <div className="technical-stack-page">
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
