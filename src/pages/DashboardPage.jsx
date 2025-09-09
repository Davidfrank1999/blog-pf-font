import { useEffect, useState } from "react"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { getBlogs } from "@/services/blogServices"

export default function DashboardPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs()
        setPosts(data) // expects array from backend
      } catch (err) {
        console.error("Failed to fetch blogs", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <DashboardLayout breadcrumb={{ parent: "Home", parentLink: "/", current: "Dashboard" }}>
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          Loading blogs...
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout breadcrumb={{ parent: "Home", parentLink: "/", current: "Dashboard" }}>
      <h1 className="text-3xl font-bold mb-8 tracking-tight text-chart-2">Latest Blogs</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No blogs available. Create one to get started!</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-card rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group border border-border"
            >
              {/* Blog Image */}
              <div className="overflow-hidden">
                <img
                  src={post.image || "https://source.unsplash.com/600x400/?blog"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold group-hover:text-chart-2 transition">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>

                {/* Styled button */}
                <a
                  href={`/blogs/${post._id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-chart-3 text-primary-foreground rounded-lg shadow hover:bg-primary/80 transition no-underline"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
