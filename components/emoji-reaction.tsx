"use client"

import { useEffect, useState } from "react"

interface EmojiReactionProps {
  score: number
}

export function EmojiReaction({ score }: EmojiReactionProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 600)
    return () => clearTimeout(timer)
  }, [score])

  const getEmoji = () => {
    if (score < 20) return "😊"
    if (score < 40) return "😌"
    if (score < 60) return "😅"
    if (score < 80) return "😵"
    return "🤪"
  }

  const getRotation = () => {
    if (score < 20) return "rotate-0"
    if (score < 40) return "rotate-3"
    if (score < 60) return "-rotate-3"
    if (score < 80) return "rotate-6"
    return "-rotate-6"
  }

  return (
    <div className={`relative w-24 h-24 md:w-32 md:h-32`}>
      <div
        className={`
          text-7xl md:text-8xl transition-all duration-300 transform
          ${getRotation()}
          ${isAnimating ? "scale-110" : "scale-100"}
        `}
      >
        {getEmoji()}
      </div>
      {/* Floating particles */}
      {isAnimating && (
        <>
          <div className="absolute inset-0 animate-ping opacity-50 text-3xl">✨</div>
          <div className="absolute top-0 right-0 animate-bounce text-2xl" style={{ animationDelay: "0.1s" }}>
            ✨
          </div>
          <div className="absolute bottom-0 left-0 animate-bounce text-2xl" style={{ animationDelay: "0.2s" }}>
            ✨
          </div>
        </>
      )}
    </div>
  )
}
