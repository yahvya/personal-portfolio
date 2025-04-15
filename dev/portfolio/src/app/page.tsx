"use client"

import React, {RefObject, useEffect, useRef} from "react"
import {HomePage} from "@/single-pages/home-page/home-page"
import {ProjectPage} from "@/single-pages/project-page/project-page"
import {ContactPage} from "@/single-pages/contact-page/contact-page"
import {TechnicalStackPage} from "@/single-pages/technical-stack-page/technical-stack-page"
import "./portfolio-page.scss"
import Link from "next/link"
import {useInView} from "motion/react"

/**
 * Page content
 * @constructor
 */
export default function PortfolioPage(): React.ReactElement {
    // states
    const pagesRefs: Record<string, RefObject<HTMLDivElement | null>> = {
        homeRef: useRef<HTMLDivElement | null>(null),
        projectsRef: useRef<HTMLDivElement | null>(null),
        technicalStackRef: useRef<HTMLDivElement | null>(null),
        contactRef: useRef<HTMLDivElement | null>(null),
    }

    const activeChecks = {
        isPortfolioActive: useInView(pagesRefs.homeRef, {amount: 0.6}),
        isProjectsActive: useInView(pagesRefs.projectsRef, {amount: 0.6}),
        isTechnicalStackActive: useInView(pagesRefs.technicalStackRef, {amount: 0.6}),
        isContactActive: useInView(pagesRefs.contactRef, {amount: 0.6}),
    }

    useEffect(() => {
        const refs = [
            pagesRefs.homeRef,
            pagesRefs.projectsRef,
            pagesRefs.technicalStackRef,
            pagesRefs.contactRef,
        ]

        const container = document.querySelector(".portfolio-page")
        if (!container) return

        const listeners: { el: HTMLDivElement; fn: (e: WheelEvent) => void }[] = []

        refs.forEach((ref, index) => {
            const el = ref.current
            if (!el) return

            const onWheel = (e: WheelEvent) => {
                const {scrollTop, scrollHeight, clientHeight} = el
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
                const isAtTop = scrollTop <= 0

                if (e.deltaY > 0 && isAtBottom && index < refs.length - 1) {
                    e.preventDefault()
                    const next = refs[index + 1]?.current
                    if (next) {
                        container.scrollTo({
                            left: next.offsetLeft,
                            behavior: "smooth",
                        })
                    }
                } else if (e.deltaY < 0 && isAtTop && index > 0) {
                    e.preventDefault()
                    const prev = refs[index - 1]?.current
                    if (prev) {
                        container.scrollTo({
                            left: prev.offsetLeft,
                            behavior: "smooth",
                        })
                    }
                } else if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
                    window.scrollBy(0, e.deltaY)
                }
            }

            el.addEventListener("wheel", onWheel, {passive: false})
            listeners.push({el, fn: onWheel})
        })

        return () => {
            listeners.forEach(({el, fn}) => {
                el.removeEventListener("wheel", fn)
            })
        }
    }, [])

    return (
        <>
            <div className="portfolio-page">
                <HomePage ref={pagesRefs.homeRef}/>
                <ProjectPage ref={pagesRefs.projectsRef}/>
                <TechnicalStackPage ref={pagesRefs.technicalStackRef}/>
                <ContactPage ref={pagesRefs.contactRef}/>
            </div>
            <nav className="portfolio-nav small-text">
                <Link
                    href="#portfolio"
                    className={activeChecks.isPortfolioActive ? "active" : ""}
                >
                    Portfolio
                </Link>

                <Link
                    href="#projects"
                    className={activeChecks.isProjectsActive ? "active" : ""}
                >
                    Projects
                </Link>

                <Link
                    href="#technical-stack"
                    className={activeChecks.isTechnicalStackActive ? "active" : ""}
                >
                    Technologies / Outils
                </Link>

                <Link
                    href="#contact"
                    className={activeChecks.isContactActive ? "active" : ""}
                >
                    Contactez-moi
                </Link>
            </nav>
        </>
    )
}
