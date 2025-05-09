"use client"

import React, {useRef} from "react"
import {HomePage} from "@/application/single-pages/home-page/home-page"
import {ProjectPage} from "@/application/single-pages/project-page/project-page"
import {TechnicalStackPage} from "@/application/single-pages/technical-stack-page/technical-stack-page"
import {ContactPage} from "@/application/single-pages/contact-page/contact-page"
import "./portfolio-page.scss"
import {useInView} from "motion/react"
import Link from "next/link"
import {MouseScroll} from "@/application/components/mouse-scroll/mouse-scroll";

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

    return (
        <>
            <div className="portfolio-page" ref={containerRef}>
                <div className="a-page">
                    <HomePage ref={pagesRefs.homeRef}/>
                    <MouseScroll/>
                </div>

                <div className="a-page">
                    <ProjectPage ref={pagesRefs.projectsRef}/>
                    <MouseScroll/>
                </div>

                <div className="a-page">
                    <TechnicalStackPage ref={pagesRefs.technicalStackRef}/>
                    <MouseScroll/>
                </div>

                <div className="a-page">
                    <ContactPage ref={pagesRefs.contactRef}/>
                </div>
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
