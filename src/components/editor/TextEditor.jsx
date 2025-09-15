"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import DraggableBlock from "./elements/DraggableBlock";
import Image from "@tiptap/extension-image";
import { Button } from "../ui/button";
import {useCallback } from "react";


export default function NotionEditor() {
  const [menuOpen, setMenuOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Paragraph.extend({
        addNodeView() {
          return ReactNodeViewRenderer(DraggableBlock);
        },
      }),
    ],
    content: `<h1>My Blog Page</h1>
              <p>Click here to start writing...</p>`,
    editorProps: {
      attributes: {
        class: "prose prose-slate focus:outline-none",
        spellcheck: "false",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const handleTransaction = ({ editor }) => {
      const { selection } = editor.state;
      const { $from } = selection;
      const textBefore = $from.parent.textBetween(0, $from.parentOffset, null, "\ufffc");

      if (textBefore.endsWith("/")) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    };

    editor.on("transaction", handleTransaction);

    return () => editor.off("transaction", handleTransaction);
  }, [editor]);

  //Image
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">📄 Blog Page</h1>
        </div>

        <div className="space-y-2">
          <EditorContent editor={editor} />
        </div>

        {menuOpen && <div className="absolute bg-white shadow p-2 rounded">
          <Button onClick={addImage} variant="outline" size="sm">Add Image</Button>
        </div>}
      </div>

    </div>
  );
}
