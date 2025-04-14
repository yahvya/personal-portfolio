"use client"
import React, {useState} from "react"
import {QueryClient, QueryClientProvider} from "react-query"

/**
 * React type query client provider
 * @param children Children
 * @constructor
 */
export function AppQueryClientProvider(
    {children}:
    { children: React.ReactNode }
): React.ReactElement {
    const [ queryClient ] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
