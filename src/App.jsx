import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BloodRequestDashboard from "./pages/BloodRequestDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestBlood from "./pages/RequestBlood";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request-blood" element={<RequestBlood />} />
          <Route path="/blood-requests" element={<BloodRequestDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
