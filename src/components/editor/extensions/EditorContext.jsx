import React, { createContext, useContext } from "react";

const EditorContext = createContext(null);

export const EditorProvider = ({ editor, blogId, title, setTitle, excerpt, setExcerpt,tags, setTags, children }) => {
  return (
    <EditorContext.Provider value={{editor, blogId, title, setTitle, excerpt, setExcerpt,tags, setTags }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);
