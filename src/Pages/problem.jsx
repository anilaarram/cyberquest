import React from "react";
import "../Styles/cyberque.css"; // Assuming this file contains your theme styles
import "../Styles/problem.css"; // Create a new CSS file for specific styles

const ProblemDetails = () => {
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
      </header>
<div className="problem-details-heading">
    <h2>Problem Details</h2>
  </div>
      {/* Main Content */}
      <div className="problem-details-container">
  <div>
    <div className="details-section">
      <h3>Problem Description</h3>
      <p>
        Write a program to check if a given number is a prime number. A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers. For example, 5 is a prime number because the only way to write it as a product, 1 × 5 or 5 × 1, involves 5 itself.
      </p>
    </div>
    <div className="details-section">
      <h3>Input Details</h3>
      <p>
        The input consists of a single integer, n, where 1 ≤ n ≤ 10<sup>6</sup>.
      </p>
    </div>
    <div className="details-section">
      <h3>Expected Output</h3>
      <p>
        Output "Prime" if the number is a prime number, otherwise output "Not Prime".
      </p>
    </div>
  </div>

  <div className="try-more">
    <h3>Try More</h3>
    <ul>
      <li>Problem 1: Determine if a number is even or odd.</li>
      <li>Problem 2: Calculate the factorial of a number.</li>
      <li>Problem 3: Find the greatest common divisor (GCD) of two numbers.</li>
    </ul>
  </div>
</div>

{/* Solve Now Button */}
<div className="solve-button-container">
  <button className="cta-btn" onClick={() => window.location.href = "/codeeditor"}>
    Solve Now
  </button>
</div>

    </div>
  );
};

export default ProblemDetails;
