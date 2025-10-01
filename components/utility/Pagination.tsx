"use client"
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
                             currentPage,
                             totalPages,
                             onPageChange,
                             className = "",
                           }: PaginationProps) {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      // @ts-ignore
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page) => (
          <Button
            // className="bg-green-500"
            key={page}
            variant={page === currentPage ? "secondary" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <span className="sr-only">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}