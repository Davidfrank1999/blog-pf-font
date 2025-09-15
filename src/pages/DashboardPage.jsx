// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { getBlogs } from "@/services/blogServices";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdBanner from "@/components/AdBanner";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setPosts(data);
      } catch (err) {
        console.error("❌ Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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

      {/* 🔹 Top Ad Banner */}
      <div className="mb-6">
        <AdBanner slot="4133209058" />
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No blogs available. Create one to get started!</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const likeCount = post.likes?.length || 0;
            const topComment =
              post.comments?.length > 0 ? post.comments[post.comments.length - 1] : null;

            return (
              <div key={post._id} className="flex flex-col gap-6">
                <article
                  className="bg-card rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group border border-border"
                >
                  {/* Blog Image */}
                  <div className="overflow-hidden">
                    <img
                      src={
                        post.image
                          ? `${import.meta.env.VITE_API_URL}${post.image}`
                          : "https://source.unsplash.com/600x400/?blog"
                      }
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Blog Content */}
                  <div className="p-6 flex flex-col h-full">
                    <h2 className="text-xl font-semibold group-hover:text-chart-2 transition line-clamp-1">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>

                    {/* Likes & Top Comment */}
                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                      <span>👍 {likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
                      {topComment && (
                        <p className="italic text-gray-500 line-clamp-1">
                          💬 {topComment.user?.name || "User"}: {topComment.text}
                        </p>
                      )}
                    </div>

                    {/* Read More button */}
                    <a
                      href={`/blogs/${post._id}`}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-chart-3 text-primary-foreground rounded-lg shadow hover:bg-primary/80 transition no-underline"
                    >
                      Read More →
                    </a>
                  </div>
                </article>

                {/* 🔹 Insert Ad after every 2 blogs */}
                {(index + 1) % 2 === 0 && (
                  <AdBanner slot="4133209058" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
