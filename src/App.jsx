
import { Routes, Route } from 'react-router-dom'
import './App.css'
import PrivateRoute from './routes/PrivateRoutes'

function App() {

  return (
    <Routes>
      <Route path="/" element={<h1>Good</h1>} />
      <Route element={<PrivateRoute roles={['admin']} />}>
        
      </Route>

    </Routes>
  )
}

export default App
