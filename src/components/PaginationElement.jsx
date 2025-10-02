import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationElement() {
  return (
    <Pagination className="text-black ">
      <PaginationContent className="list-none flex">
        <PaginationItem>
          <PaginationPrevious href="#" className="no-underline" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="no-underline">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="no-underline">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="no-underline">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="no-underline" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
