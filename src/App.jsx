
import { Routes, Route } from 'react-router-dom'
import './App.css'
import PrivateRoute from './routes/PrivateRoutes'
import Sidebar from './components/layouts/Sidebar'
import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route element={<PrivateRoute roles={['admin']} />}>
        
      </Route>

    </Routes>
  )
}

export default App
