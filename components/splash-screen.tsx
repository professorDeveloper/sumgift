"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface SplashScreenProps {
  onComplete?: () => void
}

const FloatingLottie = ({ src, className, bgColor }: { src: string; className: string; bgColor: string }) => {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch(src)
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) => console.log("[v0] Failed to load Lottie:", error))
  }, [src])

  if (!animationData) {
    return <div className={`${className} ${bgColor} rounded-2xl animate-pulse`} />
  }

  return (
      <div className={`${className} ${bgColor} rounded-2xl overflow-hidden animate-float`}>
        <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: "100%", height: "100%" }} />
      </div>
  )
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const floatingLotties = [
    {
      src: "https://nft.fragment.com/gift/skullflower-12626.lottie.json",
      top: "15%",
      left: "10%",
      size: "w-12 h-12 sm:w-16 sm:h-16",
      bgColor: "bg-purple-500",
    },
    {
      src: "https://nft.fragment.com/gift/durovscap-1727.lottie.json",
      top: "25%",
      right: "12%",
      size: "w-12 h-12 sm:w-16 sm:h-16",
      bgColor: "bg-gray-400",
    },
    {
      src: "https://nft.fragment.com/gift/deskcalendar-67890.lottie.json",
      bottom: "30%",
      left: "8%",
      size: "w-12 h-12 sm:w-16 sm:h-16",
      bgColor: "bg-amber-600",
    },
    {
      src: "https://nft.fragment.com/gift/deskcalendar-11223.lottie.json",
      bottom: "20%",
      right: "10%",
      size: "w-12 h-12 sm:w-16 sm:h-16",
      bgColor: "bg-yellow-500",
    },
  ]

  const [textVisible, setTextVisible] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const [stars, setStars] = useState<Array<{ left: string; top: string; delay: string }>>([])

  useEffect(() => {
    const textTimer = setTimeout(() => setTextVisible(true), 500)

    const progressTimer = setTimeout(() => {
      let width = 0
      const interval = setInterval(() => {
        width += 2
        setProgressWidth(width)
        if (width >= 100) {
          clearInterval(interval)
        }
      }, 30)
    }, 1000)

    const generatedStars = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }))
    setStars(generatedStars)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(progressTimer)
    }
  }, [])

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
        {floatingLotties.map((lottie, index) => (
            <div
                key={index}
                className={`absolute ${lottie.size}`}
                style={{
                  top: lottie.top,
                  bottom: lottie.bottom,
                  left: lottie.left,
                  right: lottie.right,
                }}
            >
              <FloatingLottie src={lottie.src} className="w-full h-full" bgColor={lottie.bgColor} />
            </div>
        ))}

        <div className="relative flex flex-col items-center space-y-4 sm:space-y-6 z-10 px-4">
          <div
              className={`text-center transition-all duration-1000 ease-out ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight animate-shimmer">
              SumGift
            </h1>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${textVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="w-48 sm:w-56 md:w-64 h-1 bg-gray-800 rounded-full overflow-hidden animate-breathe">
              <div
                  className="h-full bg-white rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.map((star, i) => (
              <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                  style={{
                    left: star.left,
                    top: star.top,
                    animationDelay: star.delay,
                  }}
              />
          ))}
        </div>
      </div>
  )
}
