"use client";

import React, { useState } from "react";

import GenericTable from "@/components/general/table/GenericTable";
import { Dialog, DialogPanel } from "@headlessui/react";

import { useQuery } from "@tanstack/react-query";

import { mockRequestsResponse } from "./mockRequests";
import { mockData } from "./mockData";

function Requests() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const columns = [
    { key: "requestNumber", label: "رقم الطلب" },
    { key: "prisonerName", label: "اسم السجين" },
    { key: "requestDate", label: "تاريخ الطلب" },
    { key: "requestStatus", label: "حالة الطلب" },
    { key: "nationalId", label: "الهوية" },
    {
      key: "actions",
      label: "إجراءات",
      render: (r: any) => (
        <div className="flex justify-center items-center gap-3">
          <button className="text-main bg-second rounded-lg text-lg px-5 py-2 cursor-pointer hover:text-white hover:bg-main transition">
            طباعة
          </button>
          <button
            className="text-main bg-second rounded-lg text-lg px-5 py-2 cursor-pointer hover:text-white hover:bg-main transition"
            onClick={() => setSelectedId(r.id)} // pass id to dialog
          >
            سير الاجراء
          </button>
        </div>
      ),
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["request-details", selectedId],
    queryFn: async () => {
      //for mock data
      await new Promise((r) => setTimeout(r, 500));
      return mockData;

      // const res = await api.get(`/requests/${selectedId}`);
      // return res.data;
    },
    enabled: !!selectedId, // run only if id exists
  });

  return (
    <>
      <GenericTable
        mockData={mockRequestsResponse}
        columns={columns}
        queryKey="requests"
      />

      {/* أو باك اند */}

      {/* <GenericTable
        columns={columns}
        queryKey="requests"
        queryFn={(params) => myAxiosFetchFn("/requests", params)}
      /> */}

      {/* ========== Dialog ============ */}
      <Dialog
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
        className="relative z-50"
      >
        {/* overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-auto max-h-[90vh] overflow-hidden p-7 min-w-[500px]">
            {isLoading ? (
              <p className="text-center text-lg text-main">جار التحميل...</p>
            ) : error ? (
              <p className="text-center text-red-500">فشل تحميل البيانات</p>
            ) : data ? (
              <>
                <p className="text-center text-xl text-white mb-7 bg-main py-2 rounded-xl">
                  سير الإجراء
                </p>
                <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                  {data.object.map((step, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-4 shadow-sm bg-gray-50"
                    >
                      <h3 className="font-bold text-main mb-3">
                        {step.stepName}
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {step.users.map((user, i) => (
                          <li key={i}>{user}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            <div className="flex items-center gap-7 mt-8 justify-center">
              <button
                className="bg-gray-200 px-20 py-2 rounded-xl cursor-pointer"
                onClick={() => setSelectedId(null)}
              >
                إلغاء
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Requests;
