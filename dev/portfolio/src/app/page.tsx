"use client"
import React from "react"
import {HomePage} from "@/single-pages/home-page/home-page"
import {ProjectPage} from "@/single-pages/project-page/project-page"
import {ContactPage} from "@/single-pages/contact-page/contact-page"
import {TechnicalStackPage} from "@/single-pages/technical-stack-page/technical-stack-page";

/**
 * Page content
 * @constructor
 */
export default function PortfolioPage(): React.ReactElement {
    return <>
        <HomePage/>
        <ProjectPage/>
        <TechnicalStackPage/>
        <ContactPage/>
    </>
}
