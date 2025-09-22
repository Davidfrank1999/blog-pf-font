import { Button } from "@/components/ui/button";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export default function AlignButton({ editor, alignment }) {
  if (!editor) return null;

  // Check if the current selection has this alignment
  const isActive = editor.isActive({ textAlign: alignment });

  return (
    <ToggleGroupItem value={alignment} aria-label={`${alignment} aligned`}
        onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
        >
        {alignment === "left" && <AlignLeft />}
        {alignment === "center" && <AlignCenter />}
        {alignment === "right" && <AlignRight />}
    </ToggleGroupItem>
  );
}
