import api from "./api";

// fetch blogs by tags
export const fetchBLogsByTag = async (tag) => {
  try {
    const response = await api.get(`/blogs/tagfilters/${tag}`);
    // backend returns { status, message, data } where data is [{ tag, blogs }]
    return response.data.data?.[0]?.blogs || []; 
    } catch (error) {
    console.error("Error fetching blogs by tag:", error);
    return [];
    }
};

// fetch multiple tags
export const fetchBlogsByTags = async (tags) => {
  try {
    const results = await Promise.all(
      tags.map(async (tag) => {
        const blogs = await fetchBLogsByTag(tag);
        return { title: tag, cards: blogs };
      })
    );
    return results;
  } catch (err) {
    console.error("Error fetching blogs by tags:", err);
    return [];
  }
};