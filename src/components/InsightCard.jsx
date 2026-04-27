export default function InsightCard({ insight, darkMode }) {
  return (
    <div className="glass p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start gap-4 relative z-10">
        <div className="text-5xl animate-float">
          {insight.emoji}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
            💡 Insight
          </h3>
          <p className="text-white text-lg font-medium leading-relaxed">
            {insight.message}
          </p>
        </div>
      </div>
    </div>
  )
}
