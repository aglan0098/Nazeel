"use client";

import { useState, useCallback, ReactNode } from "react";
import {
  ChevronDown,
  TextSearch,
  LoaderCircle,
  ArrowRightLeft,
} from "lucide-react";
import PrisonersListDialog from "./PrisonersListDialog";
import { X } from "lucide-react";

import { usePrisonerStore } from "@/store/usePrisonerStore";
import type { Prisoner } from "@/types/Prisoner"; // تأكد أن لديك هذا النوع أو أنشئه

interface PrisonerSearchWrapperProps {
  children: ReactNode;
}

const PrisonerSearchWrapper: React.FC<PrisonerSearchWrapperProps> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { selectedPrisoner } = usePrisonerStore();

  const { setSelectedPrisoner, selectPrisonerById, resetNotFound } =
    usePrisonerStore();

  const handleSelectPrisoner = (prisoner: Prisoner) => {
    setSelectedPrisoner(prisoner);
    setSearch(prisoner.idNumber);
    resetNotFound();
    setOpen(false);
  };

  const handleSearch = useCallback(() => {
    if (search.trim().length < 9 || search.trim().length > 12) return;
    setLoading(true);
    selectPrisonerById(search.trim());
    setTimeout(() => setLoading(false), 800);
  }, [search, selectPrisonerById]);

  return (
    <div className="rounded-xl bg-gray-100 mt-4 p-4 space-y-4">
      {/* الأعلى */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* البحث */}
        <div className="flex items-center w-full md:w-auto gap-3">
          <div className="flex items-stretch rounded-md overflow-hidden border border-gray-300 bg-white">
            <div className="relative">
              <select className="appearance-none pl-8 pr-4 py-2 text-sm text-gray-700 bg-gray-100 border-l border-gray-300 focus:outline-none">
                <option>رقم الهوية</option>
              </select>
              <ChevronDown className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
            </div>
<div className="relative">
  <input
    type="text"
    placeholder="قم بالبحث برقم الهوية..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value.replace(/\s/g, ""));
      resetNotFound();
    }}
    className="px-4 py-2 pl-8 text-sm text-gray-900 focus:outline-none"
  />
  {selectedPrisoner && (
    <button
      onClick={() => {
        setSelectedPrisoner(null);
        setSearch("");
      }}
      className="absolute inset-y-0 left-2 flex items-center text-gray-500 hover:text-red-600"
    >
      <X className="text-sm font-bold"/>
    </button>
  )}
</div>

          </div>

          <button
            onClick={handleSearch}
            disabled={search.trim().length < 9 || search.trim().length > 12|| loading}
            className={`px-8 py-2 text-sm font-semibold flex items-center justify-center gap-2 rounded-md transition-colors duration-200 ${
              search.trim().length < 9 || search.trim().length > 12 || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#B9923C] hover:bg-[#a8822f]"
            }`}
          >
            {loading ? (
              <LoaderCircle className="w-6 h-5 animate-spin" />
            ) : (
              <div className="text-white">بحث</div>
            )}
          </button>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-amber-800 font-medium text-sm bg-amber-50 hover:bg-amber-100 transition-all duration-200 active:scale-95"
        >
          {selectedPrisoner ? (
            <ArrowRightLeft className="w-4 h-4" />
          ) : (
            <TextSearch className="w-4 h-4" />
          )}
          <span>
            {selectedPrisoner
              ? "تبديل السجين المختار"
              : "اختر من قائمة السجناء"}
          </span>
        </button>
      </div>

      <div>{children}</div>

      <PrisonersListDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onSelect={handleSelectPrisoner}
      />
    </div>
  );
};

export default PrisonerSearchWrapper;
