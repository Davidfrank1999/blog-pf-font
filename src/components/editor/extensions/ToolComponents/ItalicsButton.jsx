import { Toggle } from '@/components/ui/toggle';
import { Italic } from 'lucide-react';
import React from 'react'
import { useEditorContext } from "../EditorContext";

function ItalicsButton() {
    const { editor } = useEditorContext();
    
      if (!editor) return null;
      
      const handleClick = () => {
        
        editor.chain().focus().setTextItalic().run();
      };
  return (
    <Toggle pressed={editor?.isActive('italic')} onPressedChange={handleClick} aria-label="Italic">
        <Italic />
    </Toggle>
    
  )
}

export default ItalicsButton