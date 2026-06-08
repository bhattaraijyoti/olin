import { Tabs } from "expo-router"
import Ionicon from "@expo/vector-icons/Ionicons" 

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicon name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicon name="compass" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
