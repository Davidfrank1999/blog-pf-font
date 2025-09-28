"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { EditorProvider, extensions, Separator, ToolbarDemo, ToolbarTipTap } from "./extensions";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";


export default function NotionEditor({initialData, blogId}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [tags, setTags] = useState(initialData?.tags || []);

  const editor = useEditor({
    extensions: extensions,
    content: initialData?.content ? JSON.parse(initialData.content) : `<p>Start writing...</p>`,
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

  //Image @TODO: move this to a separate file, and make it disappear on click outside
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
        {/* Title */}
        <div className="mb-4">
          <Input placeholder="Blog Title" value={title} onChange={e => setTitle(e.target.value)} />
          <Input placeholder="excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
          {/* Tag Input */}
            <div>
              <Input
                placeholder="Add a tag and press Enter"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    const newTag = e.currentTarget.value.trim().toLowerCase();
                    if (newTag && !tags.includes(newTag)) { // ✅ prevent duplicates
                      setTags([...tags, newTag]);
                    }
                    e.currentTarget.value = "";
                    e.preventDefault();
                  }
                }}
              />

              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="cursor-pointer"
                    onClick={() => setTags(tags.filter((_, i) => i !== index))} // remove tag
                  >
                    {tag} ✕
                  </Badge>
                ))}
              </div>
            </div>

        </div>

        <EditorProvider editor={ editor }  blogId={blogId} title={title} setTitle={setTitle} excerpt={excerpt} setExcerpt={setExcerpt} tags={tags} setTags={setTags}>
          {/*  <ToolbarDemo editor={editor} /> */} {/* @TODO: this was replaced, remove after testing */}
          <ToolbarTipTap/>
        </EditorProvider>

        <div className="space-y-2">
          <EditorContent editor={editor} />
        </div>
        {/* @TODO: sort and move this / meunu else were */}
        {menuOpen && <div className="absolute bg-white shadow p-2 rounded">
          <Button onClick={addImage} variant="outline" size="sm">Add Image</Button>
        </div>}
      </div>

    </div>
  );
}
