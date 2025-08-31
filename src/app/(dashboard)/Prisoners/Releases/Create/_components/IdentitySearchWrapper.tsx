"use client";

import { useState, useCallback, ReactNode } from "react";
import { LoaderCircle, TextSearch, X, ArrowRightLeft } from "lucide-react";
import { usePrisonerStore } from "@/store/usePrisonerStore";

interface IdentitySearchBoxProps {
  children: ReactNode;
}

export default function IdentitySearchWrapper({ children }: IdentitySearchBoxProps) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    selectedPrisoner,
    setSelectedPrisoner,
    selectPrisonerById,
    resetNotFound,
  } = usePrisonerStore();

  const handleSearch = useCallback(() => {
    if (search.trim().length < 9 || search.trim().length > 10) return;
    setLoading(true);
    selectPrisonerById(search.trim());
    setTimeout(() => setLoading(false), 800);
  }, [search, selectPrisonerById]);

  return (
    <div className="rounded-xl bg-gray-100 mt-4 p-4 space-y-4">
      <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
        <div className="w-full md:w-[320px]">
          <label className="block text-sm font-medium text-right text-black mb-1">
            رقم الهوية <span className="text-red-600">*</span>
          </label>

          <div className="flex h-10 rounded-md overflow-hidden border border-gray-300 bg-white">
            <input
              type="text"
              placeholder="رقم الهوية"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value.replace(/\s/g, ""));
                resetNotFound();
              }}
              className="px-4 text-sm text-gray-900 flex-1 focus:outline-none"
            />
            {selectedPrisoner && (
              <button
                onClick={() => {
                  setSelectedPrisoner(null);
                  setSearch("");
                }}
                className="flex items-center px-2 text-gray-500 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleSearch}
              disabled={
                search.trim().length < 9 ||
                search.trim().length > 10 ||
                loading
              }
              className={`px-4 text-sm font-semibold flex items-center justify-center transition-colors duration-200 text-white ${
                search.trim().length < 9 ||
                search.trim().length > 10 ||
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#B9923C] hover:bg-[#a8822f]"
              }`}
            >
              {loading ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "بحث"
              )}
            </button>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 h-10 bg-amber-50 hover:bg-amber-100 text-amber-800 px-4 rounded-md text-sm font-medium"
        >
          {selectedPrisoner ? (
            <ArrowRightLeft className="w-4 h-4" />
          ) : (
            <TextSearch className="w-4 h-4" />
          )}
          {selectedPrisoner ? "تبديل السجين المختار" : "بحث متقدم"}
        </button>
      </div>

      <div>{children}</div>


    </div>
  );
}
