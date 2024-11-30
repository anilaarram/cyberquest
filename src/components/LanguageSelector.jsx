import React from "react";
import { LANGUAGE_VERSIONS } from "../constants";
import "../Styles/LanguageSelector.css"; // New CSS file for styles

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="language-selector-container">
      <label className="language-selector-label">Language:</label>
      <select
        className="language-selector-dropdown"
        value={language}
        onChange={(e) => onSelect(e.target.value)}
      >
        {languages.map(([lang, version]) => (
          <option key={lang} value={lang}>
            {lang} ({version})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
