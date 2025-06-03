import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import CustomerDashBoard from "./pages/CustomerDashBoard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<CustomerDashBoard/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
