import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "@/components/layouts/DashboardLayout"; // ✅ reuse layout for navbar + sidebar

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | pending | approved | rejected
  const [sort, setSort] = useState("latest"); // latest | oldest
  const navigate = useNavigate();

  // ✅ Fetch all blogs (admin only)
  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs/admin/all");
      setBlogs(res.data);
      setFilteredBlogs(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Filter + Sort whenever filter/sort changes
  useEffect(() => {
    let updated = [...blogs];

    if (filter !== "all") {
      updated = updated.filter((b) => b.status === filter);
    }

    if (sort === "latest") {
      updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredBlogs(updated);
  }, [filter, sort, blogs]);

  // ✅ Approve / Reject blog
  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/blogs/${id}/status`, { status });
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error(`❌ Failed to update blog status:`, err);
    }
  };

  // ✅ Toggle visibility
  const handleVisibilityToggle = async (id) => {
    try {
      const res = await api.patch(`/blogs/${id}/visibility`);
      const updated = res.data.blog;
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, visible: updated.visible } : b))
      );
    } catch (err) {
      console.error(`❌ Failed to toggle visibility:`, err);
    }
  };

  return (
    <DashboardLayout
      breadcrumb={{ parent: "Admin", parentLink: "/admin", current: "Dashboard" }}
    >
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          📊 Admin Dashboard
        </h1>

        {/* 🔹 Filters & Sort */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-sm"
          >
            <option value="all">All Blogs</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-sm"
          >
            <option value="latest">Sort by Latest</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg animate-pulse">⏳ Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition overflow-hidden flex flex-col"
              >
                {/* Blog Header */}
                <div
                  className="p-4 border-b cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/admin/blog/${blog._id}`)}
                >
                  <h2 className="text-lg font-semibold text-blue-600 truncate">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    By {blog.author?.name || "Unknown"}
                  </p>
                </div>

                {/* Blog Status */}
                <div className="px-4 py-2 flex justify-between items-center border-b bg-gray-50">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      blog.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : blog.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-600">
                    {blog.visible ? "👁 Visible" : "🚫 Hidden"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 p-4 mt-auto">
                  <button
                    onClick={() => handleStatusChange(blog._id, "approved")}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(blog._id, "rejected")}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleVisibilityToggle(blog._id)}
                    className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
                  >
                    {blog.visible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
