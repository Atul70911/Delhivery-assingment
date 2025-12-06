import { Battery, Zap, AlertCircle, Plug } from 'lucide-react'

const BotCard = ({ bot }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'idle':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'busy':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'charging':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'busy':
        return <Zap className="w-4 h-4" />
      case 'charging':
        return <Plug className="w-4 h-4" />
      case 'error':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getBatteryColor = (battery) => {
    if (battery > 60) return 'text-green-600'
    if (battery > 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{bot.name}</h3>
          <p className="text-sm text-gray-500">ID: #{bot.id}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${getStatusColor(bot.status)}`}>
          {getStatusIcon(bot.status)}
          <span>{bot.status.toUpperCase()}</span>
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Battery className={`w-5 h-5 ${getBatteryColor(bot.battery)}`} />
            <span className="text-sm text-gray-600">Battery</span>
          </div>
          <span className={`font-bold ${getBatteryColor(bot.battery)}`}>
            {Math.round(bot.battery)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              bot.battery > 60 ? 'bg-green-600' : bot.battery > 30 ? 'bg-yellow-600' : 'bg-red-600'
            }`}
            style={{ width: `${bot.battery}%` }}
          />
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 mb-1">Current Task:</p>
          <p className="text-sm font-medium text-gray-700">{bot.currentTask}</p>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <p className="text-gray-500">Speed</p>
            <p className="font-semibold text-gray-800">{bot.speed.toFixed(2)} m/s</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Updated</p>
            <p className="font-semibold text-gray-800">{bot.lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BotCard