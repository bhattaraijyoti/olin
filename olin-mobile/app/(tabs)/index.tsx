"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { OlinLogo } from "@/components/logo"
import TextScreen from "@/components/text"

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
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem("olin-entries")

        if (stored) {
          const parsedEntries = JSON.parse(stored)
          setEntries(parsedEntries)
        }

        // Always show onboarding on app open
        setShowOnboarding(true)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const saveEntries = async (newEntries: Entry[]) => {
    try {
      setEntries(newEntries)
      await AsyncStorage.setItem("olin-entries", JSON.stringify(newEntries))
    } catch (error) {
      console.error("Failed to save entries:", error)
    }
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
    setShowOnboarding(false)
  }

  const handleDeleteEntry = (id: string) => {
    saveEntries(entries.filter((e) => e.id !== id))
  }

  const Card = ({ children }: any) => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
      }}
    >
      {children}
    </View>
  )

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F1E8" }}>
        <StatusBar barStyle="dark-content" />

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 92,
                height: 92,
                borderRadius: 28,
                backgroundColor: "#111827",
                borderWidth: 1,
                borderColor: "#1F2937",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <OlinLogo className="w-12 h-12 text-[#F97316]" />
            </View>

            <Text style={{ color: "white", fontSize: 28, fontWeight: "800" }}>
              Olin
            </Text>

            <Text style={{ color: "#94A3B8", marginTop: 6 }}>
              Your reflection space
            </Text>

            <ActivityIndicator style={{ marginTop: 18 }} color="#F97316" />
          </View>
        </View>
      </SafeAreaView>
    )
  }

  if (showOnboarding) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F1E8" }}>
        <StatusBar barStyle="dark-content" />

        <ScrollView contentContainerStyle={{ padding: 22, paddingTop: 40, paddingBottom: 40 }}>
          <View style={{ alignItems: "center", marginBottom: 28 }}>
            <View
              style={{
                width: 110,
                height: 110,
                borderRadius: 32,
                backgroundColor: "#111827",
                borderWidth: 1,
                borderColor: "#1F2937",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <OlinLogo className="w-14 h-14 text-[#F97316]" />
            </View>

            <Text style={{ color: "white", fontSize: 40, fontWeight: "900" }}>
              Olin
            </Text>

            <Text style={{ color: "#94A3B8", textAlign: "center", marginTop: 10, fontSize: 16 }}>
              A calm space to write one meaningful thought every day.
            </Text>
          </View>

          <View style={{ gap: 12 }}>
            <Card>
              <Text style={{ fontSize: 28, marginBottom: 8 }}>✍️</Text>
              <Text style={{ color: "#0F172A", fontSize: 18, fontWeight: "700" }}>
                One Sentence Daily
              </Text>
              <Text style={{ color: "#64748B", marginTop: 6, lineHeight: 20 }}>
                Capture your thoughts quickly without distractions.
              </Text>
            </Card>

            <Card>
              <Text style={{ fontSize: 28, marginBottom: 8 }}>🕰️</Text>
              <Text style={{ color: "#0F172A", fontSize: 18, fontWeight: "700" }}>
                Timeline View
              </Text>
              <Text style={{ color: "#64748B", marginTop: 6, lineHeight: 20 }}>
                Watch your ideas grow into your personal story.
              </Text>
            </Card>

            <Card>
              <Text style={{ fontSize: 28, marginBottom: 8 }}>🔒</Text>
              <Text style={{ color: "#0F172A", fontSize: 18, fontWeight: "700" }}>
                Private by Default
              </Text>
              <Text style={{ color: "#64748B", marginTop: 6, lineHeight: 20 }}>
                Everything stays on your device only.
              </Text>
            </Card>
          </View>

          <Pressable
            onPress={() => {
              setShowOnboarding(false)
            }}
            style={{
              marginTop: 22,
              backgroundColor: "#F97316",
              paddingVertical: 16,
              borderRadius: 18,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>
              Start Writing
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F1E8" }}>
      <StatusBar barStyle="dark-content" />

      <TextScreen />
    </SafeAreaView>
  )
}
