"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import GenericTable from "@/components/general/table/GenericTable";
import { Dialog, DialogPanel } from "@headlessui/react";

import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mockData } from "./mockData";

// icons
import { IoIosArrowDown } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";

// ---------- Mutations ----------
function useUpdatePrison() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => api.put(`/areas/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    },
  });
}

// ---------- Actions Menu ----------
function ActionsMenu({
  row,
  isOpen,
  onToggle,
  onClose,
  onEdit,
}: {
  row: any;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onEdit: (row: any) => void;
}) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  }, [isOpen]);

  return (
    <div className="flex justify-center items-center gap-4">
      <div
        ref={buttonRef}
        className="relative py-3 px-5 rounded-2xl bg-gray-100 cursor-pointer hover:bg-second transition flex items-center gap-2"
        onClick={onToggle}
      >
        اتخاذ اجراء
        <IoIosArrowDown />
      </div>

      {isOpen &&
        position &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
            className="bg-white border rounded-xl shadow-xl p-7"
          >
            <button
              className="py-2 px-4 bg-yellow-600 text-white rounded-xl cursor-pointer flex items-center gap-2"
              onClick={() => {
                onEdit(row);
                onClose();
              }}
            >
              تعديل <FaEdit />
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

// ---------- Page ----------
export default function Cities() {
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const [formDialog, setFormDialog] = useState<null | {
    type: "create" | "edit";
    data?: any;
  }>(null);

  const updateMutation = useUpdatePrison();

  // Columns
  const columns = [
    { key: "name", label: "الأسم" },
    { key: "areaName", label: "المنطقة" },
    {
      key: "actions",
      label: "#",
      render: (r: any) => {
        const id = r.id ?? r._id;
        return (
          <ActionsMenu
            row={r}
            isOpen={openMenuId === id}
            onToggle={() => setOpenMenuId((prev) => (prev === id ? null : id))}
            onClose={() => setOpenMenuId(null)}
            onEdit={(row) => setFormDialog({ type: "edit", data: row })}
          />
        );
      },
    },
  ];

  // ---------- Handlers ----------
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    if (formDialog?.type === "edit" && formDialog.data) {
      updateMutation.mutate(
        { id: formDialog.data.id, ...payload },
        { onSuccess: () => setFormDialog(null) }
      );
    }
  }

  // ---------- Render ----------
  return (
    <>
      <GenericTable
        mockData={mockData}
        columns={columns}
        queryKey="Cities"
        showCreateButton={false}
      />

      {/* Create/Edit Dialog */}
      <Dialog
        open={!!formDialog}
        onClose={() => setFormDialog(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-auto min-w-[400px] max-h-[90%] overflow-scroll scrollbar-hide relative">
            <div className="flex justify-between items-center border-b p-5 mb-5 bg-second">
              <h2 className="text-lg font-semibold">
                {formDialog?.type === "edit" ? "تعديل المنطقة" : "إضافة منطقة "}
              </h2>

              <CgCloseO
                className="cursor-pointer text-2xl"
                onClick={() => setFormDialog(null)}
              />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-7">
              <div className="md:flex gap-5 md:mb-3">
                <div className="my-5">
                  <label className="block mb-2" htmlFor="">
                    الأسم
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="name"
                    defaultValue={formDialog?.data?.name || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="my-5">
                  <label className="block mb-2" htmlFor="">
                    المنطقة
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="areaName"
                    defaultValue={formDialog?.data?.areaName || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-5 p-5 sticky bottom-0 bg-white border-t">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-main text-white cursor-pointer"
                >
                  {formDialog?.type === "edit" ? "تحديث" : "إضافة"}
                </button>
                <button
                  type="button"
                  onClick={() => setFormDialog(null)}
                  className="px-4 py-2 rounded bg-gray-400 text-white cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
