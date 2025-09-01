import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true }, // short description
    content: { type: String, required: true }, // full blog body (Quill/Markdown)
    image: { type: String, default: "" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
)

export default mongoose.model("Blog", blogSchema)
