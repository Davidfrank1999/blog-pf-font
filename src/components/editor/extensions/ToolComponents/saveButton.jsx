import React, { useCallback, useState } from "react";
import { useEditorContext } from "../EditorContext";
import { Button } from "@/components/ui/button";
import { createBlog, updateBlog } from "@/services/blogServices";

function SaveButton() {
  const { editor, blogId, title, excerpt, tags } = useEditorContext();
  const [loading, setLoading] = useState(false);
 
  const handleSave = useCallback(async () => {
    if (!editor) return;
    setLoading(true);

    const content = editor.getJSON();

    const blogData = { title, excerpt, content, tags };
    console.log("💾 Saving blog data:", blogData);
    try {
      if (blogId) {
        await updateBlog(blogId, blogData);
        alert("✅ Blog updated successfully!");
      } else {
        await createBlog(blogData); //@TODO: handle image file
        alert("✅ Blog created successfully!");
      }
    } catch (err) {
      console.error("❌ Save error:", err.response?.data || err.message);
      alert("Failed to save blog.");
    } finally {
      setLoading(false);
    }
  }, [editor, blogId , title, excerpt, tags]);

  return (
    <Button
      variant="outline"
      data-style="primary"
      onClick={handleSave}
      disabled={loading || !title || !excerpt}
    >
      {loading ? "Saving..." : "Save"}
    </Button>
  );
}

export default SaveButton;
