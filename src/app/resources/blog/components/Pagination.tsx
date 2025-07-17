interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex justify-center items-center gap-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`relative p-2 rounded-lg transition-all ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-white hover:bg-white/10'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                currentPage === page
                  ? 'bg-[#fcba28] text-black'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="text-gray-400">
              {page}
            </span>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`relative p-2 rounded-lg transition-all ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-white hover:bg-white/10'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
