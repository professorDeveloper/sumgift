"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockNFTs = [
  {
    id: 1,
    name: "Cosmic Warrior #1234",
    price: "2.5 ETH",
    image: "/cosmic-warrior-nft.png",
    collection: "Cosmic Warriors",
    rarity: "Rare",
  },
  {
    id: 2,
    name: "Digital Dreams #567",
    price: "1.8 ETH",
    image: "/digital-dreams-nft.png",
    collection: "Digital Dreams",
    rarity: "Epic",
  },
  {
    id: 3,
    name: "Pixel Punk #890",
    price: "3.2 ETH",
    image: "/pixel-punk-nft.png",
    collection: "Pixel Punks",
    rarity: "Legendary",
  },
  {
    id: 4,
    name: "Neon City #123",
    price: "1.5 ETH",
    image: "/neon-city-cyberpunk-nft.png",
    collection: "Neon Cities",
    rarity: "Common",
  },
]

export default function NFTMarketplace() {
  const [activeTab, setActiveTab] = useState("explore")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-lg">🎁</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">SumGift</h1>
            </div>
            <Button variant="outline" size="sm">
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Section */}
        <section className="text-center py-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Discover Premium Gifts
          </h2>
          <p className="text-muted-foreground text-lg mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Explore, collect, and trade unique digital collectibles
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore Collection
            </Button>
            <Button variant="outline" size="lg">
              Create Gift
            </Button>
          </div>
        </section>

        {/* NFT Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-foreground">Trending Gifts</h3>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "explore" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("explore")}
              >
                Explore
              </Button>
              <Button
                variant={activeTab === "trending" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("trending")}
              >
                Trending
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockNFTs.map((nft, index) => (
              <Card
                key={nft.id}
                className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                      {nft.rarity}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{nft.collection}</p>
                    <h4 className="font-semibold text-foreground mb-2 truncate">{nft.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{nft.price}</span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: "🏠", label: "Home", active: true },
            { icon: "🔍", label: "Explore", active: false },
            { icon: "🎁", label: "My Gifts", active: false },
            { icon: "⚙️", label: "Settings", active: false },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                item.active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
