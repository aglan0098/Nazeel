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
import { FaTrash } from "react-icons/fa6";
import { CgCloseO } from "react-icons/cg";

// ---------- Mutations ----------
function useCreateUnits() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/units", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

function useUpdateUnits() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => api.put(`/units/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}

function useDeleteUnits() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => api.delete(`/units/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
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
  onDelete,
}: {
  row: any;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onEdit: (row: any) => void;
  onDelete: (id: string | number) => void;
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
            className="flex justify-between items-center gap-3 bg-white border rounded-xl shadow-xl p-7"
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
            <button
              className="py-2 px-4 bg-red-500 text-white rounded-xl cursor-pointer flex items-center gap-2"
              onClick={() => {
                onDelete(row.id ?? row._id);
                onClose();
              }}
            >
              حذف <FaTrash />
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

// ---------- Page ----------
export default function Units() {
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const [formDialog, setFormDialog] = useState<null | {
    type: "create" | "edit";
    data?: any;
  }>(null);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const createMutation = useCreateUnits();
  const updateMutation = useUpdateUnits();
  const deleteMutation = useDeleteUnits();

  // Columns
  const columns = [
    { key: "name", label: "الوحدة" },
    { key: "complexName", label: "المجمع" },
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
            onDelete={(id) => setDeleteId(id)}
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

    if (formDialog?.type === "create") {
      createMutation.mutate(payload, { onSuccess: () => setFormDialog(null) });
    } else if (formDialog?.type === "edit" && formDialog.data) {
      updateMutation.mutate(
        { id: formDialog.data.id, ...payload },
        { onSuccess: () => setFormDialog(null) }
      );
    }
  }

  function confirmDelete() {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
  }

  // ---------- Render ----------
  return (
    <>
      <GenericTable
        mockData={mockData}
        columns={columns}
        queryKey="Units"
        showCreateButton={true}
        onCreate={() => {
          setFormDialog({ type: "create" });
          setOpenMenuId(null);
        }}
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
                {formDialog?.type === "edit" ? "تعديل مجمع" : "إضافة مجمع"}
              </h2>

              <CgCloseO
                className="cursor-pointer text-2xl"
                onClick={() => setFormDialog(null)}
              />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-7">
              <div className="md:flex gap-5 md:mb-3">
                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    اسم الوحدة
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="name"
                    defaultValue={formDialog?.data?.name || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    المجمع
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="complexName"
                    defaultValue={formDialog?.data?.complexName || ""}
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

      {/* Delete Dialog */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg shadow-xl w-auto p-7 min-w-[400px]">
            <p className="mb-5 text-lg text-center">هل أنت متأكد من الحذف؟</p>
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white cursor-pointer"
              >
                متأكد
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded bg-gray-500 text-white cursor-pointer"
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
