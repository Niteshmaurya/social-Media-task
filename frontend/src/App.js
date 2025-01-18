import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/list" element={<HomePage />} />

      </Routes>
    </div>
  );
}

export default App;
