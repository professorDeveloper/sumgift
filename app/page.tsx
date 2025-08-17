"use client"

import { useState } from "react"
import SplashScreen from "@/components/splash-screen"
import NFTMarketplace from "@/components/nft-marketplace"
import { Store, Gift, User } from "lucide-react"

export default function Home() {
    const [showSplash, setShowSplash] = useState(true)
    const [activeSection, setActiveSection] = useState("home")

    const handleSplashComplete = () => {
        setShowSplash(false)
    }

    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete} />
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="animate-fade-in">
                <NFTMarketplace activeSection={activeSection} />
            </div>

            <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-gray-800 z-40">
                <div className="flex items-center justify-around py-3">
                    {[
                        { icon: Store, label: "Store", key: "home" },
                        { icon: Gift, label: "My gifts", key: "my-gift" },
                        { icon: User, label: "Profile", key: "profile" },
                    ].map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActiveSection(item.key)}
                            className={`flex flex-col items-center py-1 px-4 ${
                                activeSection === item.key ? "text-blue-400" : "text-gray-500"
                            }`}
                        >
                            <item.icon className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    )
}
