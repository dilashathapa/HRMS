import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loginform from './pages/login'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import EmployeeForm from './pages/Employee'
import Dashboard from "./pages/dashboard"
import ProtectedRoute from './components/utils/protectedRoute'
import Unauthorized from './components/utils/Unauthorize'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes> 
      <Route path ="/" element = {<Loginform/>} />
      <Route path = "/unauthorized" element = {<Unauthorized/>} />
      <Route path = "home" element = {
        <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
      }
      >
       <Route path = "employee" element = {
        <ProtectedRoute allowedRoles={["hr","manager","admin"]}>
       <EmployeeForm/>
      </ProtectedRoute>}
      />
        <Route path="dashboard" element={<Dashboard/>}/>
      
      </Route>
    </Routes>
    </>
  );

}

export default App
