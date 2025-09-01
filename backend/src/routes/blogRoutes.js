import express from "express"
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogControllers.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()

// Public routes
router.get("/", getBlogs)
router.get("/:id", getBlog)

// Protected routes
router.post("/", authMiddleware, createBlog)
router.put("/:id", authMiddleware, updateBlog)
router.delete("/:id", authMiddleware, deleteBlog)

export default router
