// src/utils/editorUtils.js
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/core";

/**
 * Converts Tiptap editor JSON content to HTML.
 * @param {Object|string} content - Editor JSON content or HTML string
 * @returns {string} HTML string
 */
export const processEditorContent = (content) => {
  if (!content) return "";

  // If it's already a string (HTML), just return
  if (typeof content === "string") return content;

  // If it's JSON from Tiptap, convert to HTML
  try {
    return generateHTML(content, [StarterKit]);
  } catch (err) {
    console.error("Error converting editor JSON to HTML:", err);
    return "<p>Error loading content</p>";
  }
};
