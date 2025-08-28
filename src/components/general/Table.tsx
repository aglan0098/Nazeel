import React from "react";
import { transactions } from "@/data/demo";
import { CiSearch } from "react-icons/ci";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

function Table() {
  return (
    <div className="border border-gray-100 rounded-xl shadow-md p-5 mt-16">
      {/* search */}
      <div className="bg-gray-100 border border-gray-200 rounded-xl p-2 w-full sm:w-1/4 flex items-center gap-1 mb-5">
        <CiSearch className="text-2xl" />

        <input
          type="text"
          placeholder="بحث"
          className="h-6 w-full px-3 focus:outline-0"
        />
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y-2 divide-gray-200 border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr className="*:text-gray-700 divide-x divide-gray-200">
              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>رقم</p>
                  <FaArrowUpWideShort />
                </div>
              </th>

              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>موضوع المعاملة</p>
                  <FaArrowUpWideShort />
                </div>
              </th>

              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>الجهة الوارد منها</p>
                  <FaArrowUpWideShort />
                </div>
              </th>

              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>داخلي / خارجي</p>
                  <FaArrowUpWideShort />
                </div>
              </th>

              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>تاريخ الوارد</p>
                  <FaArrowUpWideShort />
                </div>
              </th>

              <th className="px-3 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>عدد المرفقات</p>
                  <FaArrowUpWideShort />
                </div>
              </th>

              <th className="px-3 py-4 whitespace-nowrap">أختر</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {transactions.map((item) => (
              <tr
                key={item.id}
                className="*:text-gray-900 *:first:font-medium divide-x divide-gray-200 text-center"
              >
                <td className="p-3 whitespace-nowrap">{item.id}</td>
                <td className="p-3 whitespace-nowrap">{item.subject}</td>
                <td className="p-3 whitespace-nowrap">{item.source}</td>
                <td className="p-3 whitespace-nowrap">{item.type}</td>
                <td className="p-3 whitespace-nowrap">{item.date}</td>
                <td className="p-3 whitespace-nowrap">{item.attachments}</td>
                <td className="p-3 whitespace-nowrap">
                  <input type="checkbox" className="accent-main" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-end mt-5 space-x-2">
        <button className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          <MdKeyboardDoubleArrowRight />
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
          1
        </button>
        <button className="px-3 py-1 bg-main text-white rounded-lg">2</button>
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
          3
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
          ...
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">
          10
        </button>
        <button className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          <MdKeyboardDoubleArrowLeft />
        </button>
      </div>
    </div>
  );
}

export default Table;
