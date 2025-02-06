import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MechanicTrackingProvider } from "./context/MechanicTracking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import GaragePanel from "./pages/GaragePanel";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <MechanicTrackingProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/garage" element={<GaragePanel />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </Router>
      </MechanicTrackingProvider>
    </AuthProvider>
  );
}

export default App;
