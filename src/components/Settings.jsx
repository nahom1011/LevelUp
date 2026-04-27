export default function Settings({ darkMode, setDarkMode, setTasks, setDailySnapshots }) {
  const handleReset = () => {
    if (confirm('⚠️ Are you sure you want to reset all data? This cannot be undone.')) {
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
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
        ⚙️ Settings
      </h1>
      
      {/* Dark Mode Toggle */}
      <div className="glass p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h3 className="font-semibold text-white text-lg flex items-center gap-2">
              <span>🌙</span>
              Dark Mode
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Toggle dark appearance
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-16 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          >
            <div className="absolute top-1 left-9 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300" />
          </button>
        </div>
      </div>
      
      {/* Data Management */}
      <div className="glass p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
        <div className="relative z-10">
          <h3 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <span>💾</span>
            Data Management
          </h3>
          <div className="space-y-3">
            <button
              onClick={handleExport}
              className="w-full glass-button py-4 rounded-2xl text-white font-medium flex items-center justify-center gap-2"
            >
              <span>📥</span>
              Export Data
            </button>
            <button
              onClick={handleReset}
              className="w-full py-4 rounded-2xl font-medium bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 border border-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>🗑️</span>
              Reset All Data
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Card */}
      <div className="glass p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
        <div className="relative z-10">
          <h3 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
            <span>📊</span>
            Your Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Total Tasks</p>
              <p className="text-white text-3xl font-bold">
                {JSON.parse(localStorage.getItem('flowly-tasks') || '[]').length}
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Days Tracked</p>
              <p className="text-white text-3xl font-bold">
                {JSON.parse(localStorage.getItem('flowly-snapshots') || '[]').length}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* About */}
      <div className="glass p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <div className="relative z-10 text-center">
          <div className="text-5xl mb-3 animate-float">✨</div>
          <h3 className="font-bold text-white text-xl mb-2">
            FLOWLY
          </h3>
          <p className="text-white/60 text-sm">
            Version 1.0.0
          </p>
          <p className="text-white/40 text-xs mt-2">
            A premium productivity intelligence system
          </p>
        </div>
      </div>
    </div>
  )
}
