export default function InsightCard({ insight, darkMode }) {
  return (
    <div className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
      <div className="flex items-start gap-4">
        <span className="text-4xl">{insight.emoji}</span>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-apple-text'}`}>
            Insight
          </h3>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-apple-secondary'}`}>
            {insight.message}
          </p>
        </div>
      </div>
    </div>
  )
}
