import { useEffect, useState } from "react";
import api from "@/services/api";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all blogs for admin
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs/admin/all");
        setBlogs(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // 🔹 Approve / Reject
  const updateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/blogs/${id}/status`, { status });

      // ✅ Replace full blog object with updated one
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, ...res.data.blog } : b))
      );
    } catch (err) {
      console.error("❌ Failed to update status:", err);
      alert("Failed to update blog status");
    }
  };

  // 🔹 Toggle visibility
  const toggleVisibility = async (id) => {
    try {
      const res = await api.patch(`/blogs/${id}/visibility`);

      // ✅ Replace updated blog object
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, ...res.data.blog } : b))
      );
    } catch (err) {
      console.error("❌ Failed to toggle visibility:", err);
      alert("Failed to change blog visibility");
    }
  };

  if (loading) {
    return (
      <DashboardLayout breadcrumb={{ parent: "Home", parentLink: "/", current: "Admin" }}>
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          Loading blogs...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumb={{ parent: "Home", parentLink: "/", current: "Admin" }}>
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Admin Panel</h1>

      {blogs.length === 0 ? (
        <p className="text-muted-foreground">No blogs submitted yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-foreground">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4 font-medium">{blog.title}</td>
                  <td className="p-4">{blog.author?.name || "Unknown"}</td>

                  {/* ✅ Status column with icons */}
                  <td className="p-4 capitalize">
                    {blog.status === "approved" && (
                      <span className="text-green-600">✅ Approved</span>
                    )}
                    {blog.status === "rejected" && (
                      <span className="text-red-600">❌ Rejected</span>
                    )}
                    {blog.status === "pending" && (
                      <span className="text-yellow-600">⏳ Pending</span>
                    )}
                  </td>

                  {/* ✅ Visibility column with icons */}
                  <td className="p-4">
                    {blog.visible ? (
                      <span className="text-green-600">👁️ Visible</span>
                    ) : (
                      <span className="text-gray-500">🚫 Hidden</span>
                    )}
                  </td>

                  <td className="p-4 flex gap-2 justify-end">
                    <button
                      onClick={() => updateStatus(blog._id, "approved")}
                      className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(blog._id, "rejected")}
                      className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => toggleVisibility(blog._id)}
                      className="px-3 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      {blog.visible ? "Hide" : "Unhide"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
