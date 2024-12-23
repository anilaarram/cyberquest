import React from "react";
import "../Styles/cyberque.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cyberque = () => {

    const navigate = useNavigate();

    const handleStartSolving = () => {
      navigate("/codeeditor"); // Navigate to the CodeEditor page
    };
    const handlelogin = () => { 
        navigate("/login")
    }
    const handlesignup = () => { 
        navigate("/signup")
    }

  const handleNavigationClick = (e, targetId) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Header Section with Animated Logo */}
      <header>
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            className="network-icon"
          >
            <path d="M12 2C8.14 2 5 5.14 5 9C5 10.57 5.56 12.03 6.45 13.06L4.29 16.62C3.5 17.93 4.15 19.56 5.72 19.56H18.28C19.85 19.56 20.5 17.93 19.71 16.62L17.55 13.06C18.44 12.03 19 10.57 19 9C19 5.14 15.86 2 12 2ZM12 16C10.45 16 9 14.55 9 13C9 11.45 10.45 10 12 10C13.55 10 15 11.45 15 13C15 14.55 13.55 16 12 16ZM12 4C13.66 4 15 5.34 15 7C15 8.66 13.66 10 12 10C10.34 10 9 8.66 9 7C9 5.34 10.34 4 12 4Z" />
          </svg>
          <h1 className="animated-logo">CYBERQUEST</h1>
        </div>
        <nav>
          
        <Link
    to="/login"
    onClick={() => {
      handlelogin();
    }}
  >
    Login
  </Link>

  <Link to="/signup" onClick={() => {
      handlesignup();
    }}
  > Signup
   </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <div className="background-images"></div>
        <div className="hero-text">
          <h2>Welcome to Cyberquest</h2>
          <p>Your adventure in coding starts here.</p>
          <button className="cta-btn" onClick={handleStartSolving}>Start your journey!</button>
        </div>
      </div>
    </div>
  );
};

export default Cyberque;
