import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import TaskManager from './components/TaskManager'
import Analytics from './components/Analytics'
import Insights from './components/Insights'
import Settings from './components/Settings'
import Navigation from './components/Navigation'
import { useLocalStorage } from './hooks/useLocalStorage'
import { saveDailySnapshot } from './utils/analytics'

function App() {
  const [tasks, setTasks] = useLocalStorage('flowly-tasks', [])
  const [dailySnapshots, setDailySnapshots] = useLocalStorage('flowly-snapshots', [])
  const [darkMode, setDarkMode] = useLocalStorage('flowly-darkmode', false)
  const [activeScreen, setActiveScreen] = useState('dashboard')

  useEffect(() => {
    saveDailySnapshot(tasks, dailySnapshots, setDailySnapshots)
  }, [tasks])

  const screens = {
    dashboard: <Dashboard tasks={tasks} setTasks={setTasks} dailySnapshots={dailySnapshots} />,
    tasks: <TaskManager tasks={tasks} setTasks={setTasks} />,
    analytics: <Analytics dailySnapshots={dailySnapshots} />,
    insights: <Insights tasks={tasks} dailySnapshots={dailySnapshots} />,
    settings: <Settings darkMode={darkMode} setDarkMode={setDarkMode} setTasks={setTasks} setDailySnapshots={setDailySnapshots} />
  }

  return (
    <div className={`min-h-screen pb-24 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400'
    }`}>
      <div className="max-w-2xl mx-auto px-4 py-6 animate-scale-in">
        {screens[activeScreen]}
      </div>
      <Navigation activeScreen={activeScreen} setActiveScreen={setActiveScreen} darkMode={darkMode} />
    </div>
  )
}

export default App
