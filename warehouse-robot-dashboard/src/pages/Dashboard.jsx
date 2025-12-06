import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import StatsCard from '../components/StatsCard'
import { Bot, CheckCircle, Circle, AlertCircle, Clock, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const { getStats, bots, updateBotData } = useStore()
  const stats = getStats()

  useEffect(() => {
    // Update bot data every 10 seconds
    const interval = setInterval(() => {
      updateBotData()
    }, 10000)

    return () => clearInterval(interval)
  }, [updateBotData])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Real-time monitoring of warehouse operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Bots"
          value={stats.totalBots}
          icon={Bot}
          color="bg-blue-500"
          trend={5}
        />
        <StatsCard
          title="Active Tasks"
          value={stats.activeTasks}
          icon={TrendingUp}
          color="bg-green-500"
          trend={12}
        />
        <StatsCard
          title="Idle Bots"
          value={stats.idleBots}
          icon={Circle}
          color="bg-yellow-500"
          trend={-3}
        />
        <StatsCard
          title="Bots in Error"
          value={stats.errorBots}
          icon={AlertCircle}
          color="bg-red-500"
          trend={-8}
        />
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatsCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          icon={Clock}
          color="bg-orange-500"
        />
        <StatsCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon={CheckCircle}
          color="bg-purple-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bot Status Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bots.slice(0, 6).map((bot) => (
            <div key={bot.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{bot.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  bot.status === 'idle' ? 'bg-green-100 text-green-800' :
                  bot.status === 'busy' ? 'bg-blue-100 text-blue-800' :
                  bot.status === 'charging' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {bot.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Battery: <span className="font-semibold">{Math.round(bot.battery)}%</span></p>
                <p className="truncate">Task: {bot.currentTask}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard