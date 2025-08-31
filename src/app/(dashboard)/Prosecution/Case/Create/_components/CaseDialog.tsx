"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseDialog({
  isOpen,
  onClose,
  caseNumber,
  linkedPrisoners = [],
}) {
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
              <Dialog.Panel className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <Dialog.Title className="text-lg font-bold text-gray-800">
                    بيانات المرتبطين بالقضية رقم {caseNumber}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 transition p-1  rounded-lg"
                    aria-label="إغلاق"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* الجدول */}
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full text-sm text-right">
                    <thead className="bg-gray-50 text-gray-700 font-medium">
                      <tr>
                        <th className="p-3">الاسم</th>
                        <th className="p-3">الهوية</th>
                        <th className="p-3">الجنسية</th>
                        <th className="p-3">السجن</th>
                        <th className="p-3">الجناح</th>
                      </tr>
                    </thead>
<tbody className="text-gray-700">
  {linkedPrisoners.length === 0 ? (
    <tr>
      <td colSpan={5} className="text-center py-6 text-gray-500">
        لا توجد بيانات مرتبطة بهذه القضية.
      </td>
    </tr>
  ) : (
    linkedPrisoners.map((prisoner, index) => (
      <tr key={index} className="hover:bg-gray-50 transition">
        <td className="p-3 font-medium">{prisoner.name}</td>
        <td className="p-3">{prisoner.idNumber}</td>
        <td className="p-3">{prisoner.nationality}</td>
        <td className="p-3">{prisoner.prison}</td>
        <td className="p-3">{prisoner.section}</td>
      </tr>
    ))
  )}
</tbody>

                  </table>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
