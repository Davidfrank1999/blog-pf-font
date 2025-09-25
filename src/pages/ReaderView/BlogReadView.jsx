import React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import Navbar from "@/components/Navbar"
import AdBanner from "@/components/ads/AdBanner"
import BlogContent from "@/components/BlogContent"

// temp data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp.", logo: Command, plan: "Free" },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "Travel", url: "#", icon: Map },
  ],
}

function BlogReadView() {
  return (
    <>
      {/* Top Navbar */}
      <Navbar />

      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen">
          {/* Fixed Sidebar */}
          <Sidebar
            collapsible="none"
            variant="sidebar"
            side="left"
            className="border-r fixed top-0 left-0 h-screen hidden md:flex w-64 flex-col"
          >
            <SidebarHeader>
              <NavUser user={data.user} />
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto">
              <NavMain items={data.navMain} />
              <NavProjects projects={data.projects} />
              <AdBanner />
            </SidebarContent>

            <SidebarFooter>
              {/* Footer actions */}
            </SidebarFooter>
          </Sidebar>

          {/* Main content area */}
          <SidebarInset className="flex-1 ml-0 md:ml-64 p-6 transition-all duration-300 overflow-y-auto min-h-screen">
            <div className="bg-amber-800 w-full h-32"></div>
            <BlogContent />
          </SidebarInset>

        </div>
      </SidebarProvider>
    </>
  )
}

export default BlogReadView
