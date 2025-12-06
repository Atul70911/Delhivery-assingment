import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import TaskCard from '../components/TaskCard'
import { Clock, CheckCircle2, Trash2 } from 'lucide-react'

const TaskQueue = () => {
  const { pendingTasks, completedTasks, removeOldestTask } = useStore()

  useEffect(() => {
    // Remove one task every 3 seconds (simulate assignment)
    const interval = setInterval(() => {
      removeOldestTask()
    }, 3000)

    return () => clearInterval(interval)
  }, [removeOldestTask])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Queue</h1>
        <p className="text-gray-600">Monitor pending and completed tasks (auto-processes every 3s)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl font-bold text-orange-900">Pending Tasks</h2>
          </div>
          <p className="text-4xl font-bold text-orange-600">{pendingTasks.length}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-green-900">Completed Tasks</h2>
          </div>
          <p className="text-4xl font-bold text-green-600">{completedTasks.length}</p>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Pending Queue</h2>
          <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg">
            <p className="text-sm text-blue-800">
              <Trash2 className="w-4 h-4 inline mr-1" />
              Auto-processing: 1 task every 3 seconds
            </p>
          </div>
        </div>

        {pendingTasks.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Pending Tasks</h3>
            <p className="text-gray-500">All tasks have been processed or no tasks created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recently Completed</h2>
        {completedTasks.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Completed Tasks</h3>
            <p className="text-gray-500">Completed tasks will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTasks.slice(-6).reverse().map((task) => (
              <div key={task.id} className="opacity-75">
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskQueue