// src/services/blogServices.js
import { data } from "react-router-dom";
import api from "./api";

// 🔹 Get all blogs (with optional search + tag filters)
export const getBlogs = async (params = {}) => {
  const res = await api.get("/blogs/getBlogs", { params });
  return res.data;
};

// 🔹 Get single blog by slug or ID
export const getBlogbyId = async (blogIdOrSlug) => {
  const res = await api.get(`/blogs/blogRead/${blogIdOrSlug}`);
  return res.data;
};

// 🔹 Create blog
export const createBlog = async (data, file) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (file) formData.append("file", file);

  const res = await api.post("/blogs/createBlog", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


// 🔹 Update blog (similar pattern)
export const updateBlog = async (id, data, file) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (file) formData.append("file", file);

  const res = await api.put(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
