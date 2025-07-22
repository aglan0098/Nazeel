"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function CaseRightsTable({ rights }) {
  return (
    <AnimatePresence>
      <motion.div
        key="rights-table"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-x-auto"
      >
        {rights.length === 0 ? (
          <div className="text-center text-gray-500 py-6  rounded-md bg-gray-50">
            لا توجد عقوبات لهذه القضية
          </div>
        ) : (
          <div className="text-center text-gray-800   rounded-md ">
            <h2 className="text-lg font-semibold mb-3">قائمة تنفيذ العقوبات</h2>
            <table className="min-w-[400px] w-full text-sm text-center rounded-md">
              <thead className="bg-white text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-2">نوع الحق</th>
                  <th className="px-4 py-2">نوع العقوبة</th>
                  <th className="px-4 py-2">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {rights.map((r, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 text-gray-800">{r.rightType}</td>
                    <td className="px-4 py-2 text-gray-800">{r.penaltyType}</td>
                    <td className="px-4 py-2">
                      <span className="bg-yellow-800 text-yellow-50 px-3 py-1 text-xs rounded-md font-semibold">
                        حكم ابتدائي غير قابل للتنفيذ
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
