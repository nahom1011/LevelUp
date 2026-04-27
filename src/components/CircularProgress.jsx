export default function CircularProgress({ percent, darkMode }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  
  return (
    <div className="flex justify-center">
      <svg width="180" height="180" className="transform -rotate-90">
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke={darkMode ? '#374151' : '#E5E5EA'}
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#007AFF"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
    </div>
  )
}
