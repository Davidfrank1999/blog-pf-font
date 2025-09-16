// src/pages/AdminBlogView.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function AdminBlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/admin/${id}`);
        setBlog(res.data || res.data.blog || null);
      } catch (err) {
        console.error("❌ Failed to fetch blog:", err);
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const updateStatus = async (status) => {
    try {
      const res = await api.patch(`/blogs/${id}/status`, { status });
      setBlog(res.data.blog || res.data);
    } catch (err) {
      console.error("❌ Failed to update blog status:", err);
    }
  };

  const toggleVisibility = async () => {
    try {
      const res = await api.patch(`/blogs/${id}/visibility`);
      setBlog(res.data.blog || res.data);
    } catch (err) {
      console.error("❌ Failed to toggle visibility:", err);
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        breadcrumb={{ parent: "Admin", parentLink: "/admin", current: "Blog" }}
      >
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          Loading blog...
        </div>
      </DashboardLayout>
    );
  }

  if (!blog) {
    return (
      <DashboardLayout
        breadcrumb={{ parent: "Admin", parentLink: "/admin", current: "Blog" }}
      >
        <p className="text-red-500">Blog not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      breadcrumb={{ parent: "Admin", parentLink: "/admin", current: blog.title }}
    >
      {/* Blog Header */}
      <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
      <p className="text-muted-foreground mb-4">
        By {blog.author?.name || "Unknown"} |{" "}
        {blog.status === "approved" && (
          <span className="text-green-600">✅ Approved</span>
        )}
        {blog.status === "rejected" && (
          <span className="text-red-600">❌ Rejected</span>
        )}
        {blog.status === "pending" && (
          <span className="text-yellow-600">⏳ Pending</span>
        )}{" "}
        | {blog.visible ? "👁️ Visible" : "🚫 Hidden"}
      </p>

      {/* Blog Image */}
      {blog.image && (
        <img
          src={`${import.meta.env.VITE_API_URL}${blog.image}`}
          alt={blog.title}
          className="rounded-lg mb-6 max-w-lg"
        />
      )}

      {/* Blog Content */}
      <p className="text-base leading-relaxed mb-6">{blog.content}</p>

      {/* Likes Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg">👍 Likes ({blog.likes?.length || 0})</h3>
        {blog.likes?.length > 0 ? (
          <ul className="list-disc ml-6 mt-2 space-y-1">
            {blog.likes.map((user) => (
              <li key={user._id}>
                {user.name} <span className="text-gray-500">({user.email})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm mt-1">No likes yet</p>
        )}
      </div>

      {/* Comments Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg">💬 Comments ({blog.comments?.length || 0})</h3>
        {blog.comments?.length > 0 ? (
          <ul className="space-y-2 mt-2">
            {blog.comments.map((c, i) => (
              <li key={i} className="border p-2 rounded bg-gray-50">
                <strong>{c.user?.name || "User"}:</strong> {c.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm mt-1">No comments yet</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => updateStatus("approved")}
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          Approve
        </button>
        <button
          onClick={() => updateStatus("rejected")}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Reject
        </button>
        <button
          onClick={toggleVisibility}
          className="px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
        >
          {blog.visible ? "Hide" : "Unhide"}
        </button>
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>
    </DashboardLayout>
  );
}
