"use client";

import React from "react";
import { useRouter } from "next/navigation";

import GenericTable from "@/components/general/table/GenericTable";
import { mockData } from "../List/mockData";

import { HiMiniEye } from "react-icons/hi2";

function AllPrisoners() {
  // Navigate
  const router = useRouter();

  const goToPage = (id) => {
    router.push(`/Prisoners/${id}`);
  };

  const columns = [
    { key: "name", label: "اسم النزيل" },
    { key: "nationalId", label: "رقم الهوية" },
    { key: "nationality", label: "الجنسية" },
    { key: "caseName", label: "القضية" },
    { key: "accoumdationName", label: "الجناح" },
    { key: "prisonEntryDate", label: "ت.الدخول" },
    { key: "prisonerStatusName", label: "حالة النزيل" },
    { key: "prisonerTypeName", label: "وضع النزيل" },
    {
      key: "actions",
      label: "#",
      render: (r: any) => (
        <div className="flex justify-center items-center gap-3">
          <button
            className="text-main bg-second rounded-lg text-lg px-5 py-2 cursor-pointer hover:text-white hover:bg-main transition"
            onClick={() => goToPage(r.nationalId)}
          >
            <HiMiniEye />
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
        queryKey="AllPrisoners"
      />
    </>
  );
}

export default AllPrisoners;
