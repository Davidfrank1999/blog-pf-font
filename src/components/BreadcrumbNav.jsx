// src/components/BreadcrumbNav.jsx
import { ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export default function BreadcrumbNav({ parent, parentLink = "/", current }) {
  return (
    <div className="px-6 py-3 border-b border-border bg-gradient-to-r from-chart-2/10 via-background to-chart-3/10">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-1 text-sm font-medium list-none">
          {/* Home always visible */}
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-primary font-semibold hover:opacity-80 transition no-underline"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Parent (only if not 'Home') */}
          {parent && parent !== "Home" && (
            <>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={parentLink}
                  className="text-muted-foreground hover:text-foreground transition no-underline"
                >
                  {parent}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}

          {/* Current Page */}
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-chart-2 font-bold">
              {current}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
