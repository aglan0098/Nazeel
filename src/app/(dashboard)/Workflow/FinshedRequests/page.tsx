"use client";

import React from "react";
import GenericTable from "@/components/general/table/GenericTable";
import { mockData } from "./mockData";

function FinshedRequests() {
  const columns = [
    { key: "requestNumber", label: "رقم الطلب" },
    { key: "requestNumber", label: "نوع الطلب" },
    { key: "prisonerName", label: "اسم النزيل" },
    { key: "requestDate", label: "تاريخ الإرسال" },
    { key: "requestStatus", label: "حالة الطلب" },
    { key: "nationalId", label: "رقم الهوية" },
    {
      key: "actions",
      label: "#",
      render: (r: any) => (
        <div className="flex justify-center items-center gap-3">
          <button className="text-main bg-second rounded-lg text-lg px-5 py-2 cursor-pointer hover:text-white hover:bg-main transition">
            طباعة
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <GenericTable
        mockData={mockData}
        columns={columns}
        queryKey="FinshedRequests"
      />
    </>
  );
}

export default FinshedRequests;
