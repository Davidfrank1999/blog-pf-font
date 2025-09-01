import DashboardLayout from "@/components/layouts/DashboardLayout"

export default function CreateBlog() {
  return (
    <DashboardLayout breadcrumb={{ parent: "Home", parentLink: "/", current: "Create Blog" }}>
      <h1 className="text-2xl font-bold mb-6">Write a New Blog</h1>
      {/* form goes here */}
    </DashboardLayout>
  )
}
