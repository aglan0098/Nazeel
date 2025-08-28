"use client";

import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // always show first
        i === totalPages || // always show last
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center mt-5 gap-1 flex-wrap">
      {/* Left buttons */}
      <div className="flex gap-1">
        <button
          className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          ⏭
        </button>
        <button
          className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ▶
        </button>
      </div>

      {/* Page numbers */}
      <div className="flex gap-1 px-4">
        {visiblePages.map((page, index) => {
          const prev = visiblePages[index - 1];
          const showDots = prev && page - prev > 1;

          return (
            <React.Fragment key={page}>
              {showDots && <span className="px-2">...</span>}
              <button
                className={`px-3 py-1 rounded-lg ${
                  currentPage === page
                    ? "bg-main text-white"
                    : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Right buttons */}
      <div className="flex gap-1">
        <button
          className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ◀
        </button>
        <button
          className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          ⏮
        </button>
      </div>
    </div>
  );
};

export default Pagination;
