"use client";

import { useCallback } from "react";
import { Dialog } from "@headlessui/react";
import { X, CheckCircle, RefreshCw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrisonerStore } from "@/store/usePrisonerStore";
import type { Prisoner } from "@/types/Prisoner";

interface PrisonersListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (prisoner: Prisoner) => void;
}

export default function PrisonersListDialog({
  isOpen,
  onClose,
  onSelect,
}: PrisonersListDialogProps) {
  const { prisoners } = usePrisonerStore();
  const { selectedPrisoner } = usePrisonerStore();

  const getStatusStyle = useCallback((status: string | undefined): string => {
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
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Dialog.Panel className="bg-white rounded-xl shadow-xl w-[1100px] max-h-[90vh] overflow-hidden p-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <Dialog.Title className="text-lg font-bold">
                    قائمة السجناء
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Filters and actions */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="بحث"
                      className="px-4 py-2 border rounded-md text-sm bg-gray-100 text-gray-600 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-amber-50 text-amber-800 hover:bg-amber-100 transition px-4 py-2 rounded-md text-sm font-medium">
                      تصدير
                    </button>
                    <button className="bg-amber-50 text-amber-800 hover:bg-amber-100 transition px-4 py-2 rounded-md text-sm font-medium">
                      تحديد أعمدة العرض
                    </button>
                    <button className="bg-amber-50 text-amber-800 hover:bg-amber-100 transition px-4 py-2 rounded-md text-sm font-medium">
                      البحث المتقدم
                    </button>
                    <button className="bg-amber-50 text-amber-800 hover:bg-amber-100 transition px-4 py-2 rounded-md text-sm font-medium">
                      <RefreshCw />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-auto max-h-[70vh]">
                  <table className="w-full text-sm text-right border-separate border-spacing-y-2">
                    <thead className="bg-gray-50 text-gray-800 font-medium sticky top-0 rounded-md">
                      <tr>
                        <th className="px-4 py-2">الرقم</th>
                        <th className="px-4 py-2">الهوية</th>
                        <th className="px-4 py-2">الاسم</th>
                        <th className="px-4 py-2">القضية</th>
                        <th className="px-4 py-2">تاريخ الدخول</th>
                        <th className="px-4 py-2">تاريخ الخروج</th>
                        <th className="px-4 py-2">حالة النزيل</th>
                        <th className="px-4 py-2">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prisoners.map((prisoner, index) => (
                        <tr
                          key={prisoner.id}
                          className={`${
                            selectedPrisoner?.id === prisoner.id
                              ? "bg-gray-50 rounded-sm  "
                              : ""
                          }`}
                        >
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{prisoner.idNumber}</td>
                          <td className="px-4 py-2">{prisoner.fullName}</td>
                          <td className="px-4 py-2">
                            {prisoner.cases?.[0]?.caseType || "-"}
                          </td>
                          <td className="px-4 py-2">
                            {prisoner.cases?.[0]?.caseDate?.gregorian || "-"}
                          </td>
                          <td className="px-4 py-2">
                            {prisoner.cases?.[0]?.endDate?.gregorian || "-"}
                          </td>
                          <td className="px-4">
                            <div
                              className={`rounded-md px-3 py-1.5 text-sm text-center font-semibold ${getStatusStyle(
                                prisoner.cases?.[0]?.judgmentType
                              )}`}
                            >
                              {prisoner.cases?.[0]?.judgmentType || "غير معروف"}
                            </div>
                          </td>
                          <td className="px-4">
                            {selectedPrisoner?.id === prisoner.id ? (
                              <div className=" items-center   text-amber-800 font-semibold text-center">
                                مختار حالياً
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  onSelect(prisoner);
                                  onClose();
                                }}
                                className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-amber-100 transition w-full justify-center"
                              >
                                <CheckCircle className="w-4 h-4" />
                                اختر
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer pagination */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-700 px-2">
                  <div>عرض 11 إلى 20 من 51 سجل</div>
                  <div className="flex items-center gap-2">
                    <button className="hover:underline">الأول</button>
                    <button className="hover:underline">السابق</button>
                    {[1, 2, 3, 4, 5, 6].map((page) => (
                      <button
                        key={page}
                        className={`px-2 py-1 rounded ${
                          page === 2
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button className="hover:underline">التالي</button>
                    <button className="hover:underline">الأخير</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>عرض</span>
                    <select className="border rounded px-2 py-1">
                      <option>10</option>
                      <option>20</option>
                      <option>50</option>
                    </select>
                    <span>سجلات</span>
                  </div>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
