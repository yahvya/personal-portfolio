/**
 * Typing default config
 */
export const typingConfig = {
    typeSpeed: 70,
    backSpeed: 20,
    backDelay: 2000,
}

/**
 * Code text to print
 */
export const textToPrint: string =
    `<ReactComponent>
Passionné par le développement de jeux vidéos, je me suis lancé dans le monde de l’informatique dans cet objectif.
Et petit à petit, j'ai appris de plus en plus de choses.
Découvrez en plus sur moi en scrollant ;)
</ReactComponent>`

/**
 * Link configuration
 */
interface LinkConfig {
    text: string
    imageLink: string
    link: () => string
}

/**
 * Personal links
 */
export const linksConfig: LinkConfig[] = [
    {
        text: "Linkedin",
        imageLink: "/images/linkedin.png",
        link: () => process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN_LINK!
    },
    {
        text: "GitHub",
        imageLink: "/images/github.png",
        link: () => process.env.NEXT_PUBLIC_PERSONAL_GITHUB_LINK!
    },
    {
        text: "Mail",
        imageLink: "/images/envelope.png",
        link: () => process.env.NEXT_PUBLIC_PERSONAL_MAIL_LINK!
    },
    {
        text: "CV",
        imageLink: "/images/favicon.ico",
        link: () => process.env.NEXT_PUBLIC_PERSONAL_CV_LINK!
    },
]
