import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import Login from "./Pages/Login";
import Cyberque from "./Pages/cyberque.jsx";
import Signup from "./Pages/Signup.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import OTP from "./Pages/Otp.jsx";

import Profile from "./Pages/profile.jsx";
import Admin from "./Pages/Admin.jsx";
import ProblemDetails from "./Pages/problem.jsx";
function App() {
  /*const appStyles = {
    minHeight: "100vh", // Matches Chakra's minH="100vh"
    backgroundColor: "#0f0a19", // Matches Chakra's bg="#0f0a19"
    color: "#6c757d", // Matches Chakra's color="gray.500"
    padding: "32px 24px", // Matches Chakra's px={6} and py={8}
  };
*/
  return (
    //<div style={appStyles}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Cyberque />} />
      <Route path="/codeeditor" element={<CodeEditor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/problem/:problemTitle" element={<ProblemDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
   // </div>
  );
}

export default App;
