import { ChevronRight, FileText, Folder, Settings, Home } from "lucide-react";
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
      <SidebarContent className="bg-background/95 backdrop-blur">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-chart-2">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/dashboard"}
                  className="no-underline"
                >
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={location.pathname.startsWith("/posts")}
                      className="no-underline"
                    >
                      <ChevronRight className="transition-transform" />
                      <Folder className="h-5 w-5" />
                      Posts
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="pl-6">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/posts"}
                          className="no-underline"
                        >
                          <Link to="/posts" className="flex items-center gap-2">
                            <FileText className="h-5 w-5" /> All Posts
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === "/posts/create"}
                          className="no-underline"
                        >
                          <Link
                            to="/posts/create"
                            className="flex items-center gap-2"
                          >
                            <FileText className="h-5 w-5" /> Create New
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/settings"}
                  className="no-underline"
                >
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
