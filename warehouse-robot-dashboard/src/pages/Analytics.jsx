import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Activity, AlertTriangle } from 'lucide-react'

const Analytics = () => {
  const { analyticsData, initializeAnalytics } = useStore()

  useEffect(() => {
    initializeAnalytics()
  }, [initializeAnalytics])

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

  // Status distribution data
  const { bots } = useStore()
  const statusData = [
    { name: 'Idle', value: bots.filter(b => b.status === 'idle').length },
    { name: 'Busy', value: bots.filter(b => b.status === 'busy').length },
    { name: 'Charging', value: bots.filter(b => b.status === 'charging').length },
    { name: 'Error', value: bots.filter(b => b.status === 'error').length },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into warehouse operations</p>
      </div>

      {/* Why These Charts Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-blue-900 mb-3">📊 Chart Selection Rationale</h2>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>1. Bar Chart (Daily Tasks):</strong> Best for comparing task volumes across days. Shows trends in completed, pending, and failed tasks to identify peak periods.</p>
          <p><strong>2. Line Chart (Bot Utilization):</strong> Ideal for showing individual bot performance trends. Helps identify underutilized or overworked robots.</p>
          <p><strong>3. Pie Chart (Bot Status):</strong> Perfect for showing proportional distribution of bot states at a glance. Quickly identifies operational health.</p>
          <p><strong>4. Line Chart (Error Trends):</strong> Tracks error patterns over time to predict maintenance needs and system reliability.</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="space-y-8">
        {/* Daily Tasks - Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Daily Task Performance</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.dailyTasks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#10B981" name="Completed" />
              <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
              <Bar dataKey="failed" fill="#EF4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bot Utilization - Line Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800">Bot Utilization Rate</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.botUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="utilization" stroke="#3B82F6" strokeWidth={2} name="Utilization %" />
              <Line type="monotone" dataKey="tasks" stroke="#10B981" strokeWidth={2} name="Tasks Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bot Status Distribution - Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Bot Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Error Trends - Line Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-800">Error Occurrence Trends</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.errorLogs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="errors" stroke="#EF4444" strokeWidth={3} name="Errors" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Peak Performance</h3>
          <p className="text-sm text-blue-800">Wednesday shows highest task completion rate</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">High Utilization</h3>
          <p className="text-sm text-green-800">Average bot utilization is 75% - optimal range</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
          <h3 className="font-semibold text-red-900 mb-2">Error Monitoring</h3>
          <p className="text-sm text-red-800">Error rate trending down - system improving</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics
