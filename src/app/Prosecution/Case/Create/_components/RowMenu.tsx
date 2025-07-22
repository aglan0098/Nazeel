"use client";

import { PlusCircle, Edit2, Gavel, Eye } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RowMenu({ isOpen, onClose, position, prisonerIdNumber }) {
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const isAdmin = true;

  return (
    <AnimatePresence>
      {isOpen && position && (
        <motion.div
          ref={ref}
          key="row-menu"
          initial={{ opacity: 0, scale: 0.95, y: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute z-50 w-40 bg-white border border-gray-200 rounded-md shadow-lg"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <button className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-50">
            <PlusCircle size={16} /> إضافة
          </button>

          {isAdmin && (
            <>
              <button className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                <Edit2 size={16} /> تعديل القضية
              </button>
              <button className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                <Gavel size={16} /> تعديل العقوبة
              </button>
            </>
          )}

<button
  onClick={() => {
    if (prisonerIdNumber) {
      router.push(`/Prosecution/Case/Create/${prisonerIdNumber}`);
      onClose();
    } else {
      console.warn("رقم الهوية غير موجود");
    }
  }}
  className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-50"
>
  <Eye size={16} /> عرض
</button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
