import React, {RefObject, useState} from "react"
import {ReactTyped} from "react-typed"
import "./home-page.scss"
import {CodeBlock, androidstudio} from "react-code-blocks"
import {motion} from "motion/react"
import {linksConfig, textToPrint, typingConfig} from "@/application/single-pages/home-page/config"
import Link from "next/link"
import {opacitySlideUpAnimation} from "@/application/animations/motion-common"

/**
 * Home page
 * @param ref Page ref
 * @constructor
 */
export function HomePage(
    {ref}:
    { ref: RefObject<HTMLDivElement | null> }
): React.ReactElement {
    // states
    const [ indexToShow, setIndexToShow ] = useState(1)

    return (
        <div
            id="portfolio"
            className="home-page page"
            ref={ref}
        >
            <div className="typing">
                <ReactTyped
                    {...typingConfig}
                    strings={[ "Salut, je suis" ]}
                    className="large-text-bold light-text"
                    onComplete={(): void => setIndexToShow(2)}
                    showCursor={false}
                />
            </div>

            {
                indexToShow > 1 &&
                <div className="typing">
                    <ReactTyped
                        {...typingConfig}
                        strings={[ "Yahaya Bathily", "Développeur Full Stack" ]}
                        className="large-text-bold"
                        onStringTyped={() => indexToShow !== 3 && setIndexToShow(3)}
                        loop
                    />
                </div>
            }

            {
                indexToShow > 2 &&
                <>
                    <div className="main-row">
                        <motion.div
                            className="code-block"
                            {...opacitySlideUpAnimation}
                        >
                            <CodeBlock
                                text={textToPrint}
                                theme={androidstudio}
                                language="tsx"
                                showLineNumbers={true}
                                wrapLongLines={true}
                            />
                        </motion.div>

                        <motion.div
                            className="img-container"
                            {...opacitySlideUpAnimation}
                        >
                            <img src="https://yahvya.github.io/global-documents-config/portfolio/me.png" alt="Me"/>
                        </motion.div>
                    </div>

                    <div className="links-row">
                        {
                            linksConfig.map((linkConfig, index): React.ReactElement => (
                                <motion.div
                                    className="link"
                                    key={index}
                                    {...opacitySlideUpAnimation}
                                >
                                    <Link
                                        href={linkConfig.link()}
                                        title={linkConfig.text}
                                        className="img-container"
                                    >
                                        <img src={linkConfig.imageLink} alt={linkConfig.text}/>
                                    </Link>
                                    <p>{linkConfig.text}</p>
                                </motion.div>
                            ))
                        }
                    </div>
                </>
            }
        </div>
    )
}
