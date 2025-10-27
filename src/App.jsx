import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/admin/Admin";
import AdminDash from "./pages/admin/AdminDash";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} /> ✅ Add this


        <Route path="/admin/login" element={<Admin/>} />
        <Route path="/admin/dashboard" element={<AdminDash/>} />
      </Routes>
    </Router>
  );
}

export default App;
