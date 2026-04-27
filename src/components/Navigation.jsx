export default function Navigation({ activeScreen, setActiveScreen, darkMode }) {
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'tasks', icon: '✓', label: 'Tasks' },
    { id: 'analytics', icon: '📊', label: 'Stats' },
    { id: 'insights', icon: '💡', label: 'Insights' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ]
  
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-2xl mx-auto">
        <div className="glass p-2 rounded-3xl">
          <div className="flex justify-around items-center">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`relative flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 ${
                  activeScreen === item.id
                    ? 'bg-gray-800/80 scale-110'
                    : 'hover:bg-gray-800/40 hover:scale-105'
                }`}
              >
                {activeScreen === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/40 to-gray-600/40 rounded-2xl blur-xl" />
                )}
                <span className={`text-2xl mb-1 relative z-10 transition-transform duration-300 ${
                  activeScreen === item.id ? 'scale-125' : ''
                }`}>
                  {item.icon}
                </span>
                <span className={`text-xs font-medium relative z-10 transition-all duration-300 ${
                  activeScreen === item.id
                    ? 'text-white opacity-100'
                    : 'text-white/60 opacity-0'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
