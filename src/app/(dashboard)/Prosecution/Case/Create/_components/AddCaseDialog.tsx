"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddCaseDialog({ isOpen, onClose }) {
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
              className="w-full max-w-4xl"
            >
              <Dialog.Panel className="bg-white rounded-2xl shadow-2xl w-full p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <Dialog.Title className="text-lg font-bold text-gray-800">
                    إضافة قضية جديدة
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 transition p-1 rounded-lg"
                    aria-label="إغلاق"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Form fields */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        رقم القضية
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="مثال: 123456"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        مسمى القضية الأساسي{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                        <option>الرجاء الاختيار</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        تصنيف القضية <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                        <option>الرجاء الاختيار</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        مكان القضية <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                        <option>الرجاء الاختيار</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        تاريخ القضية <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        readOnly
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                        value="21/01/1447"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      الوصف الجرمي للقضية{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea className="w-full h-28 border border-gray-300 rounded-md px-3 py-2 text-sm" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      إرفاق ملف القضية <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-dashed border-yellow-600 bg-yellow-50 rounded-md p-6 text-center text-sm text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-6 h-6 text-yellow-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span>
                          تصفح واختر الملفات التي تريد تحميلها من الكمبيوتر
                          الخاص بك
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left">
                    <button
                      type="submit"
                      className="bg-yellow-700 hover:bg-yellow-800 text-white px-6 py-2 rounded-md"
                    >
                      إضافة
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
