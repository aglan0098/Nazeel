"use client";

import { Skeleton } from "@/components/general/skeleton";

export default function CasesTableSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden mt-6">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-700">القضايا</h2>
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>

      <div className="grid grid-cols-10 gap-2 px-4 py-2  bg-gray-50">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      <div className="p-4 space-y-4">
        {[...Array(2)].map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-10 gap-3">
            {[...Array(10)].map((_, colIdx) => (
              <Skeleton key={colIdx} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
