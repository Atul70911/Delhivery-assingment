import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import BotCard from '../components/BotCard'
import { RefreshCw } from 'lucide-react'

const BotStatus = () => {
  const { bots, updateBotData } = useStore()

  useEffect(() => {
    // Auto-update every 10 seconds
    const interval = setInterval(() => {
      updateBotData()
    }, 10000)

    return () => clearInterval(interval)
  }, [updateBotData])

  const handleManualRefresh = () => {
    updateBotData()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Bot Status</h1>
          <p className="text-gray-600">Real-time status of all warehouse robots (updates every 10s)</p>
        </div>
        <button
          onClick={handleManualRefresh}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Auto-Update Active</h3>
        <p className="text-blue-800 text-sm">
          Bot data automatically refreshes every 10 seconds. Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default BotStatus