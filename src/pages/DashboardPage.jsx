// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { getBlogs } from "@/services/blogServices";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdBanner from "@/components/AdBanner";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagFilter, setTagFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🔹 Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 🔹 Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs({
          tag: tagFilter !== "all" ? tagFilter : undefined,
          search: debouncedSearch || undefined,
        });
        setPosts(data);
      } catch (err) {
        console.error("❌ Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [tagFilter, debouncedSearch]);

  // 🔹 Collect unique tags
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));

  if (loading) {
    return (
      <DashboardLayout breadcrumb={{ parent: "Home", parentLink: "/", current: "Dashboard" }}>
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          Loading blogs...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout breadcrumb={{ parent: "Home", parentLink: "/", current: "Dashboard" }}>
      <h1 className="text-3xl font-bold mb-6 tracking-tight text-chart-2">
        Latest Blogs
      </h1>

      {/* 🔹 Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="search"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-full sm:w-1/2"
        />
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="px-3 py-2 border rounded w-full sm:w-1/4"
        >
          <option value="all">All Tags</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Top Ad Banner */}
      <div className="mb-6">
        <AdBanner slot="top-banner" />
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No blogs found. Try another search.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <div key={post._id} className="flex flex-col gap-6">
              <article className="bg-card rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group border border-border">
                <img
                  src={
                    post.image
                      ? `${import.meta.env.VITE_API_URL}${post.image}`
                      : "https://source.unsplash.com/600x400/?blog"
                  }
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold line-clamp-1">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* 🔹 Tags */}
                  {post.tags?.length > 0 && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 🔹 Like count */}
                  <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
                    👍 {post.likes?.length || 0} Likes
                  </div>

                  <a
                    href={`/blogs/${post.slug}`}
                    className="mt-4 inline-block px-4 py-2 bg-chart-3 text-white rounded hover:bg-chart-4 transition"
                  >
                    Read More →
                  </a>
                </div>
              </article>

              {/* 🔹 Ad after every 2 blogs */}
              {(i + 1) % 2 === 0 && <AdBanner slot={`banner-${i}`} />}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
