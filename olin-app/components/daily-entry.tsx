"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Flame, Check } from "lucide-react"
import { OlinLogo } from "@/components/logo"

interface DailyEntryProps {
  onAddEntry: (sentence: string) => void
  entries: Array<{ date: string; sentence: string }>
}

export function DailyEntry({ onAddEntry, entries }: DailyEntryProps) {
  const [sentence, setSentence] = useState("")
  const [hasEntryToday, setHasEntryToday] = useState(false)
  const [streak, setStreak] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const todayEntry = entries.find((e) => e.date === today)
    if (todayEntry) {
      setSentence("")
      setHasEntryToday(true)
      setWordCount(0)
    } else {
      setSentence("")
      setHasEntryToday(false)
      setWordCount(0)
    }

    // Calculate current streak
    let currentStreak = 0
    const checkDate = new Date()
    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0]
      if (entries.some((e) => e.date === dateStr)) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }
    setStreak(currentStreak)
  }, [entries])

  const handleSubmit = () => {
    if (sentence.trim()) {
      onAddEntry(sentence)
      setSentence("")
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setSentence(text)
    setWordCount(text.split(/\s+/).filter((w) => w.length > 0).length)
  }

  return (
    <div className="space-y-8 pt-4 animate-in fade-in duration-500">
      {/* Header with Logo */}
      <div className="flex items-center justify-center gap-3 pb-4">
        <OlinLogo className="w-6 h-6 text-coral" />
        <h1 className="text-3xl font-light text-foreground">Olin</h1>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground font-light tracking-wide">One line a day, a lifetime of memories</p>
      </div>

      {/* Streak Badge */}
      {streak > 0 && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-coral/10 to-warmstone/10 border border-coral/30 rounded-full px-4 py-2 animate-in zoom-in duration-500">
            <Flame className="w-5 h-5 text-coral" />
            <span className="text-sm font-medium text-warmstone">{streak} day streak</span>
          </div>
        </div>
      )}

      {/* Date Display */}
      <div className="text-center space-y-1">
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-light">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-xs text-muted-foreground/60">Today's reflection</p>
      </div>

      {/* Entry Status */}
      {hasEntryToday && (
        <div className="text-center animate-in slide-in-from-bottom-2 duration-500">
          <div className="inline-flex items-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50/50 px-3 py-1 rounded-full border border-emerald-200/50">
            <Check className="w-4 h-4" />
            You've written today
          </div>
        </div>
      )}

      {/* Main Input */}
      <div className="space-y-4 pt-4">
        <div className="relative">
          <textarea
            value={sentence}
            onChange={handleInputChange}
            placeholder="Today was..."
            disabled={hasEntryToday}
            className="w-full bg-white/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-lg text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/30 resize-none min-h-40 font-light transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          />
          {sentence.trim() && (
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/60 bg-white/80 px-2 py-1 rounded">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!sentence.trim() || hasEntryToday}
          className="w-full mt-8 bg-gradient-to-r from-warmstone to-coral hover:from-warmstone/90 hover:to-coral/90 text-white font-medium rounded-xl py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {hasEntryToday ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Already saved today
            </>
          ) : (
            <>
              Save Entry
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        {/* Success Message */}
        {showSuccess && (
          <div className="animate-in fade-in duration-300 text-center">
            <p className="text-sm text-emerald-600 font-medium">Entry saved beautifully</p>
          </div>
        )}
      </div>
    </div>
  )
}
