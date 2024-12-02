/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/cyberque.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const apiURL = "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/auth/signup";
  const navigate = useNavigate(); // Initialize navigate

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

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        alert("Signup successful!");
        setFormData({ username: "", email: "", first_name: "", last_name: "", password: "" });
        navigate("/login"); // Redirect to login page on success
      } else {
        alert(`Signup failed: ${result.message || "An error occurred"}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
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
          <a href="/signup">Signup</a>
        </nav>
      </header>

      <div className="hero">
        <div className="background-images"></div>
        <div className="hero-text">
          <h2>Join Us!</h2>
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
              <label htmlFor="first_name" style={{ color: "#ff4d4d" }}>
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="last_name" style={{ color: "#ff4d4d" }}>
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="username" style={{ color: "#ff4d4d" }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email" style={{ color: "#ff4d4d" }}>
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
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="password" style={{ color: "#ff4d4d" }}>
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
              }}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/cyberque.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const apiURL = "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/auth/signup";
 
  const navigate = useNavigate(); // Initialize navigate

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

    try {
      console.log("Form Data:", formData);
      const token = await getAccessToken("admin", "password123");

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        alert("Signup successful!");
        setFormData({ username: "", email: "", first_name: "", last_name: "", password: "" });
        navigate("/login"); // Redirect to login page on success
      } else {
        alert(`Signup failed: ${result.message || "An error occurred"}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
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
          <a href="/signup">Signup</a>
        </nav>
      </header>

      <div className="hero">
        <div className="background-images"></div>
        <div className="hero-text">
          <h2>Join Us!</h2>
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
              <label htmlFor="first_name" style={{ color: "#ff4d4d" }}>
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="last_name" style={{ color: "#ff4d4d" }}>
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="username" style={{ color: "#ff4d4d" }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email" style={{ color: "#ff4d4d" }}>
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
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="password" style={{ color: "#ff4d4d" }}>
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
              }}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
