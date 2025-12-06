// Generate mock robot data
export const generateMockBots = (count = 10) => {
  const statuses = ['idle', 'busy', 'charging', 'error']
  const zones = ['A', 'B', 'C', 'D', 'E']
  
  return Array.from({ length: count }, (_, i) => ({
    id: `BOT-${String(i + 1).padStart(3, '0')}`,
    name: `Robot ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    battery: Math.floor(Math.random() * 100),
    currentTask: Math.random() > 0.5 ? `Task-${Math.floor(Math.random() * 100)}` : null,
    position: {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      zone: zones[Math.floor(Math.random() * zones.length)]
    },
    lastUpdated: new Date(Date.now() - Math.random() * 3600000).toISOString()
  }))
}

// Generate mock task data
export const generateMockTasks = (count = 10, status = 'pending') => {
  const priorities = ['low', 'medium', 'high', 'urgent']
  const zones = ['A', 'B', 'C', 'D', 'E']
  
  return Array.from({ length: count }, (_, i) => ({
    id: `TASK-${String(Date.now() + i).slice(-6)}`,
    pickup: `Zone ${zones[Math.floor(Math.random() * zones.length)]}-${Math.floor(Math.random() * 20) + 1}`,
    dropoff: `Zone ${zones[Math.floor(Math.random() * zones.length)]}-${Math.floor(Math.random() * 20) + 1}`,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: status,
    assignedBot: status === 'completed' ? `BOT-${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}` : null,
    createdAt: new Date(Date.now() - Math.random() * 7200000).toISOString(),
    completedAt: status === 'completed' ? new Date().toISOString() : null
  }))
}

// Generate analytics data
export const generateAnalyticsData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  return {
    dailyTasks: days.map(day => ({
      day,
      completed: Math.floor(Math.random() * 50) + 20,
      pending: Math.floor(Math.random() * 20) + 5,
      failed: Math.floor(Math.random() * 5)
    })),
    
    botUtilization: days.map((day, i) => ({
      day,
      utilization: Math.floor(Math.random() * 30) + 60,
      tasks: Math.floor(Math.random() * 40) + 20
    })),
    
    botStatus: [
      { name: 'Idle', value: Math.floor(Math.random() * 15) + 5 },
      { name: 'Busy', value: Math.floor(Math.random() * 20) + 10 },
      { name: 'Charging', value: Math.floor(Math.random() * 10) + 3 },
      { name: 'Error', value: Math.floor(Math.random() * 5) + 1 }
    ],
    
    errorTrends: days.map(day => ({
      day,
      errors: Math.floor(Math.random() * 8) + 1
    }))
  }
}
