import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  className?: string;
  page: number;
  numberOfPages: number;
  setPage: (page: number) => void;
}

export function CustomPagination({
  className,
  page,
  numberOfPages,
  setPage,
}: CustomPaginationProps) {
  function onPrevious() {
    if (page === 1) return;

    setPage(page - 1);
  }

  function onNext() {
    if (page === numberOfPages) return;

    setPage(page + 1);
  }

  function onPageChange(page: number) {
    setPage(page);
  }

  const pages: (number | "ellipsis")[] = (() => {
    const result: (number | "ellipsis")[] = [];
    const maxVisible = 4; // max number of pages to show around current
    const half = Math.floor(maxVisible / 2);

    if (numberOfPages <= maxVisible) {
      // If total pages are few, just show all pages
      for (let i = 1; i <= numberOfPages; i++) result.push(i);
    } else {
      // Determine start and end around current page
      let start = page - half;
      let end = page + half;

      // Clamp start to 2 (we always show first page separately)
      if (start < 2) {
        start = 2;
        end = start + maxVisible - 3; // adjust end to maintain visible pages
      }

      // Clamp end to numberOfPages - 1 (last page shown separately)
      if (end > numberOfPages - 1) {
        end = numberOfPages - 1;
        start = end - (maxVisible - 3); // adjust start accordingly
      }

      result.push(1); // always show first page
      if (start > 2) result.push("ellipsis"); // show ellipsis if gap from first page

      // Push pages around current page
      for (let i = start; i <= end; i++) result.push(i);

      if (end < numberOfPages - 1) result.push("ellipsis"); // ellipsis if gap to last page
      result.push(numberOfPages); // always show last page
    }

    return result;
  })();

  return (
    <Pagination className={`${className}`}>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={onPrevious} />
          </PaginationItem>
        )}
        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                isActive={p === page}
                onClick={() => onPageChange(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        {page < numberOfPages && (
          <PaginationItem>
            <PaginationNext onClick={onNext} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
