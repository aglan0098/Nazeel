"use client";

import { useState, useCallback } from "react";
import { ChevronDown, TextSearch } from "lucide-react";
import PrisonersListDialog from "./PrisonersListDialog";
import { usePrisonerStore } from "@/store/usePrisonerStore";

const PrisonerSearchWrapper = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
const { setSelectedPrisoner, selectPrisonerById, resetNotFound } = usePrisonerStore(); // ✅

  const handleSelectPrisoner = (prisoner) => {
    setSelectedPrisoner(prisoner);
      resetNotFound(); // ← إعادة تعيين عند اختيار سجين من القائمة

    setOpen(false); // إغلاق القائمة
  };

  const handleSearch = useCallback(() => {
    selectPrisonerById(search.trim());
  }, [search, selectPrisonerById]);
  return (
    <div className="rounded-xl bg-gray-100 mt-4  p-4 space-y-4">
      {/* الأعلى */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* البحث */}
        <div className="flex items-center  w-full md:w-auto">
          <div className="relative">
            <select className="appearance-none border rounded-r-md px-4 py-2 text-sm text-gray-700 border-gray-300 bg-gray-100">
              <option>رقم الهوية</option>
              {/* أضف خيارات إضافية هنا */}
            </select>
            <ChevronDown className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
          </div>

          <input
  type="text"
  placeholder="بحث..."
  value={search}
  onChange={(e) => {
    setSearch(e.target.value.replace(/\s/g, ''));
    resetNotFound(); 
  }}
            className="border-t border-b border-l px-4 py-2 bg-white text-sm rounded-l-md w-full md:w-64 focus:outline-none border-gray-300"
          />

          <button
            onClick={handleSearch}
            className="bg-[#B9923C] hover:bg-[#a8822f] text-white mr-3 px-6 py-2 rounded-md text-sm font-medium"
          >
            بحث
          </button>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-amber-800 font-medium text-sm bg-amber-50 hover:bg-amber-100 transition-all duration-200 active:scale-95"
        >
          <TextSearch className="text-xl" />
          <span>اختر من قائمة السجناء</span>
        </button>
      </div>

      <div>{children}</div>
      <PrisonersListDialog isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default PrisonerSearchWrapper;
