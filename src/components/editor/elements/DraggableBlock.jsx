import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'


const DraggableBlock = () => {
  return (
    <NodeViewWrapper className="flex items-start gap-2 group">
      {/* Drag handle */}
      <div className="opacity-0 group-hover:opacity-100 cursor-grab select-none"
        draggable="true" // @derc makes dom element draggable
        data-drag-handle // @derc custom attribute to identify drag handle
      >
        ⋮⋮
      </div>

      {/* Editable content */}
      <NodeViewContent className="prose prose-slate max-w-full focus:outline-none" />
    </NodeViewWrapper>
  )
}

export default DraggableBlock