import { getTrendAnalysis, getStreak, getBestDay, getCategoryPerformance } from './analytics'

export function generateInsights(tasks, snapshots) {
  const insights = []
  
  if (snapshots.length === 0) {
    return [{ message: 'Start tracking your productivity to unlock insights', emoji: '✨' }]
  }
  
  // Trend analysis
  const trend = getTrendAnalysis(snapshots)
  if (trend) {
    if (trend.change > 10) {
      insights.push({
        message: "You're improving 📈",
        emoji: '📈',
        detail: `${Math.round(trend.change)}% increase from last week`
      })
    } else if (trend.change < -10) {
      insights.push({
        message: 'Your productivity dropped this week 📉',
        emoji: '📉',
        detail: `${Math.abs(Math.round(trend.change))}% decrease from last week`
      })
    }
  }
  
  // Streak
  const streak = getStreak(snapshots)
  if (streak >= 3) {
    insights.push({
      message: `${streak}-day streak 🔥`,
      emoji: '🔥',
      detail: 'Great consistency! Keep it up'
    })
  }
  
  // Best day
  if (snapshots.length >= 7) {
    const { bestDay, bestAvg } = getBestDay(snapshots)
    if (bestDay) {
      insights.push({
        message: `You are most productive on ${bestDay}s`,
        emoji: '⭐',
        detail: `${Math.round(bestAvg)}% average completion rate`
      })
    }
  }
  
  // Category performance
  if (tasks.length >= 5) {
    const { strongest, weakest } = getCategoryPerformance(tasks)
    if (strongest && weakest && strongest.category !== weakest.category) {
      insights.push({
        message: `${strongest.category} is your strongest category`,
        emoji: '💪',
        detail: `${strongest.percent}% completion rate`
      })
      
      if (weakest.percent < 50) {
        insights.push({
          message: `${weakest.category} needs attention`,
          emoji: '⚠️',
          detail: `Only ${weakest.percent}% completion rate`
        })
      }
    }
  }
  
  // Overload detection
  const today = new Date().toISOString().split('T')[0]
  const todaySnapshot = snapshots.find(s => s.date === today)
  if (todaySnapshot && todaySnapshot.totalTasks > 10 && todaySnapshot.percent < 50) {
    insights.push({
      message: 'You perform better with fewer tasks',
      emoji: '🎯',
      detail: 'Try focusing on 5-7 high-priority tasks'
    })
  }
  
  // Recent performance
  const recent = snapshots.slice(-3)
  const recentAvg = recent.reduce((sum, s) => sum + s.percent, 0) / recent.length
  if (recentAvg >= 80) {
    insights.push({
      message: 'Outstanding performance! 🌟',
      emoji: '🌟',
      detail: `${Math.round(recentAvg)}% average over last 3 days`
    })
  }
  
  return insights.length > 0 ? insights : [
    { message: 'Keep tracking to unlock more insights', emoji: '✨' }
  ]
}
