"use client"

import { useState } from "react"
// Removed lucide-react icon imports, replaced with inline SVG components below.
import { Button } from "@/components/ui/button"

interface Entry {
  id: string
  date: string
  sentence: string
}

interface TimelineProps {
  entries: Entry[]
  onDeleteEntry: (id: string) => void
}

function Trash2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  )
}

function Download(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function Timeline({ entries, onDeleteEntry }: TimelineProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<"text" | "date">("text")

  const sortedEntries = [...entries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((e) => {
      if (searchType === "date") {
        return e.date.includes(searchQuery) || new Date(e.date).toLocaleDateString().includes(searchQuery)
      }
      return e.sentence.toLowerCase().includes(searchQuery.toLowerCase())
    })

  const calculateStreak = () => {
    if (entries.length === 0) return 0

    const dates = [...entries]
      .map((e) => new Date(e.date).toDateString())
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

    let longestStreak = 1
    let currentStreak = 1

    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1])
      const curr = new Date(dates[i])

      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)

      if (diff === 1) {
        currentStreak++
        longestStreak = Math.max(longestStreak, currentStreak)
      } else if (diff > 1) {
        currentStreak = 1
      }
    }

    return longestStreak
  }

  const streak = calculateStreak()

  const handleExport = () => {
    const text = sortedEntries.map((e) => `${e.date}\n${e.sentence}\n`).join("\n---\n\n")

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
    element.setAttribute("download", `olin-entries-${new Date().toISOString().split("T")[0]}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6 pt-2 animate-in fade-in duration-500">
      {/* Header with Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-light text-foreground">Timeline</h2>
            <p className="text-muted-foreground text-sm mt-1">{entries.length} memories captured</p>
          </div>
          <Button
            onClick={handleExport}
            className="bg-white/60 border border-border/50 hover:bg-white/80 text-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {entries.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground font-light">Longest Streak</span>
                <span className="text-lg">🔥</span>
              </div>
              <p className="text-2xl font-light text-coral">{streak} days</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground font-light">Longest Entry</span>
                <span className="text-lg">📝</span>
              </div>
              <p className="text-2xl font-light text-warmstone">
                {Math.max(...entries.map((e) => e.sentence.split(" ").length))} words
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Search with Type Toggle */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => setSearchType("text")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              searchType === "text" ? "bg-coral text-white" : "bg-white/50 text-muted-foreground hover:bg-white/70"
            }`}
          >
            Text
          </button>
          <button
            onClick={() => setSearchType("date")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              searchType === "date" ? "bg-coral text-white" : "bg-white/50 text-muted-foreground hover:bg-white/70"
            }`}
          >
            Date
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchType === "date" ? "Search by date (e.g., 2024-01-15)..." : "Search entries..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/60 backdrop-blur-sm border border-border/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral/30 transition-all"
          />
        </div>
      </div>

      {/* Entries List */}
      {sortedEntries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            {searchQuery ? "No entries match your search." : "No entries yet. Start your journey today."}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {sortedEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="bg-white/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:bg-white/80 transition-all group animate-in fade-in slide-in-from-left-2 shadow-sm"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-warmstone">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-foreground font-light leading-relaxed break-words">{entry.sentence}</p>
                  <p className="text-xs text-muted-foreground mt-2">{entry.sentence.split(" ").length} words</p>
                </div>
                <button
                  onClick={() => (deletingId === entry.id ? onDeleteEntry(entry.id) : setDeletingId(entry.id))}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
