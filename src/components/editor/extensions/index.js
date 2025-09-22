import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Separator } from "@/components/tiptap-ui-primitive/separator";


import ToolbarDemo from "./ToolbarDemo";
import ToolbarTipTap from "./ToolbarTipTap";

import { EditorProvider } from "./EditorContext";
import TextAlign from "@tiptap/extension-text-align";
import { DraggableBlockNode } from "./customNodes/DraggableBlockNode.js";

const extensions = [
  StarterKit,
  Image,
  DraggableBlockNode,
  TextAlign.configure({
    types: ['heading', 'paragraph', 'draggableBlock'], // allow alignment for these node types
  }),
];

export {extensions, ToolbarDemo, ToolbarTipTap, Separator, EditorProvider};
