import { useState } from 'react'
import { useStore } from '../store/useStore'
import { taskPriorities, warehouseZones } from '../utils/mockData'
import { CheckCircle, Send } from 'lucide-react'

const TaskAllocation = () => {
  const addTask = useStore((state) => state.addTask)
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    priority: 'Medium',
    comments: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(formData)
    setFormData({ pickup: '', drop: '', priority: 'Medium', comments: '' })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Allocation</h1>
        <p className="text-gray-600">Create and assign new tasks to warehouse robots</p>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-300 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-900">Task Created Successfully!</h3>
            <p className="text-green-800 text-sm">The task has been added to the queue.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location *
              </label>
              <select
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select pickup zone</option>
                {warehouseZones.map((zone) => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Drop Location *
              </label>
              <select
                name="drop"
                value={formData.drop}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select drop zone</option>
                {warehouseZones.map((zone) => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {taskPriorities.map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority })}
                  className={`px-4 py-3 rounded-lg font-semibold transition ${
                    formData.priority === priority
                      ? priority === 'Critical' ? 'bg-red-600 text-white' :
                        priority === 'High' ? 'bg-orange-600 text-white' :
                        priority === 'Medium' ? 'bg-yellow-600 text-white' :
                        'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comments (Optional)
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any additional instructions or notes..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2 text-lg"
          >
            <Send className="w-5 h-5" />
            <span>Create Task</span>
          </button>
        </form>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Task Allocation Guide</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Select appropriate pickup and drop locations from warehouse zones</li>
          <li>• Set priority based on task urgency (Critical tasks are processed first)</li>
          <li>• Add comments for special handling instructions</li>
          <li>• Tasks appear instantly in the Task Queue page</li>
        </ul>
      </div>
    </div>
  )
}

export default TaskAllocation