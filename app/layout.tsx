import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
    title: "SumGift - Telegram NFT Marketplace",
    description: "Discover, collect, and trade unique NFTs on Telegram",
    generator: "v0.app",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
        <head>
            <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
            />
            <meta name="theme-color" content="#1a1a1a" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="mobile-web-app-capable" content="yes" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    // Telegram Web App initialization for auto full-screen
                    if (window.Telegram && window.Telegram.WebApp) {
                        window.Telegram.WebApp.ready();
                        window.Telegram.WebApp.expand();
                        window.Telegram.WebApp.enableClosingConfirmation();
                    }
                `,
                }}
            />
        </head>
        <body className="antialiased bg-black text-white overflow-x-hidden">{children}</body>
        </html>
    )
}
