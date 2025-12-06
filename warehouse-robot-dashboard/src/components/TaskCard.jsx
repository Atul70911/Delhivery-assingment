import { Clock, MapPin, Flag } from 'lucide-react'

const TaskCard = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-green-100 text-green-800 border-green-300'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">Task #{task.id}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${getPriorityColor(task.priority)}`}>
          <Flag className="w-3 h-3" />
          <span>{task.priority}</span>
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-gray-500">Pickup:</p>
            <p className="font-medium text-gray-800">{task.pickup}</p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-gray-500">Drop:</p>
            <p className="font-medium text-gray-800">{task.drop}</p>
          </div>
        </div>

        {task.comments && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500">Comments:</p>
            <p className="text-sm text-gray-700">{task.comments}</p>
          </div>
        )}

        <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2">
          <Clock className="w-3 h-3" />
          <span>{new Date(task.createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard