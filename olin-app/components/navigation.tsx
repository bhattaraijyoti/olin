"use client"

import { BookOpen, List } from "lucide-react"

interface NavigationProps {
  currentView: "entry" | "timeline"
  onViewChange: (view: "entry" | "timeline") => void
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-white/80 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-4 flex items-center justify-around h-20">
        <button
          onClick={() => onViewChange("entry")}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
            currentView === "entry"
              ? "text-coral bg-coral/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-medium">Today</span>
        </button>

        <button
          onClick={() => onViewChange("timeline")}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
            currentView === "timeline"
              ? "text-coral bg-coral/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <List className="w-5 h-5" />
          <span className="text-xs font-medium">Timeline</span>
        </button>
      </div>
    </nav>
  )
}
