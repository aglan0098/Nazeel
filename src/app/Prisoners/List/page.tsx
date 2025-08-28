"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/general/pagination";
// components
import { CiSearch } from "react-icons/ci";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { HiMiniEye } from "react-icons/hi2";
// data
import { prisoners } from "@/data/mockPrisoners";

function PrisonersList() {
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
    <div className="border border-gray-100 rounded-lg p-5 shadow-md my-5">
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
                  <p>رقم الهوية</p>
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
                  <p>القضية</p>
                  <FaArrowUpWideShort />
                </div>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>ت.الدخول</p>
                  <FaArrowUpWideShort />
                </div>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>ت.الخروج</p>
                  <FaArrowUpWideShort />
                </div>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>حالة السجن</p>
                  <FaArrowUpWideShort />
                </div>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                  <p>اختار</p>
                  <FaArrowUpWideShort />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {prisoners.map((item) => (
              <tr
                key={item.id}
                className="*:text-gray-900 *:first:font-medium divide-x divide-gray-200 text-center"
              >
                <td className="px-3 py-2 whitespace-nowrap">{item.id}</td>
                <td className="px-3 py-2 whitespace-nowrap">{item.fullName}</td>

                <td className="px-3 py-2 whitespace-nowrap">
                  {item.cases[0].caseType}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.nationality}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{item.religion}</td>
                <td className="px-3 py-2 whitespace-nowrap">{item.gender}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {item.birthDate}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-xl">
                  <button
                    className="cursor-pointer text-gray-400"
                    onClick={() => goToPage(item.id)}
                  >
                    <HiMiniEye />
                  </button>
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
  );
}

export default PrisonersList;
