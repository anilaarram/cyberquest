import { useRef, useState } from "react";
import Split from "react-split";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import "../Styles/CodeEditor.css"; // Include your existing styles

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Split
    sizes={[70, 30]} // Default proportions: 70% editor, 30% output
    minSize={[200, 0]} // Editor min width 200px, Output collapsible to 0px
    gutterSize={10} // Width of the splitter
    gutterAlign="center" // Center the gutter
    direction="horizontal" // Horizontal layout
    className="code-editor-container"
  >
    <div className="code-editor-sidebar">
      <LanguageSelector language={language} onSelect={onSelect} />
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
        }}
        height="100%"
        theme="vs-dark"
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
    <div className="output-container">
      <Output editorRef={editorRef} language={language} />
    </div>
  </Split>
  
  );
};

export default CodeEditor;
