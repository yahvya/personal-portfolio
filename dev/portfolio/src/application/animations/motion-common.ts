/**
 * Opacity + Slide Up animation
 */
export const opacitySlideUpAnimation = {
    initial: {
        opacity: 0,
        y: 20,
    },
    whileInView: {
        opacity: 1,
        y: 0,
    },
    transition: {
        duration: 0.6,
        ease: "easeOut",
    },
    viewport: {
        once: false,
    },
}

/**
 * Opacity + Slide Up animation with greater distance
 */
export const opacityGreatSlideUpAnimation = {
    initial: {
        opacity: 0,
        y: 200,
    },
    whileInView: {
        opacity: 1,
        y: 0,
    },
    transition: {
        duration: 0.6,
        ease: "easeOut",
    },
    viewport: {
        once: false,
    },
}
