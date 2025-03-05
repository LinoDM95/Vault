import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

function TextCodeEditor({ language, code, label }) {
  /**
   * ! CodEditor
   * ! IMPORTANT!
   * ! This editor just shows the code.
   *
   * @param language The programming language is specified to set the indentations and syntax highlighting.
   * @param code Code that is meant to be displayed.
   */

  return (
    <div className="mb-4">
      {/* Grauer Titel */}
      <label className="block mb-1 font-medium">{label}</label>

      {/* Grauer Strich darunter */}
      <hr className="h-[2px] bg-gray-300 border-0 mb-2" />

      {/* Absatz (statt textarea) */}
      <CodeEditor
        value={code}
        language={language}
        placeholder="Bitte Code eingeben!"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          border: "1px solid #ddd",
          borderRadius: "10px",
          fontFamily: "monospace",
          fontSize: 14,
        }}
      />
    </div>
  );
}

export default TextCodeEditor;
