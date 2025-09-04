import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BreadcrumbNav from "@/components/BreadcrumbNav"

export default function DashboardLayout({ children, breadcrumb }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="bg-background text-foreground min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Breadcrumb */}
        {breadcrumb && (
          <BreadcrumbNav
            current={breadcrumb.current}
            parent={breadcrumb.parent}
            parentLink={breadcrumb.parentLink}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-6 py-10 container mx-auto max-w-6xl">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
