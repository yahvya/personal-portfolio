import React from "react"
import "./global.scss"
import {Metadata} from "next"
import {AppQueryClientProvider} from "@/application/components/query-client-provider/app-query-client-provider";

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
    creator: "Yahaya Bathily",
    verification: {
        google: "Wu8G070PZXnWEz_Ou2QCDuxPoFsvqb_zQ2GRfl29jQs"
    }
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
            <body cz-shortcut-listen="true">
            <main>{children}</main>
            </body>
            </html>
        </AppQueryClientProvider>
    )
}
