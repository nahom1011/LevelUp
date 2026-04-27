import { generateInsights } from '../utils/insights'

export default function Insights({ tasks, dailySnapshots, darkMode }) {
  const insights = generateInsights(tasks, dailySnapshots)
  
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
        💡 Insights
      </h1>
      
      <div className="space-y-4">
        {insights.length === 0 ? (
          <div className="glass p-16 text-center">
            <div className="text-6xl mb-4 animate-float">🔮</div>
            <p className="text-white/50 text-xl">Keep tracking to unlock insights</p>
            <p className="text-white/30 text-sm mt-2">Complete more tasks to see your patterns</p>
          </div>
        ) : (
          insights.map((insight, index) => (
            <div 
              key={index} 
              className="glass p-6 relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-start gap-5 relative z-10">
                <div className="text-5xl animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  {insight.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-white text-xl font-semibold leading-relaxed mb-2">
                    {insight.message}
                  </p>
                  {insight.detail && (
                    <p className="text-white/60 text-sm leading-relaxed">
                      {insight.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Tips Section */}
      {insights.length > 0 && (
        <div className="glass p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-700/20" />
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>💫</span>
              Pro Tips
            </h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">✓</span>
                <span>Aim for 60%+ completion rate to maintain streaks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">✓</span>
                <span>Focus on 5-7 high-priority tasks for optimal performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">✓</span>
                <span>Review your analytics weekly to identify patterns</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
