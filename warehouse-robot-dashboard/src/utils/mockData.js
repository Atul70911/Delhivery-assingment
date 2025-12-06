export const generateMockBots = (count) => {
  const statuses = ['idle', 'busy', 'charging', 'error']
  const tasks = [
    'Moving Package A to Zone 3',
    'Scanning Inventory',
    'Returning to Base',
    'Picking Order #1234',
    'Charging',
    'Idle',
    'Error: Obstacle Detected',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Robot-${String(i + 1).padStart(3, '0')}`,
    battery: Math.floor(Math.random() * 100),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    currentTask: tasks[Math.floor(Math.random() * tasks.length)],
    speed: Math.random() * 5,
    lastUpdated: new Date().toLocaleTimeString(),
    position: {
      x: Math.random() * 700 + 50,
      y: Math.random() * 300 + 50,
    }
  }))
}

export const taskPriorities = ['Low', 'Medium', 'High', 'Critical']

export const warehouseZones = [
  'Zone A - Receiving',
  'Zone B - Storage',
  'Zone C - Picking',
  'Zone D - Packing',
  'Zone E - Shipping',
]