import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'

import { Button } from '@/components/ui/button'
import { ToggleGroup } from '@radix-ui/react-toggle-group';
import {
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Space,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import AlignButton from './ToolComponents/AlignButton';
import BoldButton from './ToolComponents/BoldButton';
import ItalicsButton from './ToolComponents/ItalicsButton';
import { MarkButton } from '@/components/tiptap-ui/mark-button';

//@TODO: change UI design later
export default function ToolbarTipTap() {
  return (
    <Toolbar variant="floating" className="fixed bottom-4 right-4">
      <ToolbarGroup>
        <BoldButton />
      
        {/* @TODO: Align function not working check */}
        <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
         <AlignButton alignment="left" />
         <AlignButton alignment="center" />
         <AlignButton alignment="right" />
        </ToggleGroup>
        
        <ItalicsButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="underline" icon={<Underline />} tooltip="Underline" />
        <Button variant="outline" data-style="ghost">Format</Button>
      </ToolbarGroup>

      <Space />

      <ToolbarGroup>
        <Button variant="outline" data-style="primary">Save</Button>
      </ToolbarGroup>
    </Toolbar>
  )
}