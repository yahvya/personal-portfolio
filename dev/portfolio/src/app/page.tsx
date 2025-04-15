"use client"

import React, {useEffect, useRef} from "react"
import {HomePage} from "@/single-pages/home-page/home-page"
import {ProjectPage} from "@/single-pages/project-page/project-page"
import {TechnicalStackPage} from "@/single-pages/technical-stack-page/technical-stack-page"
import {ContactPage} from "@/single-pages/contact-page/contact-page"
import "./portfolio-page.scss"
import {useInView} from "motion/react"
import Link from "next/link"

export default function PortfolioPage() {
    const containerRef = useRef<HTMLDivElement>(null)

    const pagesRefs = {
        homeRef: useRef<HTMLDivElement>(null),
        projectsRef: useRef<HTMLDivElement>(null),
        technicalStackRef: useRef<HTMLDivElement>(null),
        contactRef: useRef<HTMLDivElement>(null),
    }

    const activeChecks = {
        isPortfolioActive: useInView(pagesRefs.homeRef, {amount: 0.6}),
        isProjectsActive: useInView(pagesRefs.projectsRef, {amount: 0.6}),
        isTechnicalStackActive: useInView(pagesRefs.technicalStackRef, {amount: 0.6}),
        isContactActive: useInView(pagesRefs.contactRef, {amount: 0.6}),
    }

    const refsList = [
        pagesRefs.homeRef,
        pagesRefs.projectsRef,
        pagesRefs.technicalStackRef,
        pagesRefs.contactRef,
    ]

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleWheel = (e: WheelEvent) => {
            const currentIndex = refsList.findIndex((ref) => {
                if (!ref.current) return false
                const rect = ref.current.getBoundingClientRect()
                return Math.abs(rect.left) < 10
            })

            const current = refsList[currentIndex]?.current
            if (!current) return

            const {scrollTop, scrollHeight, clientHeight} = current
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
            const isAtTop = scrollTop <= 0

            if (e.deltaY > 0 && isAtBottom && currentIndex < refsList.length - 1) {
                e.preventDefault()
                const next = refsList[currentIndex + 1]?.current
                if (next) {
                    container.scrollTo({
                        left: next.offsetLeft,
                        behavior: "smooth",
                    })
                }
            } else if (e.deltaY < 0 && isAtTop && currentIndex > 0) {
                e.preventDefault()
                const prev = refsList[currentIndex - 1]?.current
                if (prev) {
                    container.scrollTo({
                        left: prev.offsetLeft,
                        behavior: "smooth",
                    })
                }
            }
        }

        container.addEventListener("wheel", handleWheel, {passive: false})
        return () => container.removeEventListener("wheel", handleWheel)
    }, [])

    return (
        <>
            <div className="portfolio-page" ref={containerRef}>
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
                    Projets
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
