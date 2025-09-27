import React, { createContext, useContext } from "react";

const EditorContext = createContext(null);

export const EditorProvider = ({ editor, blogId, title, setTitle, excerpt, setExcerpt, children }) => {
  return (
    <EditorContext.Provider value={{editor, blogId, title, setTitle, excerpt, setExcerpt, }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);
