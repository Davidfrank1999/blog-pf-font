import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Separator } from "@/components/tiptap-ui-primitive/separator";

import DraggableBlock from "./DraggableBlock";
import ToolbarDemo from "./ToolbarDemo";
import ToolbarTipTap from "./ToolbarTipTap";

import { EditorProvider } from "./EditorContext";

const extensions = [
  StarterKit,
  Image,
  Paragraph.extend({
    addNodeView() {
      return ReactNodeViewRenderer(DraggableBlock);
    },
  }),
];

export {extensions, ToolbarDemo, ToolbarTipTap, Separator, EditorProvider};
