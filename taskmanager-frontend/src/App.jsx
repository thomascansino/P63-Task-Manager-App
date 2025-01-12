import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login.jsx'
import Register from './Register.jsx'
import ForgotPass from './ForgotPass.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import Dashboard from './Dashboard.jsx'
import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPass />}/>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
