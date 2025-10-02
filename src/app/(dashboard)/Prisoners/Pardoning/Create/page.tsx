"use client";

import React, { useEffect, useState } from "react";
import Prisoner_Info_Card from "@/components/general/Prisoner_Info_Card";
// form data
import SmartForm from "@/components/general/formComponent";
import formConfig from "./formConfig";
import Pagination from "@/components/general/table/Pagination";
// icons
import { CiSearch } from "react-icons/ci";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
// data
import { prisoners } from "@/data/mockPrisoners";
// dialogs
import { Dialog, DialogPanel } from "@headlessui/react";

function Pardoning() {
  // قائمة السجناء المختارين
  const [selectedPrisoners, setSelectedPrisoners] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // بيانات السجناء المختارين
  const selectedData = prisoners.filter((p) =>
    selectedPrisoners.includes(p.id)
  );

  // toggle prisoner selection
  const togglePrisoner = (id) => {
    setSelectedPrisoners((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // send request
  const handleSubmit = async (formData) => {
    const payload = {
      ...formData,
      prisonerIds: selectedPrisoners,
    };
    console.log("Form Data:", payload);
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

  return (
    <>
      {/* search */}
      <div className="md:flex justify-between items-center border-gray-200 rounded-2xl p-7 shadow-sm my-5">
        <div className="md:flex items-center justify-center gap-5 text-center">
          <input
            type="text"
            placeholder="رقم الهوية"
            className="border border-gray-200 p-3 rounded-2xl outline-0 mb-5 md:mb-0"
          />
          <button className="px-15 py-3 text-main border border-main rounded-2xl cursor-pointer hover:bg-main hover:text-white transition-colors transition-duration-300 mb-5 md:mb-0">
            بحث
          </button>
        </div>

        <div
          className="flex justify-center items-center gap-2 cursor-pointer border border-gray-200 rounded-2xl p-3 text-main hover:bg-main hover:text-white transition-colors transition-duration-300"
          onClick={() => setOpenDialog(true)}
        >
          <TbListSearch className="text-2xl" />
          <p>اختر من قائمة النزلاء</p>
        </div>
      </div>

      {/* عرض السجين/السجناء */}
      {selectedPrisoners.length === 1 && (
        <Prisoner_Info_Card data={selectedData[0]} />
      )}

      {selectedPrisoners.length > 1 && (
        <div className="border border-gray-200 rounded-2xl p-4 shadow-md my-4">
          <h3 className="mb-4 text-lg">السجناء المختارين</h3>
          <table className="min-w-full divide-y-2 divide-gray-200 border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr className="*:text-gray-700 divide-x divide-gray-200">
                <th className="px-3 py-2 whitespace-nowrap">رقم الهوية</th>
                <th className="px-3 py-2 whitespace-nowrap">اسم السجين</th>
                <th className="px-3 py-2 whitespace-nowrap">حذف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {selectedData.map((p) => (
                <tr
                  key={p.id}
                  className="*:text-gray-900 *:first:font-medium divide-x divide-gray-200 text-center"
                >
                  <td className="px-3 py-2 whitespace-nowrap">{p.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{p.fullName}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <button
                      className="text-red-400 hover:text-red-500 text-2xl cursor-pointer"
                      onClick={() => togglePrisoner(p.id)}
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* بيانات العفو */}
      {selectedPrisoners.length !== 0 && (
        <div className="border border-gray-200 rounded-2xl p-5 shadow-md my-5">
          <h3 className="mb-8 text-xl">بيانات العفو</h3>
          <SmartForm config={formConfig} onSubmit={handleSubmit} />
        </div>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className="relative z-50"
      >
        {/* overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Table Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-auto min-w-[80%] max-h-[90vh] overflow-hidden p-8">
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
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.fullName}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.cases[0].caseType}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.nationality}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.religion}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.gender}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.birthDate}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <button
                            className={`p-2 text-xl cursor-pointer ${
                              selectedPrisoners.includes(item.id)
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                            onClick={() => togglePrisoner(item.id)}
                          >
                            {selectedPrisoners.includes(item.id) ? (
                              <RiDeleteBin6Fill />
                            ) : (
                              <MdAddCircleOutline />
                            )}
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
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Pardoning;
