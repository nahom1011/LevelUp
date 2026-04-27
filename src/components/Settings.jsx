export default function Settings({ darkMode, setDarkMode, setTasks, setDailySnapshots }) {
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setTasks([])
      setDailySnapshots([])
    }
  }
  
  const handleExport = () => {
    const data = {
      tasks: JSON.parse(localStorage.getItem('flowly-tasks') || '[]'),
      snapshots: JSON.parse(localStorage.getItem('flowly-snapshots') || '[]'),
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flowly-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  return (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-apple-text'}`}>
        Settings
      </h1>
      
      <div className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-apple-text'}`}>
              Dark Mode
            </h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-apple-secondary'}`}>
              Toggle dark appearance
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-8 rounded-full transition-colors ${
              darkMode ? 'bg-apple-blue' : 'bg-gray-300'
            }`}
          >
            <div className={`w-6 h-6 bg-white rounded-full transform transition-transform ${
              darkMode ? 'translate-x-7' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
      
      <div className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
        <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          Data Management
        </h3>
        <div className="space-y-3">
          <button
            onClick={handleExport}
            className={`w-full py-3 rounded-xl font-medium ${
              darkMode 
                ? 'bg-gray-700 text-white' 
                : 'bg-white text-apple-text'
            }`}
          >
            Export Data
          </button>
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl font-medium bg-red-500 text-white"
          >
            Reset All Data
          </button>
        </div>
      </div>
      
      <div className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          About FLOWLY
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-apple-secondary'}`}>
          Version 1.0.0
        </p>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-apple-secondary'}`}>
          A premium productivity intelligence system
        </p>
      </div>
    </div>
  )
}
