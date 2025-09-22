"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { EditorContent } from "@tiptap/react"

export default function ContextMenuBar({ editor }) {
  if (!editor) return null

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (open) {
          const selection = editor.state.selection
          if (selection.empty) {
            // close immediately if no text is selected
            setTimeout(() => {
              document.dispatchEvent(new KeyboardEvent("Escape"))
            }, 0)
          }
        }
      }}
    >
      <ContextMenuTrigger asChild>
        <div className="relative w-full">
          <EditorContent editor={editor} className="min-h-[200px] border p-4" />
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
