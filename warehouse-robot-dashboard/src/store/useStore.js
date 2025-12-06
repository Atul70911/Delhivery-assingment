import { create } from 'zustand'
import { generateMockBots } from '../utils/mockData'

export const useStore = create((set, get) => ({
  // Auth state
  isAuthenticated: false,
  user: null,
  
  // Bot state
  bots: generateMockBots(10),
  
  // Task state
  tasks: [],
  pendingTasks: [],
  completedTasks: [],
  
  // Analytics data
  analyticsData: {
    dailyTasks: [],
    botUtilization: [],
    errorLogs: [],
  },

  // Auth actions
  login: (email, password) => {
    // Mock authentication
    if (email && password) {
      set({ 
        isAuthenticated: true, 
        user: { email, name: email.split('@')[0] } 
      })
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  },

  signup: (email, password, name) => {
    // Mock signup
    if (email && password && name) {
      set({ 
        isAuthenticated: true, 
        user: { email, name } 
      })
      return { success: true }
    }
    return { success: false, error: 'All fields required' }
  },

  logout: () => {
    set({ 
      isAuthenticated: false, 
      user: null 
    })
  },

  // Bot actions
  updateBotData: () => {
    set((state) => ({
      bots: state.bots.map(bot => ({
        ...bot,
        battery: Math.max(0, Math.min(100, bot.battery + (Math.random() * 10 - 5))),
        status: ['idle', 'busy', 'charging', 'error'][Math.floor(Math.random() * 4)],
        speed: Math.random() * 5,
        lastUpdated: new Date().toLocaleTimeString(),
        position: {
          x: Math.max(50, Math.min(750, bot.position.x + (Math.random() * 40 - 20))),
          y: Math.max(50, Math.min(350, bot.position.y + (Math.random() * 40 - 20))),
        }
      }))
    }))
  },

  // Task actions
  addTask: (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    set((state) => ({
      tasks: [...state.tasks, newTask],
      pendingTasks: [...state.pendingTasks, newTask]
    }))
  },

  removeOldestTask: () => {
    set((state) => {
      if (state.pendingTasks.length === 0) return state
      
      const [removedTask, ...remainingTasks] = state.pendingTasks
      return {
        pendingTasks: remainingTasks,
        completedTasks: [...state.completedTasks, { ...removedTask, status: 'completed' }]
      }
    })
  },

  // Get stats
  getStats: () => {
    const state = get()
    return {
      totalBots: state.bots.length,
      activeTasks: state.bots.filter(b => b.status === 'busy').length,
      idleBots: state.bots.filter(b => b.status === 'idle').length,
      errorBots: state.bots.filter(b => b.status === 'error').length,
      pendingTasks: state.pendingTasks.length,
      completedTasks: state.completedTasks.length,
    }
  },

  // Initialize analytics data
  initializeAnalytics: () => {
    const dailyTasks = Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      completed: Math.floor(Math.random() * 50) + 20,
      pending: Math.floor(Math.random() * 20) + 5,
      failed: Math.floor(Math.random() * 10),
    }))

    const botUtilization = Array.from({ length: 10 }, (_, i) => ({
      name: `Bot ${i + 1}`,
      utilization: Math.floor(Math.random() * 40) + 60,
      tasks: Math.floor(Math.random() * 30) + 10,
    }))

    const errorLogs = Array.from({ length: 5 }, (_, i) => ({
      time: `${10 + i}:00`,
      errors: Math.floor(Math.random() * 5),
    }))

    set({
      analyticsData: {
        dailyTasks,
        botUtilization,
        errorLogs,
      }
    })
  },
}))