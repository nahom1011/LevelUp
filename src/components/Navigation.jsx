export default function Navigation({ activeScreen, setActiveScreen, darkMode }) {
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'tasks', icon: '✓', label: 'Tasks' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'insights', icon: '💡', label: 'Insights' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ]
  
  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-t`}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-colors ${
                activeScreen === item.id
                  ? 'text-apple-blue'
                  : darkMode
                  ? 'text-gray-400'
                  : 'text-apple-secondary'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
