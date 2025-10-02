
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useEditorContext } from "../EditorContext";

export default function AlignButton({ alignment }) {
  const { editor } = useEditorContext();

  if (!editor) return null;
  
  const handleClick = () => {
    
    editor.chain().focus().setTextAlign(alignment).run();
  };

  // Check if the current selection has this alignment
  const isActive = editor.isActive({ textAlign: alignment });

  return (
    <ToggleGroupItem value={alignment} aria-label={`${alignment} aligned`}
        onClick={() => handleClick()}
        className={isActive ? "bg-muted text-muted-foreground" : ""}
        >
        {alignment === "left" && <AlignLeft />}
        {alignment === "center" && <AlignCenter />}
        {alignment === "right" && <AlignRight />}
    </ToggleGroupItem>
  );
}
