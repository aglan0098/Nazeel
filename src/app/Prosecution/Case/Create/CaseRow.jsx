"use client";

import React from "react";
import {
  Minus,
  Plus,
  MoreVertical,
  SquareMousePointer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CaseRightsTable from "./CaseRightsTable";

export default function CaseRow({
  item,
  index,
  expandedId,
  toggleExpand,
  openDialogId,
  setOpenDialogId,
  menuId,
  setMenuId,
  setMenuPosition,
  getStatusStyle,
}) {
  return (
    <React.Fragment>
      <tr className="border-b last:border-b-0 border-gray-100">
        <td className="text-center py-5">
          <button
            onClick={() => toggleExpand(index)}
            className="bg-amber-50 text-amber-700 rounded px-2 py-1"
          >
            {expandedId === index ? <Minus size={16} /> : <Plus size={16} />}
          </button>
        </td>
        <td>
          <button
            onClick={() => setOpenDialogId(item.caseNumber)}
            className={`flex items-center gap-1 ${
              item.linkedPrisoners?.length === 0
                ? "text-gray-800 bg-gray-50 hover:bg-gray-100"
                : "text-blue-800 bg-blue-50 hover:bg-blue-100"
            } px-3 py-1.5 rounded-md mr-4  font-semibold text-sm`}
          >
            <SquareMousePointer size={14} />
            {item.caseNumber}
          </button>
        </td>
        <td>{item.caseType}</td>
        <td>
          {item.caseDate.gregorian} <br /> {item.caseDate.hijri}
        </td>
        <td>{item.penaltiesCount}</td>
        <td className="whitespace-pre-line text-right text-sm text-gray-700 leading-relaxed">
          {item.sentence}
        </td>
        <td>{item.executed}</td>
        <td>
          {item.endDate.gregorian} <br /> {item.endDate.hijri}
        </td>
        <td>
          <span
            className={`rounded-md px-2 py-1 text-xs text-center font-semibold ${getStatusStyle(
              item.judgmentType
            )}`}
          >
            {item.judgmentType}
          </span>
        </td>
        <td className="relative">
          <button
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMenuId(menuId === index ? null : index);
              setMenuPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
              });
            }}
            className="flex items-center gap-1 text-sm font-medium text-amber-800 bg-amber-50 hover:text-amber-950 hover:bg-amber-100 rounded-md px-3 py-1 transition"
          >
            <MoreVertical size={18} />
            عرض
          </button>
        </td>
      </tr>

      <AnimatePresence initial={false}>
        {expandedId === index && (
          <tr className="bg-white">
            <td colSpan={10} className="px-6 py-4">
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <CaseRightsTable rights={item.penalties} />
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
