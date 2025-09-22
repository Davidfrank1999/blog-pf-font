import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import DraggableBlockComponent from '../ToolComponents/DraggableBlockComponent';

export const DraggableBlockNode = Node.create({
  name: 'draggableBlock', // <-- custom node name
  group: 'block',
  content: 'inline*',
  draggable: true,
  addAttributes() {
    return {
      textAlign: {
        default: 'left',
        parseHTML: element => element.style.textAlign || 'left',
        renderHTML: attributes => {
          return { style: `text-align: ${attributes.textAlign}` };
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="draggable-block"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'draggable-block' }), 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(DraggableBlockComponent);
  },
});
