import { useState } from "react";
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
        {isLoading ? "Running..." : "Run Code"}
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
