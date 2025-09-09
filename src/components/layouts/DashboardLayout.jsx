import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BreadcrumbNav from "@/components/BreadcrumbNav"

export default function DashboardLayout({ children, breadcrumb }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="bg-gradient-to-br from-background via-secondary/20 to-accent/10 text-foreground min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="px-6 pt-6">
            <BreadcrumbNav
              current={breadcrumb.current}
              parent={breadcrumb.parent}
              parentLink={breadcrumb.parentLink}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 px-6 py-10 container mx-auto max-w-6xl">
          <div className="bg-card/80 backdrop-blur-lg border border-border rounded-2xl shadow-lg p-8 transition hover:shadow-xl">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
