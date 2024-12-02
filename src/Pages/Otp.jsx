import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Styles/cyberque.css";

const OTP = () => {
  const [otp, setOtp] = useState(""); // State to store the entered OTP
  const navigate = useNavigate();

  const apiOTPValidateURL = "https://cyberquest-550003209148.us-central1.run.app/api/otp/validate"; // Replace with OTP validation API URL

  const getAccessToken = async (username, password) => {
    try {
      const response = await fetch(
        "https://cyberquest-550003209148.us-central1.run.app/api/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const accessToken = await response.text();
        localStorage.setItem("accessToken", accessToken); // Store token in localStorage
        return accessToken;
      } else {
        throw new Error("Failed to fetch access token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  }
  const handleOTPChange = (e) => {
    setOtp(e.target.value); // Update OTP state as the user types
  };

  const handleOTPSubmit = async (event) => {
    event.preventDefault();

    // Retrieve email from sessionStorage
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      alert("No email found. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const token = await getAccessToken("admin", "password123");
      const response = await fetch(`${apiOTPValidateURL}?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      

      const result = await response.json();
      console.log("OTP Validation Response:", result);

      if (response.ok) {
        alert("OTP validated successfully!");
        localStorage.setItem("accessToken", token);
        navigate("/dashboard"); // Redirect to the dashboard
      } else {
        alert(`OTP validation failed: ${result.message || "Invalid OTP"}`);
      }
    } catch (error) {
      console.error("Error during OTP validation:", error);
      alert("An error occurred while validating OTP. Please try again.");
    }
  };

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
            <path d="M480 856q-88 0-149-61t-61-149q0-88 61-149t149-61q88 0 149 61t61 149q0 88-61 149t-149 61Zm0-60q70 0 120-49.5T650 626q0-70-50-120t-120-50q-70 0-120 50T310 626q0 70 50 119.5T480 796ZM176 976V758q-53-57-84.5-131T60 476q0-161 112.5-273.5T446 90q161 0 273.5 112.5T832 476q0 73-31.5 147T716 758v218H176Zm60-60h420V736l11-11q45-45 72.5-108.5T768 476q0-132-91-223t-223-91q-132 0-223 91t-91 223q0 64 27.5 127.5T299 725l11 11v180Zm210-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-120Zm0 402Z" />
          </svg>
          <span className="animated-logo">CYBERQUEST</span>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      </header>

      {/* Hero Section with OTP Form */}
      <div className="hero">
        <div className="background-images"></div>
        <div className="hero-text">
          <h2>OTP Verification</h2>
          <p>Enter the OTP sent to your registered email.</p>
          <form
            onSubmit={handleOTPSubmit}
            style={{
              background: "rgba(0, 0, 0, 0.85)",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              margin: "0 auto",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="otp"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#ff4d4d",
                }}
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOTPChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#ff4d4d",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;






/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Styles/cyberque.css";

const OTP = () => {
  const [otp, setOtp] = useState(""); // State to store the entered OTP
  const navigate = useNavigate();

  const apiOTPValidateURL = "https://cyberquest-550003209148.us-central1.run.app/api/otp/validate"; // Replace with OTP validation API URL

  const handleOTPChange = (e) => {
    setOtp(e.target.value); // Update OTP state as the user types
  };

  const handleOTPSubmit = async (event) => {
    event.preventDefault();

    // Retrieve email from sessionStorage
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      alert("No email found. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${apiOTPValidateURL}?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      const result = await response.json();
      console.log("OTP Validation Response:", result);

      if (response.ok) {
        alert("OTP validated successfully!");
        navigate("/dashboard"); // Redirect to the dashboard
      } else {
        alert(`OTP validation failed: ${result.message || "Invalid OTP"}`);
      }
    } catch (error) {
      console.error("Error during OTP validation:", error);
      alert("An error occurred while validating OTP. Please try again.");
    }
  };

  return (
    <div>
      {/* Header Section }
      <header>
        <div className="logo">
          <svg
            className="network-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24"
          >
            <path d="M480 856q-88 0-149-61t-61-149q0-88 61-149t149-61q88 0 149 61t61 149q0 88-61 149t-149 61Zm0-60q70 0 120-49.5T650 626q0-70-50-120t-120-50q-70 0-120 50T310 626q0 70 50 119.5T480 796ZM176 976V758q-53-57-84.5-131T60 476q0-161 112.5-273.5T446 90q161 0 273.5 112.5T832 476q0 73-31.5 147T716 758v218H176Zm60-60h420V736l11-11q45-45 72.5-108.5T768 476q0-132-91-223t-223-91q-132 0-223 91t-91 223q0 64 27.5 127.5T299 725l11 11v180Zm210-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-120Zm0 402Z" />
          </svg>
          <span className="animated-logo">CYBERQUEST</span>
        </div>
        <nav>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </nav>
      </header>

      {/* Hero Section with OTP Form }
      <div className="hero">
        <div className="background-images"></div>
        <div className="hero-text">
          <h2>OTP Verification</h2>
          <p>Enter the OTP sent to your registered email.</p>
          <form
            onSubmit={handleOTPSubmit}
            style={{
              background: "rgba(0, 0, 0, 0.85)",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              margin: "0 auto",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="otp"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#ff4d4d",
                }}
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOTPChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#ff4d4d",
                border: "none",
                borderRadius: "5px",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
*/