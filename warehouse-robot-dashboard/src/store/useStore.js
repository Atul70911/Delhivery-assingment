import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateMockBots, generateMockTasks, generateAnalyticsData } from '../utils/mockData'

export const useStore = create(
  persist(
    (set, get) => ({
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
              y: Math.max(0, Math.min(100, bot.position.y + (Math.random() - 0.5) * 10))
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
            id: Date.now().toString(),
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
            completedTasks: [...state.completedTasks, { ...oldest, status: 'completed' }]
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
    }),
    {
      name: 'warehouse-storage',
      // Add error handling and version
      version: 1,
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log('Error rehydrating state, using defaults:', error)
          // Clear corrupted localStorage
          localStorage.removeItem('warehouse-storage')
        }
      },
      // Only persist auth state, not bots/tasks
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
