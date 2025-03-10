import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import Estimates from "./pages/Estimates";
import RegisterUser from "./Users/RegisterUser";
import Login from "./Users/Login";

// import About from "./Pages/About";
import UserProfile from "./Users/UserProfile";
import { ContentWrapper } from "./style/HomeStyled";
import CreateAccEquip from "./pages/CreateAccEquip";
import SemiEstimate from "./pages/SemilEstimate";
// import Finalestimate from "./Pages/Finalestimate";
import UpdateProfile from "./Users/UpdateProfile";
import OneEstimate from "./pages/OneEstimate";
import AccesoriesAndEquipments from "./pages/AccesoriesAndEquipments";
import UpdateEstimate from "./Pages/UpdateEstimate";
function App() {
  const { user, logout } = useAuth();
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // For AM/PM format
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Router>
      <Navbar user={user} onLogOff={logout} />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oneEstimate/:id" element={<OneEstimate />} />

          <Route
            path="/estimates"
            element={<Estimates formatDateTime={formatDateTime} />}
          />
          <Route path="/accEquip" element={<CreateAccEquip />} />
          <Route
            path="/accesoriesAndEquiments"
            element={<AccesoriesAndEquipments />}
          />
          {/* <Route path="/final_estimate" element={<Finalestimate />} /> */}
          <Route path="/semi_estimate" element={<SemiEstimate />} />
          <Route path="/updateEstimate/:id" element={<UpdateEstimate />} />
          <Route path="/update_profile" element={<UpdateProfile />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <RegisterUser /> : <Navigate to="/" />}
          />
          {/* <Route path="/about" element={<About />} /> */}
          <Route
            path="/profile/:id"
            element={
              user ? (
                <UserProfile onLogOff={logout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </ContentWrapper>
    </Router>
  );
}

export default App;
