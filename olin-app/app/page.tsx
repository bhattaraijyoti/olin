"use client"

import { useState, useEffect } from "react"
import { DailyEntry } from "@/components/daily-entry"
import { Timeline } from "@/components/timeline"
import { Navigation } from "@/components/navigation"
import { OlinLogo } from "@/components/logo"

type ViewType = "entry" | "timeline"

interface Entry {
  id: string
  date: string
  sentence: string
  createdAt: number
}

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [view, setView] = useState<ViewType>("entry")
  const [loading, setLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("olin-entries")
    const seen = localStorage.getItem("olin-seen")
    if (stored) {
      setEntries(JSON.parse(stored))
    }
    if (!seen && (!stored || JSON.parse(stored).length === 0)) {
      setShowOnboarding(true)
    }
    setLoading(false)
  }, [])

  const saveEntries = (newEntries: Entry[]) => {
    setEntries(newEntries)
    localStorage.setItem("olin-entries", JSON.stringify(newEntries))
  }

  const handleAddEntry = (sentence: string) => {
    const today = new Date().toISOString().split("T")[0]
    const existingIndex = entries.findIndex((e) => e.date === today)

    let newEntries
    if (existingIndex >= 0) {
      newEntries = [...entries]
      newEntries[existingIndex] = {
        ...newEntries[existingIndex],
        sentence,
      }
    } else {
      newEntries = [
        ...entries,
        {
          id: Date.now().toString(),
          date: today,
          sentence,
          createdAt: Date.now(),
        },
      ]
    }

    saveEntries(newEntries)
    localStorage.setItem("olin-seen", "true")
    setShowOnboarding(false)
  }

  const handleDeleteEntry = (id: string) => {
    saveEntries(entries.filter((e) => e.id !== id))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gradient-to-br from-cream via-cream to-sage" />
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-sage">
        <main className="max-w-2xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="space-y-16 pt-12">
            {/* Logo & Branding */}
            <div className="text-center space-y-6 animate-in fade-in duration-700">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-warmstone via-coral to-warmstone opacity-30 blur-2xl rounded-full"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm">
                    <OlinLogo className="w-16 h-16 text-coral" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-light text-foreground tracking-tight">
                  <span className="bg-gradient-to-r from-warmstone via-coral to-warmstone bg-clip-text text-transparent font-semibold">
                    Olin
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light">
                  One line a day, a lifetime of memories
                </p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="grid md:grid-cols-3 gap-6 animate-in fade-in duration-700 delay-200">
              <div className="text-center space-y-3 p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-border/50">
                <div className="text-3xl">✨</div>
                <h3 className="font-medium text-foreground">Minimal & Pure</h3>
                <p className="text-sm text-muted-foreground">Just you and your thoughts, one sentence at a time</p>
              </div>
              <div className="text-center space-y-3 p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-border/50">
                <div className="text-3xl">📝</div>
                <h3 className="font-medium text-foreground">Easy Ritual</h3>
                <p className="text-sm text-muted-foreground">Build a daily habit that feels natural and rewarding</p>
              </div>
              <div className="text-center space-y-3 p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-border/50">
                <div className="text-3xl">🔒</div>
                <h3 className="font-medium text-foreground">Always Yours</h3>
                <p className="text-sm text-muted-foreground">Your memories stay private, saved locally forever</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-8 animate-in fade-in duration-700 delay-400">
              <p className="text-lg text-muted-foreground font-light">Ready to start capturing your days?</p>
              <button
                onClick={() => {
                  setShowOnboarding(false)
                  localStorage.setItem("olin-seen", "true")
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-warmstone to-coral text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Begin Your Journey
                <span className="text-xl">→</span>
              </button>
              <p className="text-xs text-muted-foreground">No account needed. Your data is always yours.</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream to-sage">
      <main className="max-w-2xl mx-auto px-4 py-8 pb-28">
        {view === "entry" && <DailyEntry onAddEntry={handleAddEntry} entries={entries} />}
        {view === "timeline" && <Timeline entries={entries} onDeleteEntry={handleDeleteEntry} />}
      </main>

      <Navigation currentView={view} onViewChange={setView} />
    </div>
  )
}
