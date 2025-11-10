"use client"

import { useEffect, useState } from "react"

interface MotivationalMessageProps {
  score: number
}

export function MotivationalMessage({ score }: MotivationalMessageProps) {
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMessage(getMotivationalMessage(score))
  }, [score])

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-old-rose/20 to-murrey/10 border-l-4 border-old-rose rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-center text-sm md:text-base text-murrey font-semibold italic">"{message}"</p>
    </div>
  )
}

function getMotivationalMessage(score: number): string {
  const messages = {
    low: [
      "At least you're consistently chaotic. We love that for you 💅",
      "Peak productivity energy! Look at you go! ✨",
      "You're literally the most organized chaos I've ever seen 🌟",
      "This is what winning looks like! 🏆",
    ],
    medium: [
      "You're doing fine. Existence is messy anyway 🤷",
      "Could be worse! Could always be worse. But hey, you're here! 💪",
      "Living your best chaotic life and we stan 👑",
      "Real recognizes real, and you're real today! 🎯",
    ],
    high: [
      "At least you're consistently chaotic. We love that for you 💅",
      "This is fine. Everything is fine. (It's not but we're vibing) 🔥",
      "You're a walking mood and honestly? Iconic 🎭",
      "Hot mess status = unlocked. Wear it proudly! 👑",
    ],
    peak: [
      "Peak hot mess energy. You're not broken, you're just extra ✨",
      "This is what we call 'main character energy' 🚀",
      "Chaos isn't a pit... it's a feature. And you're a pro! 🎮",
      "You're not failing, you're just creating content! 📸",
      "Hot mess? More like hot MESS-TERPIECE 🎨",
    ],
  }

  let category: keyof typeof messages
  if (score < 30) category = "low"
  else if (score < 60) category = "medium"
  else if (score < 85) category = "high"
  else category = "peak"

  return messages[category][Math.floor(Math.random() * messages[category].length)]
}
