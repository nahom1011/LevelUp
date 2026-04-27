import { generateInsights } from '../utils/insights'

export default function Insights({ tasks, dailySnapshots, darkMode }) {
  const insights = generateInsights(tasks, dailySnapshots)
  
  return (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-apple-text'}`}>
        Insights
      </h1>
      
      <div className="space-y-4">
        {insights.length === 0 ? (
          <div className={`${darkMode ? 'glass-dark' : 'glass'} p-12 text-center`}>
            <p className={darkMode ? 'text-gray-400' : 'text-apple-secondary'}>
              Keep tracking your tasks to unlock insights
            </p>
          </div>
        ) : (
          insights.map((insight, index) => (
            <div key={index} className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
              <div className="flex items-start gap-4">
                <span className="text-4xl">{insight.emoji}</span>
                <div className="flex-1">
                  <p className={`text-lg ${darkMode ? 'text-white' : 'text-apple-text'}`}>
                    {insight.message}
                  </p>
                  {insight.detail && (
                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-apple-secondary'}`}>
                      {insight.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
