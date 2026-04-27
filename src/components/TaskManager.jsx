import { useState } from 'react'

const categories = ['Work', 'Study', 'Fitness', 'Personal']
const priorities = ['Low', 'Medium', 'High']

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
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          Tasks
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-apple-blue text-white px-6 py-2 rounded-full font-medium"
        >
          + Add
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              filter === cat
                ? 'bg-apple-blue text-white'
                : darkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-white text-apple-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className={`${darkMode ? 'glass-dark' : 'glass'} p-12 text-center`}>
            <p className={darkMode ? 'text-gray-400' : 'text-apple-secondary'}>
              No tasks in this category
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`${darkMode ? 'glass-dark' : 'glass'} p-4`}
            >
              <div className="flex items-start gap-3">
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
                  className="w-5 h-5 mt-1 rounded-full accent-apple-blue"
                />
                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? 'line-through opacity-50' : ''} ${
                    darkMode ? 'text-white' : 'text-apple-text'
                  }`}>
                    {task.title}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-apple-secondary'
                    }`}>
                      {task.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'High' ? 'bg-red-100 text-red-600' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className={`text-sm ${darkMode ? 'text-gray-400' : 'text-apple-secondary'}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 max-w-md w-full`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-apple-text'}`}>
              {editingTask ? 'Edit Task' : 'New Task'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Task title"
                required
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-100 text-apple-text placeholder-apple-secondary'
                } focus:outline-none focus:ring-2 focus:ring-apple-blue`}
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-apple-text'
                } focus:outline-none focus:ring-2 focus:ring-apple-blue`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-apple-text'
                } focus:outline-none focus:ring-2 focus:ring-apple-blue`}
              >
                {priorities.map(pri => (
                  <option key={pri} value={pri}>{pri}</option>
                ))}
              </select>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingTask(null)
                    setFormData({ title: '', category: 'Personal', priority: 'Medium' })
                  }}
                  className={`flex-1 py-3 rounded-xl ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-apple-text'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-apple-blue text-white py-3 rounded-xl font-medium"
                >
                  {editingTask ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
