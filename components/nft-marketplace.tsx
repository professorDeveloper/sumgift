"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import dynamic from "next/dynamic"
import {
  Search,
  Filter,
  BarChart3,
  Grid3X3,
  Star,
  Crown,
  Gem,
  Gift,
  Sparkles,
  Zap,
  Heart,
  Diamond,
  Trophy,
  Flame,
} from "lucide-react"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const mockNFTs = [
  {
    id: 1,
    name: "Durov's Cap",
    number: "#2377",
    price: "519.98",
    lottieUrl: "https://nft.fragment.com/gift/durovscap-1727.lottie.json",
    rarity: "Rare",
    icon: Crown,
    rarityColor: "text-emerald-400",
  },
  {
    id: 2,
    name: "Durov's Cap",
    number: "#2611",
    price: "519.98",
    lottieUrl: "https://nft.fragment.com/gift/durovscap-2424.lottie.json",
    rarity: "Epic",
    icon: Flame,
    rarityColor: "text-orange-400",
  },
  {
    id: 3,
    name: "Durov's Cap",
    number: "#2405",
    price: "519.98",
    lottieUrl: "https://nft.fragment.com/gift/durovscap-1727.lottie.json",
    rarity: "Legendary",
    icon: Trophy,
    rarityColor: "text-blue-400",
  },
  {
    id: 4,
    name: "Durov's Cap",
    number: "#4183",
    price: "3.6K",
    items: "4 items",
    lottieUrl: "https://nft.fragment.com/gift/durovscap-2424.lottie.json",
    rarity: "Collection",
    isCollection: true,
    icon: Gem,
    rarityColor: "text-purple-400",
  },
  {
    id: 5,
    name: "Gift Box",
    number: "#490",
    price: "1700",
    instant: true,
    lottieUrl: "https://nft.fragment.com/gift/plushpepe-1626.lottie.json",
    rarity: "Instant sell",
    icon: Zap,
    rarityColor: "text-cyan-400",
  },
  {
    id: 6,
    name: "Star Notepad",
    number: "#8506",
    price: "285.50",
    lottieUrl: "https://nft.fragment.com/gift/starnotepad-8506.lottie.json",
    rarity: "Common",
    icon: Star,
    rarityColor: "text-yellow-400",
  },
]

const LottieNFT = ({ src, className }: { src: string; className: string }) => {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch(src)
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) => console.log("[v0] Failed to load NFT Lottie:", error))
  }, [src])

  if (!animationData) {
    return <div className={`${className} bg-gray-800 rounded-2xl animate-pulse`} />
  }

  return (
      <div className={`${className} rounded-2xl overflow-hidden flex items-center justify-center`}>
        <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: "100%", height: "100%" }} />
      </div>
  )
}

interface NFTMarketplaceProps {
  activeSection: string
}

export default function NFTMarketplace({ activeSection }: NFTMarketplaceProps) {
  const [scrollY, setScrollY] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
            <div className="space-y-4">
              <div className="flex items-center space-x-6 mb-6">
                <button className="text-white text-lg font-medium border-b-2 border-blue-400 pb-1">All items</button>
                <button className="text-gray-500 text-lg font-medium">Collections</button>
              </div>

              <div className="space-y-4">
                {/* Price range and controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1 bg-gray-600 rounded-full relative">
                        <div className="w-4 h-1 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-white">
                      <span className="text-lg font-semibold">0 UZS</span>
                      <div className="text-xs text-gray-400">0 items</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-gray-800 rounded-lg">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 bg-gray-800 rounded-lg">
                      <Grid3X3 className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 bg-gray-800 rounded-lg">
                      <Filter className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                      placeholder="Search by ID"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>

                {/* Clear filter */}
                <button className="text-blue-400 text-sm">Clear filter</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-6">
                {mockNFTs.map((nft) => {
                  return (
                      <div key={nft.id} className="bg-gray-900 rounded-2xl overflow-hidden">
                        <div className="relative">
                          <LottieNFT src={nft.lottieUrl} className="w-full aspect-square" />
                          {nft.isCollection && (
                              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                                <Grid3X3 className="w-3 h-3 text-white" />
                                <span className="text-white text-xs">{nft.items}</span>
                              </div>
                          )}
                        </div>

                        <div className="p-3">
                          <div className="mb-3">
                            <h4 className="text-white font-semibold text-sm">{nft.name}</h4>
                            <p className="text-gray-400 text-xs">{nft.number}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="bg-blue-600 rounded-lg px-3 py-2 flex-1 mr-2">
                              <div className="text-white font-semibold text-xs flex items-center space-x-1">
                                <span>∇ {nft.price}</span>
                              </div>
                            </div>

                            <button className="p-2 bg-gray-800 rounded-lg">
                              <Heart className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                  )
                })}
              </div>
            </div>
        )

      case "my-gift":
        return (
            <div className="space-y-6">
              <section className="text-center py-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">My Gifts</h2>
                <p className="text-gray-400">Your collected digital gifts</p>
              </section>
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-400 mb-4">No gifts collected yet</p>
                <Button className="bg-blue-600">
                  <Gift className="w-4 h-4 mr-2" />
                  Explore Gifts
                </Button>
              </div>
            </div>
        )

      case "profile":
        return (
            <div className="space-y-6">
              <section className="text-center py-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Profile</h2>
                <p className="text-gray-400">Manage your account</p>
              </section>
              <div className="space-y-4 px-4">
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Account Settings</h3>
                        <p className="text-gray-400 text-sm">Manage your profile and preferences</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Diamond className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Wallet</h3>
                        <p className="text-gray-400 text-sm">Connect and manage your wallet</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
        )

      default:
        return null
    }
  }

  return (
      <div className="min-h-screen bg-black">
        <header
            className={`sticky top-0 z-40 bg-black/95 backdrop-blur-sm transition-transform duration-300 ${
                scrollY > 100 ? "-translate-y-full" : "translate-y-0"
            }`}
        >
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-bold text-white">SumGift</h1>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 rounded-lg px-3 py-1 flex items-center space-x-1">
                  <div className="w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center">
                    <Diamond className="w-2 h-2 text-white" />
                  </div>
                  <span className="text-white text-sm">0 UZS</span>
                  <button className="text-white">+</button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-4 pb-20">{renderContent()}</main>
      </div>
  )
}
