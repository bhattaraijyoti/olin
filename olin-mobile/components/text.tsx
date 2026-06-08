import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"

export default function TextScreen() {
  const [entry, setEntry] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    if (!entry.trim()) {
      Alert.alert("Empty Entry", "Please write one sentence before saving.")
      return
    }

    setIsSaved(true)

    Alert.alert(
      "Saved ✨",
      "You have already written your sentence for today."
    )
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F8FAF7" }}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={{ paddingHorizontal: 24, paddingTop: 70 }}>
        <Text
          style={{
            color: "#64748B",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Daily Journal
        </Text>

        <Text
          style={{
            color: "#0F172A",
            fontSize: 38,
            fontWeight: "900",
            marginTop: 6,
          }}
        >
          Write your day ✨
        </Text>

        <Text
          style={{
            color: "#475569",
            fontSize: 16,
            marginTop: 12,
            lineHeight: 24,
          }}
        >
          Write a single sentence that captures your entire day.
        </Text>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 28,
            padding: 22,
            marginTop: 28,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          }}
        >
          <Text
            style={{
              color: "#0F172A",
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 16,
            }}
          >
            One sentence for today ✨
          </Text>

          <TextInput
            placeholder={
              isSaved
                ? "You already wrote your sentence today ✨"
                : "Write one sentence about your day..."
            }
            placeholderTextColor="#94A3B8"
            multiline
            editable={!isSaved}
            maxLength={180}
            value={entry}
            onChangeText={(text) => {
              const firstSentence = text.match(/.*?[.!?](\s|$)/)

              if (firstSentence) {
                setEntry(firstSentence[0].trim())
              } else {
                setEntry(text)
              }
            }}
            textAlignVertical="top"
            style={{
              minHeight: 120,
              color: isSaved ? "#64748B" : "#0F172A",
              fontSize: 18,
              lineHeight: 30,
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isSaved}
          onPress={handleSave}
          style={{
            backgroundColor: isSaved ? "#94A3B8" : "#0F172A",
            paddingVertical: 18,
            borderRadius: 22,
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            {isSaved ? "Entry Saved" : "Save Today's Sentence"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}