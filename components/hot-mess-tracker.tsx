"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EmojiReaction } from "./emoji-reaction"
import { SliderControl } from "./slider-control"
import { MotivationalMessage } from "./motivational-message"

export function HotMessTracker() {
  const [lateToClass, setLateToClass] = useState(0)
  const [lostCharger, setLostCharger] = useState(0)
  const [riskyText, setRiskyText] = useState(0)
  const [procrastination, setProcrastination] = useState(0)
  const [history, setHistory] = useState<any[]>([])
  const [showMessage, setShowMessage] = useState(false)

  const hotMessScore = Math.round((lateToClass + lostCharger + riskyText + procrastination) / 4)

  useEffect(() => {
    const saved = localStorage.getItem("hotMessHistory")
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = () => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      score: hotMessScore,
      timestamp: new Date().getTime(),
    }
    const updated = [newEntry, ...history].slice(0, 10)
    setHistory(updated)
    localStorage.setItem("hotMessHistory", JSON.stringify(updated))
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 4000)
  }

  const handleReset = () => {
    setLateToClass(0)
    setLostCharger(0)
    setRiskyText(0)
    setProcrastination(0)
    setShowMessage(false)
  }

  return (
    <div className="w-full max-w-2xl">
      <Card className="bg-white/90 backdrop-blur border-old-rose/20 shadow-2xl rounded-3xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-murrey mb-2 font-sans">Hot Mess</h1>
          <p className="text-lg text-old-rose font-medium">Track Your Chaos Level ✨</p>
        </div>

        {/* Emoji Reaction */}
        <div className="flex justify-center mb-8">
          <EmojiReaction score={hotMessScore} />
        </div>

        {/* Score Display */}
        <div className="bg-gradient-to-r from-misty-rose to-misty-rose-2 rounded-2xl p-6 mb-8 text-center">
          <p className="text-sm text-murrey/70 font-semibold uppercase tracking-wide">Your Hot Mess Score</p>
          <p className="text-5xl font-bold text-murrey mt-2">{hotMessScore}/100</p>
          <p className="text-sm text-old-rose mt-2 mt-4 font-medium">{getScoreLabel(hotMessScore)}</p>
        </div>

        {/* Sliders */}
        <div className="space-y-6 mb-8">
          <SliderControl label="Late to Class" value={lateToClass} onChange={setLateToClass} icon="🏃" />
          <SliderControl label="Lost Charger" value={lostCharger} onChange={setLostCharger} icon="🔌" />
          <SliderControl label="Sent Risky Text" value={riskyText} onChange={setRiskyText} icon="📱" />
          <SliderControl label="Procrastination" value={procrastination} onChange={setProcrastination} icon="⏰" />
        </div>

        {/* Motivational Message */}
        {showMessage && <MotivationalMessage score={hotMessScore} />}

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-murrey hover:bg-murrey/90 text-white font-semibold py-6 rounded-xl text-lg transition-all transform hover:scale-105"
          >
            Save & Get Message
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 border-2 border-old-rose text-old-rose hover:bg-misty-rose font-semibold py-6 rounded-xl text-lg bg-transparent"
          >
            Reset
          </Button>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8 pt-8 border-t-2 border-misty-rose">
            <h3 className="text-sm font-semibold text-murrey uppercase tracking-wide mb-4">Recent Entries</h3>
            <div className="space-y-2">
              {history.slice(0, 5).map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center bg-tea-green/30 p-3 rounded-lg text-sm">
                  <span className="text-murrey font-medium">{entry.date}</span>
                  <span className="font-bold text-old-rose">{entry.score}/100</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

function getScoreLabel(score: number): string {
  if (score < 20) return "You're doing great! Keep it up! ✨"
  if (score < 40) return "A little chaotic, but manageable 💪"
  if (score < 60) return "Things are getting spicy 🌶️"
  if (score < 80) return "Full hot mess mode activated 🔥"
  return "Peak chaos energy - this is your superpower! 🚀"
}
