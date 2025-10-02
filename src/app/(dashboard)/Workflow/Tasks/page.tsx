"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import GenericTable from "@/components/general/table/GenericTable";
import { mockData } from "./mockData";

function Tasks() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("tasks");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Navigate
  const router = useRouter();

  const goToPage = (id) => {
    router.push(`/Workflow/Tasks/${id}`);
  };

  // Columns
  const columns = [
    { key: "requestNumber", label: "رقم الطلب" },
    { key: "processName", label: "نوع الطلب" },
    { key: "prisonerName", label: "اسم النزيل" },
    { key: "requestDate", label: "تاريخ الإرسال" },
    { key: "requestStatus", label: "حالة الطلب" },
    { key: "nationalId", label: "رقم الهويه" },
    { key: "nationality", label: "الجنسية" },
    {
      key: "actions",
      label: "إجراءات",
      render: (r: any) => (
        <div className="flex justify-center items-center gap-3">
          <button
            className="text-main bg-second rounded-lg text-lg px-5 py-2 cursor-pointer hover:text-white hover:bg-main transition"
            onClick={() => goToPage(1)}
          >
            إتخاذ إجراء
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Switch */}
      {/* <div className="bg-gray-100 text-gray-500 rounded-xl my-7 mx-auto sm:mx-0 w-fit p-1 flex justify-evenly">
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
      </div> */}

      <GenericTable
        mockData={mockData}
        columns={columns}
        queryKey="tasks"
        showCreateButton={false}
      />
    </>
  );
}

export default Tasks;
