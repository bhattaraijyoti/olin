"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Entry {
  date: string
  emoji?: string
}

interface CalendarProps {
  entries: Entry[]
}

export function Calendar({ entries }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const entriesByDate = new Map(entries.map((e) => [e.date, e]))

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: startingDayOfWeek }, () => null)

  const monthEntries = days.filter((day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return entriesByDate.has(dateStr)
  }).length

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  return (
    <div className="space-y-6 pt-8 animate-in fade-in duration-500">
      {/* Header with stats */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-light text-stone-800">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <p className="text-sm text-stone-500 mt-2">{monthEntries} entries this month</p>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-white/50 rounded-lg transition-all">
          <ChevronLeft className="w-5 h-5 text-stone-600" />
        </button>
        <button onClick={handleNextMonth} className="p-2 hover:bg-white/50 rounded-lg transition-all">
          <ChevronRight className="w-5 h-5 text-stone-600" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-stone-500 uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {days.map((day, index) => {
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const hasEntry = entriesByDate.has(dateStr)
          const entry = entriesByDate.get(dateStr)

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(dateStr)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-light transition-all animate-in fade-in ${
                hasEntry
                  ? "bg-gradient-to-br from-orange-200 to-orange-100 text-stone-800 hover:from-orange-300 hover:to-orange-200"
                  : "bg-white/40 text-stone-600 hover:bg-white/60"
              } ${selectedDate === dateStr ? "ring-2 ring-orange-400" : ""}`}
              style={{ animationDelay: `${index * 15}ms` }}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span>{day}</span>
                {entry?.emoji && <span className="text-xs">{entry.emoji}</span>}
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Entry Preview */}
      {selectedDate && entriesByDate.has(selectedDate) && (
        <div className="mt-8 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-lg p-6 animate-in slide-in-from-bottom-4 duration-300">
          <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-stone-800 font-light leading-relaxed">{entriesByDate.get(selectedDate)?.sentence}</p>
        </div>
      )}
    </div>
  )
}
