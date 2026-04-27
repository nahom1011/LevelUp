import { useState } from 'react'
import CircularProgress from './CircularProgress'
import InsightCard from './InsightCard'
import { generateInsights } from '../utils/insights'

export default function Dashboard({ tasks, setTasks, dailySnapshots, darkMode }) {
  const [newTask, setNewTask] = useState('')
  
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'
  
  const insights = generateInsights(tasks, dailySnapshots)
  const mainInsight = insights[0] || { message: 'Start adding tasks to track your productivity', emoji: '✨' }
  
  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    
    const task = {
      id: Date.now(),
      title: newTask,
      category: 'Personal',
      priority: 'Medium',
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    setTasks([...tasks, task])
    setNewTask('')
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pt-4 animate-float">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-2">
          {greeting}
        </h1>
        <p className="text-white/80 text-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      {/* Progress Card */}
      <div className="glass p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CircularProgress percent={percent} darkMode={darkMode} />
        <div className="text-center mt-6 relative z-10">
          <p className="text-6xl font-bold text-white drop-shadow-lg animate-pulse-slow">
            {percent}%
          </p>
          <p className="text-white/70 text-sm mt-3">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
      </div>
      
      {/* Insight Card */}
      <InsightCard insight={mainInsight} darkMode={darkMode} />
      
      {/* Add Task Input */}
      <form onSubmit={handleAddTask} className="glass p-2 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="✨ Add a new task..."
          className="w-full px-6 py-4 rounded-2xl bg-black/50 text-white placeholder-white/40 focus:outline-none focus:bg-black/30 transition-all duration-300 border border-white/10 focus:border-white/20"
        />
      </form>
      
      {/* Tasks List */}
      <div className="glass p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Today's Tasks
        </h3>
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/50 text-lg">No tasks yet</p>
            <p className="text-white/30 text-sm mt-2">Add one above to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.slice(-5).reverse().map((task, index) => (
              <div
                key={task.id}
                className="glass-card p-4 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        const updated = tasks.map(t =>
                          t.id === task.id
                            ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : null }
                            : t
                        )
                        setTasks(updated)
                      }}
                      className="w-6 h-6 rounded-full appearance-none border-2 border-white/30 checked:bg-gradient-to-br checked:from-green-400 checked:to-blue-500 checked:border-transparent transition-all duration-300 cursor-pointer"
                    />
                    {task.completed && (
                      <svg className="w-4 h-4 text-white absolute top-1 left-1 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`flex-1 text-white transition-all duration-300 ${
                    task.completed ? 'line-through opacity-40' : 'opacity-100'
                  }`}>
                    {task.title}
                  </span>
                  {task.completed && (
                    <span className="text-2xl animate-bounce">✨</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
