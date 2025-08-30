
import { Routes, Route } from 'react-router-dom'
import './App.css'
import PrivateRoute from './routes/PrivateRoutes'
import DashboardPage from './pages/DashboardPage'
import CreateBlog from './components/creatBlog'

function App() {

  return (
    <Routes>
      <Route path="/user" element={<DashboardPage />} />
      <Route path="/creatblog" element={<CreateBlog />} />
      
      <Route element={<PrivateRoute roles={['admin']} />}>
        
      </Route>

    </Routes>
  )
}

export default App
