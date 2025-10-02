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

import Link from "next/link";

// ---------- Mutations ----------
function useCreatePrison() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/prisons", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prisons"] });
    },
  });
}

function useUpdatePrison() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => api.put(`/prisons/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prisons"] });
    },
  });
}

function useDeletePrison() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => api.delete(`/prisons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prisons"] });
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
      <Link
        href={`/Lookups/Prisons/${row.id}`}
        className="py-3 px-5 rounded-2xl bg-main text-white cursor-pointer"
      >
        إضافة محتوي
      </Link>
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
export default function Prisons() {
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const [formDialog, setFormDialog] = useState<null | {
    type: "create" | "edit";
    data?: any;
  }>(null);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

  const createMutation = useCreatePrison();
  const updateMutation = useUpdatePrison();
  const deleteMutation = useDeletePrison();

  // Columns
  const columns = [
    { key: "name", label: "الأسم" },
    { key: "areaName", label: "المنطقه" },
    { key: "cityName", label: "المدينه" },
    { key: "neighborhoodName", label: "الحي" },
    { key: "prisonTypeName", label: "نوع السجن" },
    { key: "prisonClassificationName", label: "تصنيف السجن" },
    {
      key: "isActive",
      label: "حالة السجن",
      render: (r: any) => (
        <p
          className={`py-3 rounded-2xl text-white ${
            r.isActive ? "bg-green-500" : "bg-rose-600"
          }`}
        >
          {r.isActive ? "فعال" : "غير فعال"}
        </p>
      ),
    },
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
        queryKey="Prisons"
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
                {formDialog?.type === "edit"
                  ? "تعديل بيانات السجن"
                  : "إضافة سجن"}
              </h2>

              <CgCloseO
                className="cursor-pointer text-2xl"
                onClick={() => setFormDialog(null)}
              />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-7">
              <h2 className="text-lg font-semibold">معلومات أساسية</h2>
              <div className="md:flex gap-5 md:mb-3">
                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    الأسم
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="name"
                    defaultValue={formDialog?.data?.name || ""}
                    placeholder="الأسم"
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    رمز السجن
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="prisonCode"
                    defaultValue={formDialog?.data?.prisonCode || ""}
                    placeholder="المنطقه"
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold">معلومات السجن</h2>
              <div className="md:flex gap-5 md:mb-3">
                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    نوع السجن
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="type"
                    defaultValue={formDialog?.data?.prisonTypeName || ""}
                    placeholder="برجاء الإختيار"
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    التصنيف
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="prisonClassificationName"
                    defaultValue={
                      formDialog?.data?.prisonClassificationName || ""
                    }
                    placeholder="المنطقه"
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold">معلومات الموقع</h2>
              <div className="md:flex gap-5 md:mb-3">
                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    المنطقة
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="areaName"
                    defaultValue={formDialog?.data?.areaName || ""}
                    placeholder="برجاء الإختيار"
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    المدينة
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="cityName"
                    defaultValue={formDialog?.data?.cityName || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    الحي
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="neighborhoodName"
                    defaultValue={formDialog?.data?.neighborhoodName || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold">معلومات التواصل</h2>
              <div className="md:flex gap-5 md:mb-3">
                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    الهاتف
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="phoneNumber"
                    defaultValue={formDialog?.data?.phoneNumber || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    البريد الإلكتروني
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="email"
                    defaultValue={formDialog?.data?.email || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold">الإحصائيات</h2>
              <div className="md:flex gap-5 md:mb-3">
                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    خط الطول
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="longitude"
                    defaultValue={formDialog?.data?.longitude || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    خط العرض
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="latitude"
                    defaultValue={formDialog?.data?.latitude || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold">معلومات العنوان</h2>
              <div className="md:flex gap-5 md:mb-3">
                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    اسم الشارع
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="street"
                    defaultValue={formDialog?.data?.street || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    رقم العقار
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="buildingNumber"
                    defaultValue={formDialog?.data?.buildingNumber || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold">معلومات البريد</h2>
              <div className="md:flex gap-5 md:mb-3">
                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    صندوق البريد
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="postalBox"
                    defaultValue={formDialog?.data?.postalBox || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>

                <div className="mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="">
                    المز البريدي
                    <span className="text-red-500 mr-2">*</span>
                  </label>
                  <input
                    name="postalCode"
                    defaultValue={formDialog?.data?.postalCode || ""}
                    className="w-full border p-2 rounded outline-0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={formDialog?.data?.isActive || ""}
                  className="w-5 h-5"
                />
                <label htmlFor="">فعال</label>
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
