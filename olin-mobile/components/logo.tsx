import Svg, { Circle, Path } from "react-native-svg"

export function OlinLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <Svg viewBox="0 0 100 100" fill="none" className={className}>
      <Circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" />

      <Path
        d="M 25 50 Q 35 35 50 40 T 75 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      <Circle cx="50" cy="68" r="3" fill="currentColor" />
    </Svg>
  )
}
