import { Link } from "expo-router"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "@/hooks/use-color-scheme"

export default function ModalScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDark ? "#070B14" : "#F6F7FB" },
      ]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* subtle background glow */}
      <View
        style={[
          styles.glow,
          { backgroundColor: isDark ? "#1E293B" : "#E0E7FF" },
        ]}
      />

      <View style={styles.container}>
        {/* top bar */}
        <View style={styles.topBar}>
          <Link href="/(tabs)" asChild>
            <Pressable style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </Link>
        </View>

        {/* card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
              borderColor: isDark ? "#1F2937" : "#E5E7EB",
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDark ? "#111827" : "#EEF2FF" },
            ]}
          >
            <Text style={styles.icon}>✨</Text>
          </View>

          <Text
            style={[
              styles.title,
              { color: isDark ? "#FFFFFF" : "#0F172A" },
            ]}
          >
            Welcome to Olin
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: isDark ? "#94A3B8" : "#475569" },
            ]}
          >
            Your thoughts, organized beautifully
          </Text>

          <View style={styles.divider} />

          <Text
            style={[
              styles.description,
              { color: isDark ? "#94A3B8" : "#475569" },
            ]}
          >
            Capture ideas, reflections, and memories in a clean daily flow.
            This space is designed to feel calm, focused, and distraction-free.
          </Text>

          <Link href="/(tabs)" asChild>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
              ]}
            >
              <Text style={styles.buttonText}>Start Writing</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  glow: {
    position: "absolute",
    top: -120,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.25,
  },

  container: {
    flex: 1,
    padding: 22,
    paddingTop: 60,
    justifyContent: "center",
  },

  topBar: {
    position: "absolute",
    top: 10,
    right: 18,
    left: 18,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100,116,139,0.15)",
  },

  closeText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#64748B",
    lineHeight: 18,
  },

  card: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
    borderRadius: 34,
    paddingVertical: 38,
    paddingHorizontal: 24,
    alignItems: "center",
    borderWidth: 1,

    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },

  iconContainer: {
    width: 78,
    height: 78,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  icon: {
    fontSize: 34,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: 6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    marginBottom: 18,
    textAlign: "center",
  },

  divider: {
    width: 60,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#6366F1",
    marginBottom: 18,
  },

  description: {
    fontSize: 15.5,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 6,
  },

  button: {
    width: "100%",
    backgroundColor: "#6366F1",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    transform: [{ scale: 1 }],
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
})