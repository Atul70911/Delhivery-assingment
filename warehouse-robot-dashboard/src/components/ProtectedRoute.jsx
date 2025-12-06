import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from '../store/useStore'

const ProtectedRoute = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute