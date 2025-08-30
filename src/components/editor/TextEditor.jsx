"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";

export default function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write your blog here...</p>",
  });

  if (!editor) return null;

  return (
    <div className="w-full border rounded-2xl p-4 shadow-sm bg-white">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-200" : ""}
        >
          Bold
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-200" : ""}
        >
          Italic
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
        >
          List
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="prose max-w-none min-h-[300px]" />
    </div>
  );
}
