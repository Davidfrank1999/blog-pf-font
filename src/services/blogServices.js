import api from "./api"

// Get all blogs
export const getBlogs = async () => {
  const res = await api.get("/blogs")
  return res.data
}

// Get single blog by ID
export const getBlog = async (id) => {
  const res = await api.get(`/blogs/${id}`)
  return res.data
}

// Create blog
export const createBlog = async (data) => {
  const res = await api.post("/blogs", data)
  return res.data
}

// Update blog
export const updateBlog = async (id, data) => {
  const res = await api.put(`/blogs/${id}`, data)
  return res.data
}

// Delete blog
export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`)
  return res.data
}
