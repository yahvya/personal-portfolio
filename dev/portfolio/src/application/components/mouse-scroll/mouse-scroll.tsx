import React from "react"
import {DotLottieReact} from "@lottiefiles/dotlottie-react"
import "./mouse-scroll.scss"
import { motion } from "motion/react"
import {opacityGreatSlideUpAnimation} from "@/application/animations/motion-common"

/**
 * Mouse scroll
 * @param appearAnim If true animate the apparition
 * @constructor
 */
export function MouseScroll(
    {appearAnim = true}:
    {appearAnim?: boolean}
):React.ReactElement{
    const animation = appearAnim ? opacityGreatSlideUpAnimation : {}

    return (
        <motion.div
            className="mouse-scroll"
            {...animation}
        >
            <DotLottieReact
                src={"/lottie/mouse.json"}
                loop={true}
                autoplay={true}
            />
        </motion.div>
    )
}
