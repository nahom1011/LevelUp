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
      <div className="text-center pt-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          {greeting}
        </h1>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-apple-secondary'}`}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className={`${darkMode ? 'glass-dark' : 'glass'} p-8`}>
        <CircularProgress percent={percent} darkMode={darkMode} />
        <div className="text-center mt-6">
          <p className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-apple-text'}`}>
            {percent}%
          </p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-apple-secondary'}`}>
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
      </div>
      
      <InsightCard insight={mainInsight} darkMode={darkMode} />
      
      <form onSubmit={handleAddTask} className={`${darkMode ? 'glass-dark' : 'glass'} p-4`}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className={`w-full px-4 py-3 rounded-xl ${
            darkMode 
              ? 'bg-gray-800 text-white placeholder-gray-500' 
              : 'bg-white text-apple-text placeholder-apple-secondary'
          } focus:outline-none focus:ring-2 focus:ring-apple-blue`}
        />
      </form>
      
      <div className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          Today's Tasks
        </h3>
        {tasks.length === 0 ? (
          <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-apple-secondary'}`}>
            No tasks yet. Add one above!
          </p>
        ) : (
          <div className="space-y-2">
            {tasks.slice(-5).reverse().map(task => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
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
                  className="w-5 h-5 rounded-full accent-apple-blue"
                />
                <span className={`flex-1 ${task.completed ? 'line-through opacity-50' : ''} ${
                  darkMode ? 'text-white' : 'text-apple-text'
                }`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
