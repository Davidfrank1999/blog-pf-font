// src/services/blogServices.js
import api from "./api";

// 🔹 Get all blogs (with optional search + tag filters)
export const getBlogs = async (params = {}) => {
  const res = await api.get("/blogs", { params });
  return res.data;
};

// 🔹 Get single blog by slug or ID
export const getBlog = async (slugOrId) => {
  const res = await api.get(`/blogs/${slugOrId}`);
  return res.data;
};

// 🔹 Create blog
export const createBlog = async (data) => {
  const res = await api.post("/blogs", data);
  return res.data;
};

// 🔹 Update blog
export const updateBlog = async (id, data) => {
  const res = await api.put(`/blogs/${id}`, data);
  return res.data;
};

// 🔹 Delete blog
export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};

// 🔹 Like blog (still uses ID, not slug)
export const likeBlog = async (id) => {
  const res = await api.post(`/blogs/${id}/like`);
  return res.data;
};

// 🔹 Add comment (still uses ID, not slug)
export const commentBlog = async (id, text) => {
  const res = await api.post(`/blogs/${id}/comment`, { text });
  return res.data;
};
