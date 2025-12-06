import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import BotStatus from './pages/BotStatus'
import TaskAllocation from './pages/TaskAllocation'
import TaskQueue from './pages/TaskQueue'
import Analytics from './pages/Analytics'
import MapView from './pages/MapView'

function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  return (
    <Router basename="/Delhivery-assingment">  {/* ← ADD THIS */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bots" element={<BotStatus />} />
            <Route path="/allocate-task" element={<TaskAllocation />} />
            <Route path="/task-queue" element={<TaskQueue />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/map" element={<MapView />} />
          </Route>
          
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
