import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";

import DraggableBlock from "./DraggableBlock";

const extensions = [
  StarterKit,
  Image,
  Paragraph.extend({
    addNodeView() {
      return ReactNodeViewRenderer(DraggableBlock);
    },
  }),
];

export default extensions;
