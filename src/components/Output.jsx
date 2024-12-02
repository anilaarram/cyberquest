import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants"; // Import the language versions
import "../Styles/Output.css";

const Output = ({ editorRef, language }) => {
  const [responseDetails, setResponseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      alert("Please enter some code to compile!");
      return;
    }

    // Fetch email from sessionStorage
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }

    // Fetch accessToken from localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("Authentication token not found. Please log in again.");
      return;
    }

    // Get the version for the selected language
    const languageVersion = LANGUAGE_VERSIONS[language];
    if (!languageVersion) {
      alert(`Language version not found for ${language}.`);
      return;
    }

    const requestBody = {
      code: sourceCode,
      language,
      version: languageVersion,
      email,
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        "http://leetcode-env.eba-p53pkhjj.us-east-1.elasticbeanstalk.com/api/question/1/execute", // Replace with your actual API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Add token for authentication
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseDetails(data); // Store API response
        setIsError(!data.passed); // Set error state based on the passed field
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to execute the code");
      }
    } catch (error) {
      console.error("An error occurred:", error.message || "Unable to compile code");
      alert("An error occurred: " + (error.message || "Unable to compile code"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="output-container">
      <p className="output-label">Execution Output</p>
      <button
        className={`run-button ${isLoading ? "loading" : ""}`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? "Compiling..." : "Compile Code"}
      </button>
      <div
        className={`output-box ${isError ? "error" : ""}`}
        style={{
          height: "75vh",
        }}
      >
        {responseDetails ? (
          <>
            <p>
              <strong>Input:</strong> {responseDetails.input || "N/A"}
            </p>
            <p>
              <strong>Actual Output:</strong> {responseDetails.actualOutput || "N/A"}
            </p>
            <p>
              <strong>Expected Output:</strong> {responseDetails.expectedOutput || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {responseDetails.passed ? "Test Passed ✅" : "Test Failed ❌"}
            </p>
          </>
        ) : (
          'Click "Compile Code" to see the output here'
        )}
      </div>
    </div>
  );
};

export default Output;





/*import { useState } from "react";
import { executeCode } from "../api";
import "../Styles/Output.css";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error("An error occurred:", error.message || "Unable to run code");
      alert("An error occurred: " + (error.message || "Unable to run code"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="output-container">
      <p className="output-label">Output</p>
      <button
        className={`run-button ${isLoading ? "loading" : ""}`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Compile Code"}
      </button>
      <div
        className={`output-box ${isError ? "error" : ""}`}
        style={{
          height: "75vh",
        }}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
*/