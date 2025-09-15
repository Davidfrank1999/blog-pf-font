// src/pages/UserBlogView.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog, likeBlog, commentBlog } from "@/services/blogServices";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdBanner from "@/components/AdBanner";

export default function UserBlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog(id);
        setBlog(data);
      } catch (err) {
        console.error("❌ Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await likeBlog(id);
      setBlog((prev) => ({ ...prev, likes: res.likes }));
    } catch (err) {
      console.error("❌ Failed to like blog:", err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await commentBlog(id, commentText);
      setBlog((prev) => ({ ...prev, comments: res.comments }));
      setCommentText("");
    } catch (err) {
      console.error("❌ Failed to add comment:", err);
    }
  };

  if (loading) {
    return (
      <DashboardLayout breadcrumb={{ parent: "Dashboard", parentLink: "/dashboard", current: "Blog" }}>
        <div className="flex justify-center items-center h-64 text-muted-foreground">Loading blog...</div>
      </DashboardLayout>
    );
  }

  if (!blog) {
    return (
      <DashboardLayout breadcrumb={{ parent: "Dashboard", parentLink: "/dashboard", current: "Blog" }}>
        <p className="text-center text-red-500">Blog not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumb={{ parent: "Dashboard", parentLink: "/dashboard", current: blog.title }}>
      <div className="max-w-3xl mx-auto bg-card rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-600 mb-4">By {blog.author?.name || "Unknown"}</p>

        {blog.image && (
          <img
            src={`${import.meta.env.VITE_API_URL}${blog.image}`}
            alt={blog.title}
            className="rounded-lg mb-6 w-full"
          />
        )}

        {/* 🔹 Inline Ad after blog image */}
        <div className="mb-6">
          <AdBanner slot="4133209058" />
        </div>

        <p className="mb-6">{blog.content}</p>

        {/* 🔹 Inline Ad after content */}
        <div className="mb-6">
          <AdBanner slot="4133209058" />
        </div>

        <button onClick={handleLike} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          👍 Like ({blog.likes?.length || 0})
        </button>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">💬 Comments</h3>
          <ul className="space-y-2">
            {blog.comments?.map((c, i) => (
              <li key={i} className="border p-2 rounded">
                <strong>{c.user?.name || "User"}:</strong> {c.text}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border rounded px-3 py-2"
            />
            <button onClick={handleComment} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Post
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
