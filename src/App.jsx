import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/config";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
// import ClientsPage from "./pages/ClientsPage";
import ServicesPage from "./pages/ServicesPage";
import DiscountPage from "./pages/DiscountPage";
// import ChatbotPage from "./pages/ChatbotPage";
import Loader from "./components/Loader";
import TawkMessenger from "./components/TawkMessenger";


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
          <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/dashboard" replace />} />
          <Route path="/forgot-password" element={!user ? <ForgotPasswordPage /> : <Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
           <Route path="/services" element={<ServicesPage />} />
            <Route path="/discounts" element={<DiscountPage />} />
      
          <Route path="/" element={
            <ProtectedRoute user={user}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            {/* <Route path="clients" element={<ClientsPage />} /> */}
            
            {/* <Route path="chatbot" element={<ChatbotPage />} /> */}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
        <TawkMessenger />
     
      </div>
    </Router>
    
  );
}

export default App;