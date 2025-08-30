import TextEditor from "./editor/TextEditor";

export default function CreateBlog() {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
      <TextEditor />
    </div>
  );
}
