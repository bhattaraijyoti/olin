"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

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

  return (
    <View className="space-y-8 pt-4">
      <View className="flex-row items-center justify-center gap-3 pb-4">
        <OlinLogo className="w-6 h-6 text-coral" />
        <Text className="text-3xl font-light text-foreground">Olin</Text>
      </View>

      <View className="items-center">
        <Text className="text-sm text-muted-foreground font-light tracking-wide">
          One line a day, a lifetime of memories
        </Text>
      </View>

      {streak > 0 && (
        <View className="justify-center items-center">
          <View className="flex-row items-center gap-2 bg-gradient-to-r from-coral/10 to-warmstone/10 border border-coral/30 rounded-full px-4 py-2">
            <Text className="text-coral">🔥</Text>
            <Text className="text-sm font-medium text-warmstone">{streak} day streak</Text>
          </View>
        </View>
      )}

      <View className="items-center space-y-1">
        <Text className="text-muted-foreground text-sm uppercase tracking-widest font-light">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <Text className="text-xs text-muted-foreground/60">Today's reflection</Text>
      </View>

      {hasEntryToday && (
        <View className="items-center">
          <View className="flex-row items-center gap-2 px-3 py-1 rounded-full border border-emerald-200/50">
            <Text>✓</Text>
            <Text className="text-sm text-emerald-600 font-medium">You've written today</Text>
          </View>
        </View>
      )}

      <View className="space-y-4 pt-4">
        <View className="relative">
          <TextInput
            value={sentence}
            onChangeText={(text) => {
              setSentence(text)
              setWordCount(text.split(/\s+/).filter((w) => w.length > 0).length)
            }}
            placeholder="Today was..."
            editable={!hasEntryToday}
            multiline
            textAlignVertical="top"
            className="w-full bg-white/60 border border-border/50 rounded-2xl p-6 text-lg text-foreground min-h-40"
          />

          {sentence.trim() && (
            <View className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 rounded">
              <Text className="text-xs text-muted-foreground/60">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!sentence.trim() || hasEntryToday}
          className="w-full mt-8 bg-coral rounded-xl py-4 items-center"
        >
          <Text className="text-white font-medium">
            {hasEntryToday ? "Already saved today" : "Save Entry →"}
          </Text>
        </TouchableOpacity>

        {showSuccess && (
          <View className="items-center">
            <Text className="text-sm text-emerald-600 font-medium">
              Entry saved beautifully
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
