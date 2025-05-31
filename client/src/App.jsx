import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
