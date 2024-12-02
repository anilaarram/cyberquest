import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Styles/cyberque.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const apiLoginURL = "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/auth/login"; // Replace with Login API URL
  const apiOTPURL = "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/otp/generate"; // Replace with OTP API URL

  const getAccessToken = async (username, password) => {
    try {
      const response = await fetch(
        "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/auth/token",
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
    // Input validation function
  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = formData.password.length >= 8; // Minimum 8 characters

    if (!isEmailValid) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!isPasswordValid) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before making API calls
    if (!validateInput()) return;

    try {
      console.log("Form Data:", formData);
      const token = await getAccessToken("admin", "password123");
      // Step 1: Login API call
      const response = await fetch(apiLoginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const loginResult = await response.json();
      console.log("Login API Response:", loginResult);

      if (response.ok) {
        // Save email in sessionStorage after successful login
        sessionStorage.setItem("userEmail", formData.email);

        // Step 2: Generate OTP API call
        const otpResponse = await fetch(
          `${apiOTPURL}?email=${encodeURIComponent(formData.email)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }
        );

        const otpResult = await otpResponse.json();
        console.log("OTP API Response:", otpResult);

        if (otpResponse.ok) {
          alert("Login successful! OTP has been sent to your email.");
          navigate("/otp"); // Redirect to OTP page
        } else {
          alert(`Failed to generate OTP: ${otpResult.message || "An error occurred"}`);
        }
      } else {
        alert(`Login failed: ${loginResult.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during login or OTP request:", error);
      alert("An error occurred. Please try again.");
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
          <a href="/signup">Register</a>
        </nav>
      </header>

      {/* Hero Section with Login Form */}
      <div className="hero">
        <div className="background-images"></div>
        <div className="hero-text">
          <h2>Welcome Back</h2>
          <p>Login to access your account and continue your journey.</p>
          <form
            onSubmit={handleSubmit}
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
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#ff4d4d",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#ff4d4d",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
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
              Login
            </button>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <a
                href="/forgot-password"
                style={{
                  color: "#ff4d4d",
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                Forgot Password?
              </a>
              <a
                href="/signup"
                style={{
                  color: "#ff4d4d",
                  textDecoration: "none",
                }}
              >
                Create New Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;







/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Styles/cyberque.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const apiLoginURL = "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/auth/login"; // Replace with Login API URL
  const apiOTPURL = "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/otp/generate"; // Replace with OTP API URL

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData);

      // Step 1: Login API call
      const response = await fetch(apiLoginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const loginResult = await response.json();
      console.log("Login API Response:", loginResult);

      if (response.ok) {
        // Save email in sessionStorage after successful login
        sessionStorage.setItem("userEmail", formData.email);

        // Step 2: Generate OTP API call
        const otpResponse = await fetch(`${apiOTPURL}?email=${encodeURIComponent(formData.email)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const otpResult = await otpResponse.json();
        console.log("OTP API Response:", otpResult);

        if (otpResponse.ok) {
          alert("Login successful! OTP has been sent to your email.");
          navigate("/otp"); // Redirect to OTP page
        } else {
          alert(`Failed to generate OTP: ${otpResult.message || "An error occurred"}`);
        }
      } else {
        alert(`Login failed: ${loginResult.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during login or OTP request:", error);
      alert("An error occurred. Please try again.");
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
          <a href="/signup">Register</a>
        </nav>
      </header>

      {/* Hero Section with Login Form }
      <div className="hero">
        <div className="background-images"></div>
        <div className="hero-text">
          <h2>Welcome Back</h2>
          <p>Login to access your account and continue your journey.</p>
          <form
            onSubmit={handleSubmit}
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
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#ff4d4d",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#ff4d4d",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
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
              Login
            </button>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <a
                href="/forgot-password"
                style={{
                  color: "#ff4d4d",
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                Forgot Password?
              </a>
              <a
                href="/signup"
                style={{
                  color: "#ff4d4d",
                  textDecoration: "none",
                }}
              >
                Create New Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;*/



/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../Styles/cyberque.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const apiLoginURL = "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/auth/login"; // Replace with Login API URL
  const apiOTPURL = "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/otp/generate"; // Replace with OTP API URL

  // Input validation function
  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = formData.password.length >= 8; // Minimum 8 characters

    if (!isEmailValid) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!isPasswordValid) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before making API calls
    if (!validateInput()) return;

    try {
      console.log("Form Data:", formData);

      // Step 1: Login API call
      const response = await fetch(apiLoginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": "csrf-token-value", // Include CSRF token
        },
        body: JSON.stringify(formData),
      });

      const loginResult = await response.json();
      console.log("Login API Response:", loginResult);

      if (response.ok) {
        // Save email in sessionStorage after successful login
        sessionStorage.setItem("userEmail", formData.email);

        // Step 2: Generate OTP API call
        const otpResponse = await fetch(
          `${apiOTPURL}?email=${encodeURIComponent(formData.email)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": "csrf-token-value",
            },
          }
        );

        const otpResult = await otpResponse.json();
        console.log("OTP API Response:", otpResult);

        if (otpResponse.ok) {
          alert("Login successful! OTP has been sent to your email.");
          navigate("/otp"); // Redirect to OTP page
        } else {
          alert(`Failed to generate OTP: ${otpResult.message || "An error occurred"}`);
        }
      } else {
        alert(`Login failed: ${loginResult.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during login or OTP request:", error);
      alert("An error occurred. Please try again.");
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
          <a href="/signup">Register</a>
        </nav>
      </header>

      {/* Hero Section with Login Form }
      <div className="hero">
        <div className="background-images"></div>
        <div className="hero-text">
          <h2>Welcome Back</h2>
          <p>Login to access your account and continue your journey.</p>
          <form
            onSubmit={handleSubmit}
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
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#ff4d4d",
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#ff4d4d",
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
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
              Login
            </button>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <a
                href="/forgot-password"
                style={{
                  color: "#ff4d4d",
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                Forgot Password?
              </a>
              <a
                href="/signup"
                style={{
                  color: "#ff4d4d",
                  textDecoration: "none",
                }}
              >
                Create New Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

*/