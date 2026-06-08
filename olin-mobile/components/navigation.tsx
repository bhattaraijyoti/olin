"use client"

import { View, Text, TouchableOpacity } from "react-native"
import Svg, { Path, Line } from "react-native-svg"



interface NavigationProps {
  currentView: "entry" | "timeline"
  onViewChange: (view: "entry" | "timeline") => void
}

function BookOpen({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 24 24" fill="none" className={className}>
      <Path
        d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function List({ className }: { className?: string }) {
  return (
    <Svg viewBox="0 0 24 24" fill="none" className={className}>
      <Line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <Line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  )
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-white/80">
      <View className="px-4 flex-row items-center justify-around h-20">
        <TouchableOpacity
          onPress={() => onViewChange("entry")}
          className={`flex-col items-center gap-1 p-3 rounded-xl ${
            currentView === "entry"
              ? "text-coral bg-coral/10"
              : "text-muted-foreground"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <Text className="text-xs font-medium">Today</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onViewChange("timeline")}
          className={`flex-col items-center gap-1 p-3 rounded-xl ${
            currentView === "timeline"
              ? "text-coral bg-coral/10"
              : "text-muted-foreground"
          }`}
        >
          <List className="w-5 h-5" />
          <Text className="text-xs font-medium">Timeline</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
