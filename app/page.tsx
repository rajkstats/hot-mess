"use client"

import { HotMessTracker } from "@/components/hot-mess-tracker"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-misty-rose via-misty-rose-2 to-tea-green flex items-center justify-center p-4">
      <HotMessTracker />
    </main>
  )
}
