import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function Analytics({ dailySnapshots, darkMode }) {
  const sorted = [...dailySnapshots].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  const last7Days = sorted.slice(-7)
  const last30Days = sorted.slice(-30)
  
  const weeklyData = {
    labels: last7Days.map(s => new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [{
      label: 'Productivity %',
      data: last7Days.map(s => s.percent),
      borderColor: '#007AFF',
      backgroundColor: 'rgba(0, 122, 255, 0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  }
  
  const monthlyData = {
    labels: last30Days.map(s => new Date(s.date).getDate()),
    datasets: [{
      label: 'Productivity %',
      data: last30Days.map(s => s.percent),
      borderColor: '#007AFF',
      backgroundColor: 'rgba(0, 122, 255, 0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 2,
      pointHoverRadius: 4
    }]
  }
  
  const monthlyAvg = last30Days.length > 0
    ? Math.round(last30Days.reduce((sum, s) => sum + s.percent, 0) / last30Days.length)
    : 0
  
  const yearlyData = getYearlyData(sorted)
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
        titleColor: darkMode ? '#FFFFFF' : '#1D1D1F',
        bodyColor: darkMode ? '#D1D5DB' : '#6E6E73',
        borderColor: darkMode ? '#374151' : '#E5E5EA',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: darkMode ? '#374151' : '#F5F5F7',
          drawBorder: false
        },
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6E6E73'
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6E6E73'
        }
      }
    }
  }
  
  return (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-apple-text'}`}>
        Analytics
      </h1>
      
      <div className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          Weekly View
        </h2>
        <div className="h-64">
          <Line data={weeklyData} options={chartOptions} />
        </div>
      </div>
      
      <div className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
        <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          Monthly View
        </h2>
        <p className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          {monthlyAvg}% <span className="text-sm font-normal text-apple-secondary">average</span>
        </p>
        <div className="h-64">
          <Line data={monthlyData} options={chartOptions} />
        </div>
      </div>
      
      <div className={`${darkMode ? 'glass-dark' : 'glass'} p-6`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-apple-text'}`}>
          Yearly View
        </h2>
        <div className="h-64">
          <Bar data={yearlyData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}

function getYearlyData(snapshots) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthlyData = Array(12).fill(0).map(() => ({ total: 0, count: 0 }))
  
  snapshots.forEach(snap => {
    const month = new Date(snap.date).getMonth()
    monthlyData[month].total += snap.percent
    monthlyData[month].count++
  })
  
  const averages = monthlyData.map(m => m.count > 0 ? Math.round(m.total / m.count) : 0)
  
  return {
    labels: months,
    datasets: [{
      label: 'Monthly Average %',
      data: averages,
      backgroundColor: '#007AFF',
      borderRadius: 8
    }]
  }
}
