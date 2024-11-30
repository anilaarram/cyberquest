import React from "react";
import "../Styles/Profile.css"; // Create a new CSS file for specific styles

const Profile = () => {
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
          <h2>sushilbanka</h2>
          <p>username: sushilbanka</p>
        </div>
      </div>

      {/* Sidebar and Content Section */}
      <div className="profile-body">
        <div className="profile-sidebar">
          <ul>
            <li className="active">Basic Info</li>
         
          </ul>
        </div>
        <div className="profile-content">
          <h3>Basic Info</h3>
          <table className="info-table">
            <tbody>
              <tr>
                <td>Firstname</td>
                <td>sushilbanka</td>
                <td><a href="#">Edit</a></td>
              </tr>
              <tr>
                <td>Lastname</td>
                <td>Not provided</td>
                <td><a href="#">Edit</a></td>
              </tr>
              <tr>
                <td>username</td>
                <td>Your location</td>
                <td><a href="#">Edit</a></td>
              </tr>
              <tr>
                <td>Email</td>
                <td>Your birthday</td>
                <td><a href="#">Edit</a></td>
              </tr>
              
              <tr>
                <td>Subscription</td>
                <td>Regular</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
