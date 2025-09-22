import React, { createContext, useContext } from "react";

const EditorContext = createContext(null);

export const EditorProvider = ({ editor, children }) => {
  return (
    <EditorContext.Provider value={{editor}}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);
