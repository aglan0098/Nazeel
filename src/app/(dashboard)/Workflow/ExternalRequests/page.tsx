"use client";

import React from "react";
import GenericTable from "@/components/general/table/GenericTable";
import { mockData } from "./mockData";

function ExternalRequests() {
  const columns = [
    { key: "requestNumber", label: "رقم الطلب" },
    { key: "externalAuthorityName", label: "جهة إرسال الطلب" },
    { key: "requestTypeName", label: "نوع الطلب" },
    { key: "prisonerNationalId", label: "رقم الهوية" },
    { key: "prisonerName", label: "اسم السجين" },
    { key: "sendDate", label: "تاريخ الإرسال" },
    { key: "requestStatusName", label: "حالة الطلب" },
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
        queryKey="ExternalRequests"
      />
    </>
  );
}

export default ExternalRequests;
