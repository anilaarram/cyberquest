import React from "react";
import "../Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import "../Styles/cyberque.css";

const Dashboard = () => {

    const navigate = useNavigate();
    const handlesolve = () => { 
        navigate("/problem")
    }

  return (
    <div>
      {/* Header Section */}
      <header>
        <div className="logo">
          <svg
            className="network-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24"
          >
            <path
              d="M480 856q-88 0-149-61t-61-149q0-88 61-149t149-61q88 0 149 61t61 149q0 88-61 149t-149 61Zm0-60q70 0 120-49.5T650 626q0-70-50-120t-120-50q-70 0-120 50T310 626q0 70 50 119.5T480 796ZM176 976V758q-53-57-84.5-131T60 476q0-161 112.5-273.5T446 90q161 0 273.5 112.5T832 476q0 73-31.5 147T716 758v218H176Zm60-60h420V736l11-11q45-45 72.5-108.5T768 476q0-132-91-223t-223-91q-132 0-223 91t-91 223q0 64 27.5 127.5T299 725l11 11v180Zm210-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-120Zm0 402Z"
            />
          </svg>
          <span className="animated-logo">CyberQuest</span>
        </div>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/profile">Profile</a>
          <a href="/logout">Logout</a>
        </nav>
      </header>

      {/* Welcome Section */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2 style={{ color: "#ff4d4d", marginBottom: "10px" }}>Welcome back, [User]</h2>
        <p style={{ color: "#fff", marginBottom: "20px" }}>
          Ready to sharpen your cybersecurity skills? Dive into today’s challenges!
        </p>
        <button
          className="cta-btn"
          onClick={() => (window.location.href = "/challenges")}
        >
          Start Challenge
        </button>
      </div>

      {/* Main Dashboard Content */}
      <div
        style={{
          padding: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr", // Two-thirds for challenges, one-third for news & trending
          gap: "20px",
        }}
      >
        {/* Featured Challenges */}
        <div>
          <h3 style={{ color: "#ff4d4d", marginBottom: "20px" }}>Featured Challenges</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="challenge-card">
              <div>
                <strong>Prime Numbers</strong> - check which numbers are prime
              </div>
              <button
                className="cta-btn"
                onClick={handlesolve}
              >
                Solve Now
              </button>
            </div>
            <div className="challenge-card">
              <div>
                <strong>Cross-Site Scripting (XSS)</strong> - Test your skills by solving an XSS vulnerability.
              </div>
              <button
                className="cta-btn"
                onClick={handlesolve}
              >
                Solve Now
              </button>
            </div>
            <div className="challenge-card">
              <div>
                <strong>Buffer Overflow in C</strong> - Practice your knowledge on memory vulnerabilities.
              </div>
              <button
                className="cta-btn"
                onClick={handlesolve}
              >
                Solve Now
              </button>
            </div>
          </div>
        </div>

        {/* News Feed and Trending Challenges */}
        <div>
          <div className="news-feed" style={{ marginBottom: "20px" }}>
            <h4 style={{ color: "#ff4d4d", marginBottom: "10px" }}>News Feed</h4>
            <p>
            Loaders have become an increasingly prevalent method to deliver malware, like stealers or ransomware, often acting as the first stage in an attack chain in a manner that sidesteps traditional antivirus defenses by incorporating a bevy of anti-analysis and anti-sandboxing features.
               </p>
          </div>
          <div className="trending-challenges">
            <h4 style={{ color: "#ff4d4d", marginBottom: "10px" }}>Trending Challenges</h4>
            <ul>
              <li>Network Vulnerabilities Analysis</li>
              <li>Advanced SQL Injection</li>
              <li>Linux Kernel Exploitation</li>
              <li>Phishing Kit Detection</li>
            </ul>
          </div>
        </div>
        
      </div>
      <footer className="footer">
  <div>
    <p>© 2024 CyberQuest. All Rights Reserved.</p>
  </div>
  <div className="footer-links">
    <a href="/about">About Us</a>
    <a href="/contact">Contact</a>
    <a href="/privacy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
  </div>
</footer>
    </div>
    
  );
  
};



export default Dashboard;