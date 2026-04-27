import { useState } from 'react'

const categories = ['Work', 'Study', 'Fitness', 'Personal']
const priorities = ['Low', 'Medium', 'High']

const categoryEmojis = {
  Work: '💼',
  Study: '📚',
  Fitness: '💪',
  Personal: '✨'
}

const priorityColors = {
  High: 'from-red-500 to-pink-500',
  Medium: 'from-yellow-500 to-orange-500',
  Low: 'from-green-500 to-emerald-500'
}

export default function TaskManager({ tasks, setTasks, darkMode }) {
  const [filter, setFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Personal',
    priority: 'Medium'
  })
  
  const filteredTasks = filter === 'All' 
    ? tasks 
    : tasks.filter(t => t.category === filter)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id 
          ? { ...t, ...formData }
          : t
      ))
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
      }
      setTasks([...tasks, newTask])
    }
    
    setFormData({ title: '', category: 'Personal', priority: 'Medium' })
    setShowAddModal(false)
    setEditingTask(null)
  }
  
  const handleEdit = (task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      category: task.category,
      priority: task.priority
    })
    setShowAddModal(true)
  }
  
  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          ✓ Tasks
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="glass-button px-6 py-3 rounded-2xl text-white font-semibold flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Task
        </button>
      </div>
      
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-2xl whitespace-nowrap font-medium transition-all duration-300 ${
              filter === cat
                ? 'glass-button text-white scale-105'
                : 'bg-gray-800/60 text-white/60 hover:bg-gray-700/60 hover:text-white'
            }`}
          >
            {cat !== 'All' && categoryEmojis[cat]} {cat}
          </button>
        ))}
      </div>
      
      {/* Tasks Grid */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="glass p-16 text-center">
            <p className="text-white/50 text-xl">No tasks in this category</p>
            <p className="text-white/30 text-sm mt-2">Create one to get started!</p>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="glass-card p-5 group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${priorityColors[task.priority]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="relative mt-1">
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
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-white text-lg transition-all duration-300 ${
                    task.completed ? 'line-through opacity-40' : ''
                  }`}>
                    {task.title}
                  </h3>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800/60 text-white/80 border border-white/10">
                      {categoryEmojis[task.category]} {task.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${priorityColors[task.priority]} text-white`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-3 py-1.5 rounded-xl bg-gray-700/60 hover:bg-gray-600/60 text-white text-sm transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-scale-in">
          <div className="glass max-w-md w-full p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-3xl" />
            
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">
              {editingTask ? '✏️ Edit Task' : '✨ New Task'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Task title..."
                required
                className="w-full px-5 py-4 rounded-2xl bg-black/50 text-white placeholder-white/30 focus:outline-none focus:bg-black/30 transition-all duration-300 border border-white/10 focus:border-white/20"
              />
              
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-black/50 text-white focus:outline-none focus:bg-black/30 transition-all duration-300 border border-white/10 focus:border-white/20"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {categoryEmojis[cat]} {cat}
                  </option>
                ))}
              </select>
              
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-black/50 text-white focus:outline-none focus:bg-black/30 transition-all duration-300 border border-white/10 focus:border-white/20"
              >
                {priorities.map(pri => (
                  <option key={pri} value={pri} className="bg-gray-900">{pri}</option>
                ))}
              </select>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingTask(null)
                    setFormData({ title: '', category: 'Personal', priority: 'Medium' })
                  }}
                  className="flex-1 py-4 rounded-2xl bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 glass-button py-4 rounded-2xl text-white font-semibold"
                >
                  {editingTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
