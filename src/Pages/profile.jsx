import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("basicInfo");
  const navigate = useNavigate();

  // Fetch access token
  const getAccessToken = async (username, password) => {
    try {
      const response = await fetch("https://cyberquest-550003209148.us-central1.run.app/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const accessToken = await response.text();
        localStorage.setItem("accessToken", accessToken); // Store the token in localStorage
        return accessToken;
      } else {
        throw new Error("Failed to fetch access token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const email = sessionStorage.getItem("userEmail"); // Retrieve email from sessionStorage
      if (!email) {
        alert("User email not found. Please log in again.");
        navigate("/login");
        return;
      }

      const token = await getAccessToken("admin", "password123"); // Get access token
      if (!token) {
        alert("Authentication failed. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://cyberquest-550003209148.us-central1.run.app/api/auth/profile/${encodeURIComponent(email)}`, // API expects email in the path
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the access token in the header
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data); // Set the API response in state
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError(error.message);
    }
  };

  // Subscribe Functionality
  const handleSubscribe = async () => {
    try {
      const email = sessionStorage.getItem("userEmail"); // Retrieve email from sessionStorage
      if (!email) {
        alert("User email not found. Please log in again.");
        navigate("/login");
        return;
      }
  
      const token = await getAccessToken("admin", "password123"); // Retrieve the access token
      if (!token) {
        alert("Failed to retrieve the authentication token. Please log in again.");
        navigate("/login");
        return;
      }
  
      const requestBody = {
        email,
        successUrl: `${window.location.origin}/profile`, // Success URL
        failureUrl: `${window.location.origin}/profile`, // Failure URL
      };
  
      const response = await fetch(
        "https://cyberquest-550003209148.us-central1.run.app/api/payments/create-subscription-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          window.location.href = data.message; // Redirect to Stripe checkout using the correct field
        } else {
          throw new Error("Failed to retrieve Stripe checkout URL from the response");
        }
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to initiate Stripe payment");
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      alert("An error occurred while processing your subscription. Please try again.");
    }
  };
  
  

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-image">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-picture"
          />
        </div>
        <div className="profile-info">
          <h2>{userDetails.first_name || "Loading..."}</h2>
          <p>username: {userDetails.username || "Loading..."}</p>
        </div>
      </div>

      {/* Sidebar and Content Section */}
      <div className="profile-body">
        <div className="profile-sidebar">
          <ul>
            <li
              className={activeTab === "basicInfo" ? "active" : ""}
              onClick={() => setActiveTab("basicInfo")}
            >
              Basic Info
            </li>
            <li
              className={activeTab === "accountInfo" ? "active" : ""}
              onClick={() => setActiveTab("accountInfo")}
            >
              Account Info
            </li>
          </ul>
        </div>
        <div className="profile-content">
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : activeTab === "basicInfo" ? (
            <>
              <h3>Basic Info</h3>
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>Firstname</td>
                    <td>{userDetails.first_name || "Not provided"}</td>
                    <td>
                      <a href="#">Edit</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Lastname</td>
                    <td>{userDetails.last_name || "Not provided"}</td>
                    <td>
                      <a href="#">Edit</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>{userDetails.username || "Not provided"}</td>
                    <td>
                      <a href="#">Edit</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userDetails.email || "Not provided"}</td>
                    <td>
                      <a href="#">Edit</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h3>Account Info</h3>
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>Subscription</td>
                    <td>{userDetails.is_premium ? "Premium" : "Regular"}</td>
                    <td>
                      {!userDetails.is_premium && (
                        <button className="cta-btn" onClick={handleSubscribe}>
                          Subscribe
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Problems Solved</td>
                    <td>{userDetails.problems_solved_count || 0}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Date Joined</td>
                    <td>{userDetails.date_joined ? new Date(userDetails.date_joined).toLocaleDateString() : "Not available"}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;



/*








import React, { useEffect, useState } from "react";
import "../Styles/Profile.css"; // Assuming this file contains your theme styles
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch access token
  const getAccessToken = async (username, password) => {
    try {
      const response = await fetch("https://cyberquest-550003209148.us-central1.run.app/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const accessToken = await response.text();
        localStorage.setItem("accessToken", accessToken); // Store the token in localStorage
        return accessToken;
      } else {
        throw new Error("Failed to fetch access token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const email = sessionStorage.getItem("userEmail"); // Retrieve email from sessionStorage
      if (!email) {
        alert("User email not found. Please log in again.");
        navigate("/login");
        return;
      }

      const token = await getAccessToken("admin", "password123"); // Get access token
      if (!token) {
        alert("Authentication failed. Please log in again.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://cyberquest-550003209148.us-central1.run.app/api/auth/profile/${encodeURIComponent(email)}`, // API expects email in the path
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the access token in the header
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data); // Set the API response in state
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="profile-container">
      {/* Header Section }
      <div className="profile-header">
        <div className="profile-image">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-picture"
          />
        </div>
        <div className="profile-info">
          <h2>{userDetails.username || "Loading..."}</h2>
          <p>username: {userDetails.username || "Loading..."}</p>
        </div>
      </div>

      {/* Sidebar and Content Section }
      <div className="profile-body">
        <div className="profile-sidebar">
          <ul>
            <li className="active">Basic Info</li>
          </ul>
        </div>
        <div className="profile-content">
          <h3>Basic Info</h3>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <table className="info-table">
              <tbody>
                <tr>
                  <td>Firstname</td>
                  <td>{userDetails.first_name || "Not provided"}</td>
                  <td>
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td>Lastname</td>
                  <td>{userDetails.last_name || "Not provided"}</td>
                  <td>
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>{userDetails.username || "Not provided"}</td>
                  <td>
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userDetails.email || "Not provided"}</td>
                  <td>
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td>Subscription</td>
                  <td>{userDetails.is_premium ? "Premium" : "Regular"}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
*/