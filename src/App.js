import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/components/hompage";
import LoginForm from "../src/components/Loginsignup";
import OfflineForms from "../src/components/offline_forms";
import LeaveApprovalDashboard from "./components/Staff_Login_am";
import LeaveForm from "../src/components/Student_Login"
import LoginFormstaff from "../src/components/Loginsignupstaff";
import ForgotPassword from "../src/components/forgotpassword"; 
import ForgotPasswordstaff from "../src/components/forgotpasswordstaff"; 
import LeaveHistory from "../src/components/Leavehistory";
import SportsPersonPage from "../src/components/sport";

import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Remove global loader
const loader = document.getElementById('global-loader');
if (loader) {
  loader.style.display = 'none';
}


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/LoginFormstaff" element={<LoginFormstaff />} />
        <Route path="/LoginFormstaff/LeaveApprovalDashboard" element={<LeaveApprovalDashboard />} />
        <Route path="/LoginFormstaff/LeaveApprovalDashboard/LeaveHistory" element={<LeaveHistory />} />
        <Route path="/LoginForm/LeaveForm" element={<LeaveForm />} />
        <Route path="/OfflineForms" element={<OfflineForms />} />
        <Route path="/LoginForm/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/LoginFormstaff/ForgotPasswordstaff" element={<ForgotPasswordstaff />} />
        <Route path="/SportsPersonPage" element={<SportsPersonPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
