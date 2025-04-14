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
