import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";

import "codemirror/mode/python/python.js";

import "codemirror/mode/clike/clike.js";

import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";
import { Play } from "lucide-react";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const handleLanguage = (e) => {
    const selectedLanguage = e.target.value; // Get the selected language from the event
    setSelectedLanguage(selectedLanguage);
    console.log(selectedLanguage);
  };
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: selectedLanguage, json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      console.log(editorRef);

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, [selectedLanguage]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return (
    <div className="editorWrapper">
      <div className="topEditor">
        <select
          className="select"
          onChange={handleLanguage}
          value={selectedLanguage}
        >
          <option value="text/x-c++src">C++</option>
          <option value="text/x-csrc">C</option>
          <option value="text/x-java">Java</option>
          <option value="javascript">Javascript</option>
          <option value="text/x-python">Python</option>
        </select>
        <div className="runBtn">
          <Play />
          <span className="">Run</span>
        </div>
      </div>
      <textarea id="realtimeEditor"></textarea>
    </div>
  );
};

export default Editor;

{
  /* <div className="editorWrapper">
<div className="topEditor">
  <select
    className="select"
    onChange={handleLanguage}
    value={selectedLanguage}
  >
    <option value="text/x-c++src">C++</option>
    <option value="text/x-csrc">C</option>
    <option value="text/x-java">Java</option>
    <option value="text/javascript">Javascript</option>
    <option value="text/x-python">Python</option>
  </select>
  <div className="runBtn">
    <Play />
    <span className="">Run</span>
  </div>
</div>
<textarea id="realtimeEditor"></textarea>
</div> */
}
