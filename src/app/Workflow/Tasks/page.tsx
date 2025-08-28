"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Pagination from "@/components/general/pagination";
import { requests } from "@/data/test_data/requests";

// icons
import { CiSearch } from "react-icons/ci";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { HiMiniEye } from "react-icons/hi2";
import { AiFillPrinter } from "react-icons/ai";

function Tasks() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("tasks");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Pagination logic
  // const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const ITEMS_PER_PAGE = 10;

  const fetchTasks = async (page: number) => {
    try {
      const res = await fetch(
        `/api/tasks?page=${page}&limit=${ITEMS_PER_PAGE}`
      );

      const { data, total } = await res.json();
      // setTasks(data);
      setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  // Navigate
  const router = useRouter();

  const goToPage = (id) => {
    router.push(`/Workflow/Tasks/${id}`);
  };

  return (
    <>
      {/* Switch */}
      <div className="bg-gray-100 text-gray-500 rounded-xl my-7 mx-auto sm:mx-0 w-fit p-1 flex justify-evenly">
        <button
          onClick={() => handleTabClick("tasks")}
          className={`px-4 md:px-11 py-3 cursor-pointer rounded-lg text-md ${
            activeTab === "tasks" ? "bg-white text-main" : ""
          }`}
        >
          قائمة المهام
        </button>
        <button
          onClick={() => handleTabClick("done")}
          className={`px-4 md:px-11 py-3 cursor-pointer rounded-lg text-md ${
            activeTab === "done" ? "bg-white text-main" : ""
          }`}
        >
          المهام المنفذه
        </button>
      </div>

      {/* Table Container */}
      <div className="border border-gray-100 rounded-lg p-5 shadow-md">
        {/* search */}
        <div className="bg-gray-100 border border-gray-200 rounded-2xl p-2 w-full sm:w-1/4 flex items-center gap-1 justify-between mb-5">
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
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>رقم الطلب</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>

                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>نوع الطلب</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>

                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>اسم السجين</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>

                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>تاريخ الإرسال</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>المنطقة</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>اسم السجن</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>مرحلة الطلب</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>حالة الطلب</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>

                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3"></div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {requests.map((item) => (
                <tr
                  key={item.id}
                  className="*:text-gray-900 *:first:font-medium divide-x divide-gray-200 text-center"
                >
                  <td className="px-3 py-2 whitespace-nowrap">{item.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.type}</td>

                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.prisoner_name}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.area}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.prison_name}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.request_stage}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.request_status}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-2xl flex items-center justify-center gap-5">
                    <button
                      className="cursor-pointer text-gray-400"
                      onClick={() => goToPage(item.id)}
                    >
                      <HiMiniEye />
                    </button>
                    {activeTab === "tasks" && (
                      <button
                        className="border border-main text-main bg-[#F4F4F0] rounded-xl text-sm p-2 px-6 cursor-pointer"
                        onClick={() => goToPage(item.id)}
                      >
                        إتخاذ إجراء
                      </button>
                    )}
                    {activeTab === "done" && (
                      <AiFillPrinter className="text-gray-400 cursor-pointer" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default Tasks;
