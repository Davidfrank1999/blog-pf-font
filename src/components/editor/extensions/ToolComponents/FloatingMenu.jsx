import { FloatingMenu } from '@tiptap/react';   


export default function SlashMenu ({ editor ,open, setOpen}) {

    if (!editor) return null;

    return (
    <FloatingMenu editor={editor} shouldShow={() => open}>
      <div className="bg-white shadow-md rounded-md p-2 w-48">
        <button
          className="w-full text-left p-2 hover:bg-gray-100 rounded"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
            setOpen(false);
          }}
        >
          Heading 1
        </button>
        <button
          className="w-full text-left p-2 hover:bg-gray-100 rounded"
          onClick={() => {
            editor.chain().focus().setParagraph().run();
            setOpen(false);
          }}
        >
          Paragraph
        </button>
        <button
          className="w-full text-left p-2 hover:bg-gray-100 rounded"
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
            setOpen(false);
          }}
        >
          Bullet List
        </button>
      </div>
    </FloatingMenu>
  );
};