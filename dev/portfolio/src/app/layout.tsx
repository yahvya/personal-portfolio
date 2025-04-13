import React from "react"
import "./global.scss"
import {Metadata} from "next"
import {AppQueryClientProvider} from "@/components/query-client-provider/app-query-client-provider";

/**
 * Metadata
 */
export const metadata: Metadata = {
    title: "Portfolio",
    description: "Yahaya Bathily, Développeur Fullstack Web & Mobile",
    applicationName: "Portfolio Yahaya",
    authors: [
        {name: "Yahaya Bathily", url: process.env.NEXT_PUBLIC_PERSONAL_GITHUB_LINK}
    ],
    category: "Portfolio",
    keywords: [ "portfolio", "développeur", "fullstack", "web", "mobile", "programmation", "freelance", "informatique" ],
    robots: {index: true, follow: true},
    creator: "Yahaya Bathily"
}

/**
 * Portfolio single page layout
 * @param children Layout children
 * @constructor
 */
export default function SinglePageLayout(
    {children}:
    { children: React.ReactNode }
): React.ReactElement {
    return (
        <AppQueryClientProvider>
            <html lang="fr">
            <body>
            <main>{children}</main>
            </body>
            </html>
        </AppQueryClientProvider>
    )
}
