"use client";
// await new Promise(res => setTimeout(res, 20000));


import React, { useState, useRef, useEffect, useCallback } from "react";
import { PlusCircle } from "lucide-react";
import { usePrisonerStore } from "@/store/usePrisonerStore";
import CaseRow from "./CaseRow";
import { Suspense, lazy } from "react";
const CaseDialog = lazy(() => import("./CaseDialog"));
import RowMenu from "./RowMenu";
const AddCaseDialog = lazy(() => import("./AddCaseDialog"));
export default function CasesTable() {
  const { selectedPrisoner } = usePrisonerStore();
  const [expandedId, setExpandedId] = useState(null);
  const [openDialogId, setOpenDialogId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  const selectedItem = selectedPrisoner?.cases.find(
    (d) => d.caseNumber === openDialogId
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuId(null);
      }
    };

    if (menuId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuId]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusStyle = useCallback((status) => {
    switch (status) {
      case "موقوف":
        return "bg-yellow-50 text-yellow-700";
      case "محال الى المحكمة":
        return "bg-blue-50 text-blue-700";
      case "محكوم حكم ابتدائي":
        return "bg-green-50 text-green-700";
      case "محكوم حكم نهائي":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  }, []);

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden mt-6">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">القضايا</h2>
        {selectedPrisoner?.cases.length > 0 && (
          <button
            onClick={() => setOpenAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-amber-700 font-medium text-sm bg-amber-50 hover:bg-amber-100 transition-all duration-200 active:scale-95"
          >
            <PlusCircle size={16} className="stroke-[2]" />
            إضافة قضية
          </button>
        )}
      </div>

      <table className="w-full text-sm text-right">
        <thead className="bg-gray-50 text-gray-700 font-semibold">
          <tr>
            <th className="p-3">إظهار</th>
            <th className="p-3">رقم القضية</th>
            <th className="p-3">نوع القضية</th>
            <th className="p-3">تاريخ القضية</th>
            <th className="p-3">عدد العقوبات</th>
            <th className="p-3">المحكومية</th>
            <th className="p-3">العقوبات المنفذة</th>
            <th className="p-3">تاريخ الانتهاء</th>
            <th className="p-3">نوع الحكم</th>
            <th className="p-3">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {selectedPrisoner?.cases.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center text-gray-500 py-6">
                لا توجد سجلات
              </td>
            </tr>
          )}

          {selectedPrisoner?.cases.map((item, index) => (
            <CaseRow
              key={index}
              item={item}
              index={index}
              expandedId={expandedId}
              toggleExpand={toggleExpand}
              openDialogId={openDialogId}
              setOpenDialogId={setOpenDialogId}
              menuId={menuId}
              setMenuId={setMenuId}
              setMenuPosition={setMenuPosition}
              getStatusStyle={getStatusStyle}
            />
          ))}
        </tbody>
      </table>

{selectedItem && (
  <Suspense fallback={null}>
    <CaseDialog
      isOpen={true}
      onClose={() => setOpenDialogId(null)}
      caseNumber={selectedItem.caseNumber}
      linkedPrisoners={selectedItem.linkedPrisoners || []}
    />
  </Suspense>
)}

      {menuId !== null && (
<RowMenu
  isOpen={true}
  onClose={() => setMenuId(null)}
  position={menuPosition}
  prisonerIdNumber={selectedPrisoner?.idNumber}
/>

      )}

<Suspense fallback={null}>
  <AddCaseDialog
    isOpen={openAddModal}
    onClose={() => setOpenAddModal(false)}
  />
</Suspense>

    </div>
  );
}
