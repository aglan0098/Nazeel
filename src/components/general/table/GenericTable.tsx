"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// components
import SearchInput from "./SearchInput";
import Table from "./Table";
import Pagination from "./Pagination";

// Types
type Column = {
  key: string;
  label: string;
  render?: (r: any) => React.ReactNode;
};

type GenericTableProps = {
  mockData: any;
  columns: Column[];
  queryKey: string;

  queryFn?: (params: {
    page: number;
    pageSize: number;
    search: string;
  }) => Promise<any>;

  pageSize?: number;
  showCreateButton?: boolean;
  onCreate?: () => void;
};

export default function GenericTable({
  mockData,
  columns,
  queryKey,
  queryFn,
  pageSize = 10,
  showCreateButton = false,
  onCreate,
}: GenericTableProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // --- defaultQueryFn: للموك فقط وقت التطوير (local data)
  async function defaultQueryFn({
    page,
    pageSize,
    search,
  }: {
    page: number;
    pageSize: number;
    search: string;
  }) {
    const q = (search || "").trim().toLowerCase();

    // هنا عملنا filter بشكل عام (بدون تحديد أعمدة) عشان يكون مجرد مثال مؤقت
    const all = mockData.data;

    const filtered = q
      ? all.filter((item: any) =>
        Object.values(item).some((val) =>
          String(val || "")
            .toLowerCase()
            .includes(q)
        )
      )
      : all;

    const recordsFiltered = filtered.length;
    const start = (page - 1) * pageSize;
    const pageRows = filtered.slice(start, start + pageSize);

    await new Promise((r) => setTimeout(r, 250));

    return {
      draw: mockData.draw,
      data: pageRows,
      recordsTotal: mockData.recordsTotal,
      recordsFiltered,
    };

    /*
      // ====== باك اند (لو عايز تستخدمه بدل الموك) ======
      // const res = await axiosClient.post('/endpoint-here', { page, pageSize, search });
      // return res.data;
      */
  }

  // هنختار الـ fetcher: يا إما جايلنا من برا (queryFn) أو هنستخدم الموك
  const fetcher: (params: {
    page: number;
    pageSize: number;
    search: string;
  }) => Promise<any> = queryFn ?? defaultQueryFn;

  // React Query: هيعمل كاش بناءً على key + params
  const { data, isLoading, isFetching, error } = useQuery<{
    draw: number;
    data: any[];
    recordsTotal: number;
    recordsFiltered: number;
  }>({
    queryKey: [queryKey, { page, pageSize, search }],
    queryFn: () => fetcher({ page, pageSize, search }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2, // دقيقتين
  });

  const rows = data?.data ?? [];
  const total = data?.recordsFiltered ?? data?.recordsTotal ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="border border-gray-100 rounded-xl shadow-md p-5 mx-3 mt-7">
      {/* Search & Create Button */}
      <div className="flex justify-between items-center mb-5">
        <SearchInput
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />

        {showCreateButton && (
          <button
            onClick={onCreate}
            className="py-3 px-10 bg-main text-white rounded-lg cursor-pointer"
          >
            إضافة
          </button>
        )}
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="p-4">جارٍ التحميل...</div>
      ) : (
        <>
          <Table columns={columns} rows={rows} />

          {isFetching && !isLoading && (
            <div className="text-sm mt-2">تحديث...</div>
          )}

          <div className="mt-4">
            <div className="mb-2">إجمالي السجلات: {total}</div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}

      {error && (
        <div className="text-red-500 mt-3">
          حدث خطأ: {(error as Error).message}
        </div>
      )}
    </div>
  );
}
