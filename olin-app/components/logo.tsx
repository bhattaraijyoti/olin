export function OlinLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2.5" />

      {/* Single flowing line representing "one line" concept */}
      <path d="M 25 50 Q 35 35 50 40 T 75 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Small accent dot */}
      <circle cx="50" cy="68" r="3" fill="currentColor" />
    </svg>
  )
}
