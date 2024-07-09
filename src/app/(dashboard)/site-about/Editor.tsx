"use client";

// React Imports
import { useState } from "react";

// Third-party Imports
import { EditorState, convertToRaw } from "draft-js";

// Styled Component Import
import AppReactDraftWysiwyg from "@/libs/styles/AppReactDraftWysiwyg";

const EditorControlled = () => {
  // States
  const [value, setValue] = useState(EditorState.createEmpty());

  return (
    <AppReactDraftWysiwyg
      editorState={value}
      onEditorStateChange={(data) => {
        const blocks = convertToRaw(data.getCurrentContent()).blocks;
        const value = blocks
          .map((block) => (!block.text.trim() && "\n") || block.text)
          .join("\n");

        console.log(blocks);
        setValue(data);
      }}
    />
  );
};

export default EditorControlled;
