import { create } from 'zustand'
import { generateMockBots, generateMockTasks, generateAnalyticsData } from '../utils/mockData'

export const useStore = create((set, get) => ({
  // Auth state
  user: null,
  isAuthenticated: false,

  login: (email, password) => {
    set({ 
      user: { email, name: email.split('@')[0] },
      isAuthenticated: true 
    })
  },

  signup: (name, email, password) => {
    set({ 
      user: { email, name },
      isAuthenticated: true 
    })
  },

  logout: () => {
    set({ 
      user: null,
      isAuthenticated: false 
    })
  },

  // Bot state
  bots: generateMockBots(10),
  
  updateBotData: () => {
    set((state) => ({
      bots: state.bots.map(bot => ({
        ...bot,
        battery: Math.max(10, Math.min(100, bot.battery + (Math.random() - 0.3) * 5)),
        position: {
          x: Math.max(0, Math.min(100, bot.position.x + (Math.random() - 0.5) * 10)),
          y: Math.max(0, Math.min(100, bot.position.y + (Math.random() - 0.5) * 10)),
          zone: bot.position.zone
        },
        lastUpdated: new Date().toISOString()
      }))
    }))
  },

  // Task state
  pendingTasks: generateMockTasks(8, 'pending'),
  completedTasks: generateMockTasks(5, 'completed'),

  addTask: (task) => {
    set((state) => ({
      pendingTasks: [...state.pendingTasks, {
        ...task,
        id: `TASK-${Date.now().toString().slice(-6)}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      }]
    }))
  },

  removeOldestTask: () => {
    set((state) => {
      if (state.pendingTasks.length === 0) return state
      const [oldest, ...rest] = state.pendingTasks
      return {
        pendingTasks: rest,
        completedTasks: [...state.completedTasks, { 
          ...oldest, 
          status: 'completed',
          completedAt: new Date().toISOString()
        }]
      }
    })
  },

  // Analytics
  analyticsData: generateAnalyticsData(),
  
  initializeAnalytics: () => {
    set({ analyticsData: generateAnalyticsData() })
  },

  // Computed stats
  getStats: () => {
    const state = get()
    return {
      totalBots: state.bots.length,
      activeTasks: state.bots.filter(b => b.status === 'busy').length,
      idleBots: state.bots.filter(b => b.status === 'idle').length,
      errorBots: state.bots.filter(b => b.status === 'error').length,
      pendingTasks: state.pendingTasks.length,
      completedTasks: state.completedTasks.length
    }
  }
}))
