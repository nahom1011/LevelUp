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
      borderColor: 'rgba(102, 126, 234, 1)',
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      tension: 0.4,
      fill: true,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: 'rgba(102, 126, 234, 1)',
      pointBorderColor: 'rgba(255, 255, 255, 0.8)',
      pointBorderWidth: 2,
      borderWidth: 3
    }]
  }
  
  const monthlyData = {
    labels: last30Days.map(s => new Date(s.date).getDate()),
    datasets: [{
      label: 'Productivity %',
      data: last30Days.map(s => s.percent),
      borderColor: 'rgba(118, 75, 162, 1)',
      backgroundColor: 'rgba(118, 75, 162, 0.2)',
      tension: 0.4,
      fill: true,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: 'rgba(118, 75, 162, 1)',
      pointBorderColor: 'rgba(255, 255, 255, 0.8)',
      pointBorderWidth: 2,
      borderWidth: 3
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 16,
        cornerRadius: 12,
        displayColors: false,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 16 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: { size: 12 }
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: { size: 12 }
        }
      }
    }
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
        📊 Analytics
      </h1>
      
      {/* Weekly View */}
      <div className="glass p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <span>📅</span>
            Weekly View
          </h2>
          <p className="text-white/60 text-sm mb-6">Last 7 days performance</p>
          <div className="h-64">
            <Line data={weeklyData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* Monthly View */}
      <div className="glass p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <span>📆</span>
            Monthly View
          </h2>
          <div className="flex items-baseline gap-2 mb-6">
            <p className="text-5xl font-bold text-white">{monthlyAvg}%</p>
            <p className="text-white/60 text-sm">average this month</p>
          </div>
          <div className="h-64">
            <Line data={monthlyData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* Yearly View */}
      <div className="glass p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <span>📈</span>
            Yearly View
          </h2>
          <p className="text-white/60 text-sm mb-6">Monthly averages throughout the year</p>
          <div className="h-64">
            <Bar data={yearlyData} options={chartOptions} />
          </div>
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
      backgroundColor: 'rgba(102, 126, 234, 0.8)',
      borderRadius: 12,
      borderWidth: 0
    }]
  }
}
