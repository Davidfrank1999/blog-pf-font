import { ChevronRight, FileText, Settings, Home, Plus, LogOut } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar(props) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarContent className="bg-chart-2/5 backdrop-blur-md border-r border-border flex flex-col">
        {/* Branding */}
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">
            🚀 MyBlog
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Control Center</p>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wide text-muted-foreground px-6 mb-2">
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/dashboard"}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition no-underline data-[active=true]:bg-chart-2/20 data-[active=true]:text-chart-2 hover:bg-chart-2/10 hover:text-chart-2"
                >
                  <Link to="/dashboard">
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Posts Collapsible */}
              <SidebarMenuItem>
                <Collapsible className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition no-underline hover:bg-chart-2/10 hover:text-chart-2 data-[active=true]:bg-chart-2/20 data-[active=true]:text-chart-2"
                      isActive={location.pathname.startsWith("/posts")}
                    >
                      <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      <FileText className="h-4 w-4" />
                      Posts
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="pl-9 mt-1 space-y-1">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/posts"}
                          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition no-underline hover:bg-muted data-[active=true]:bg-muted data-[active=true]:text-foreground"
                        >
                          <Link to="/posts">All Posts</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/posts/create"}
                          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition no-underline hover:bg-muted data-[active=true]:bg-muted data-[active=true]:text-foreground"
                        >
                          <Link to="/posts/create">
                            <Plus className="h-4 w-4" /> Create New
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/settings"}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition no-underline hover:bg-chart-2/10 hover:text-chart-2 data-[active=true]:bg-chart-2/20 data-[active=true]:text-chart-2"
                >
                  <Link to="/settings">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout at bottom */}
        <div className="mt-auto p-6">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition no-underline"
              >
                <Link to="/logout">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
