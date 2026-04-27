export function saveDailySnapshot(tasks, snapshots, setSnapshots) {
  const today = new Date().toISOString().split('T')[0]
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const existingIndex = snapshots.findIndex(s => s.date === today)
  
  if (existingIndex >= 0) {
    const updated = [...snapshots]
    updated[existingIndex] = { date: today, totalTasks, completedTasks, percent }
    setSnapshots(updated)
  } else {
    setSnapshots([...snapshots, { date: today, totalTasks, completedTasks, percent }])
  }
}

export function getTrendAnalysis(snapshots) {
  if (snapshots.length < 7) return null
  
  const sorted = [...snapshots].sort((a, b) => new Date(b.date) - new Date(a.date))
  const last7 = sorted.slice(0, 7)
  const prev7 = sorted.slice(7, 14)
  
  const last7Avg = last7.reduce((sum, s) => sum + s.percent, 0) / last7.length
  const prev7Avg = prev7.length > 0 ? prev7.reduce((sum, s) => sum + s.percent, 0) / prev7.length : last7Avg
  
  const change = last7Avg - prev7Avg
  return { last7Avg, prev7Avg, change }
}

export function getStreak(snapshots) {
  const sorted = [...snapshots].sort((a, b) => new Date(b.date) - new Date(a.date))
  let streak = 0
  
  for (const snap of sorted) {
    if (snap.percent >= 60) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

export function getBestDay(snapshots) {
  const dayMap = {}
  
  snapshots.forEach(snap => {
    const day = new Date(snap.date).getDay()
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day]
    
    if (!dayMap[dayName]) {
      dayMap[dayName] = { total: 0, count: 0 }
    }
    dayMap[dayName].total += snap.percent
    dayMap[dayName].count++
  })
  
  let bestDay = null
  let bestAvg = 0
  
  Object.entries(dayMap).forEach(([day, data]) => {
    const avg = data.total / data.count
    if (avg > bestAvg) {
      bestAvg = avg
      bestDay = day
    }
  })
  
  return { bestDay, bestAvg }
}

export function getCategoryPerformance(tasks) {
  const categoryMap = {}
  
  tasks.forEach(task => {
    const cat = task.category || 'Personal'
    if (!categoryMap[cat]) {
      categoryMap[cat] = { total: 0, completed: 0 }
    }
    categoryMap[cat].total++
    if (task.completed) categoryMap[cat].completed++
  })
  
  const results = Object.entries(categoryMap).map(([cat, data]) => ({
    category: cat,
    percent: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
  }))
  
  results.sort((a, b) => b.percent - a.percent)
  
  return {
    strongest: results[0],
    weakest: results[results.length - 1]
  }
}
