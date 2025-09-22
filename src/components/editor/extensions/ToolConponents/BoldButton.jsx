import { Button } from '@/components/ui/button'
import { Bold } from 'lucide-react'
import React from 'react'
import { useEditorContext } from '../EditorContext';

function BoldButton() {
  const { editor } = useEditorContext();

  const handleClick = () => {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
    console.log("Bold button clicked");
  };

  return (
    <Button 
        variant="outline" 
        data-style="ghost"
        onClick={() => handleClick()}
        className={editor?.isActive("bold") ? "bg-muted text-muted-foreground" : ""}
        >
      <Bold /> 
    </Button>
  )
}

export default BoldButton