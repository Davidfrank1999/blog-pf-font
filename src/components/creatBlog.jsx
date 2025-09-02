import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreateBlog() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("excerpt", data.excerpt);
      formData.append("content", content);
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await axios.post("http://localhost:4000/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // ✅ if using cookies for auth
      });

      alert("✅ Blog created successfully!");
      console.log(res.data);
      reset();
      setContent("");
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-foreground mb-6">✍️ Create New Blog</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 w-full rounded-lg border border-border p-3 bg-background text-foreground focus:ring-2 focus:ring-primary"
            placeholder="Enter blog title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-foreground">Excerpt</label>
          <textarea
            {...register("excerpt", { required: "Excerpt is required" })}
            className="mt-1 w-full rounded-lg border border-border p-3 bg-background text-foreground focus:ring-2 focus:ring-primary"
            rows="3"
            placeholder="Enter a short description"
          />
          {errors.excerpt && <p className="text-red-500 text-sm">{errors.excerpt.message}</p>}
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-foreground">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
            className="mt-1 w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 rounded-lg shadow-md max-h-48 object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-foreground">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            theme="snow"
            className="bg-background rounded-lg"
          />
          {!content && <p className="text-red-500 text-sm mt-1">Content is required</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold shadow hover:shadow-lg transition-all"
        >
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
}
