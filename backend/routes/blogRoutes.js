import express from "express"
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  deleteComment,
  toggleBookmark,
  getBookmarkedBlogs,
  incrementView,
} from "../controllers/blogController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getBlogs).post(protect, createBlog)
router.route("/bookmarks").get(protect, getBookmarkedBlogs)
router.route("/:id").get(getBlog).put(protect, updateBlog).delete(protect, deleteBlog)
router.put("/:id/view", incrementView)
router.post("/:id/like", protect, likeBlog)
router.put("/:id/bookmark", protect, toggleBookmark)
router.post("/:id/comments", protect, addComment)
router.delete("/comments/:id", protect, deleteComment)

export default router
