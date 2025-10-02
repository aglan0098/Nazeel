"use client";

import React, { useState } from "react";
import Prisoner_Info_Card from "@/components/general/Prisoner_Info_Card";
import Request_Info_Card from "@/components/general/Request_Info_Card";

import { Dialog, DialogPanel } from "@headlessui/react";
import { BsExclamationCircle } from "react-icons/bs";
import { prisoners } from "@/data/mockPrisoners";

function Task() {
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [edited, setEdited] = useState(false);

  return (
    <>
      <Request_Info_Card
        type={"إطلاق سراح سجين"}
        number={34583}
        date={"11/2/2025"}
        area={"الرياض"}
        prison={"الأسم"}
        status={"done"}
      />

      <Prisoner_Info_Card data={prisoners[0]} />

      <div className="flex justify-end gap-5">
        <button
          className="py-3 px-15 rounded-2xl bg-main text-white cursor-pointer"
          onClick={() => setApproved(true)}
        >
          موافقة
        </button>
        <button
          className="py-3 px-15 rounded-2xl bg-red-400 text-white cursor-pointer"
          onClick={() => setRejected(true)}
        >
          رفض
        </button>
        <button
          className="py-3 px-15 rounded-2xl bg-gray-300 cursor-pointer"
          onClick={() => setEdited(true)}
        >
          إعدة للتعديل
        </button>
      </div>

      {/* Approved Dialog */}
      <Dialog
        open={approved}
        onClose={() => setApproved(false)}
        className="relative z-50"
      >
        {/* overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-auto max-h-[90vh] overflow-hidden p-8">
            <BsExclamationCircle className="text-main text-7xl m-auto mb-5" />
            <p className="text-center text-2xl">
              هل أنت متأكد من أنك تريد الموافقة علي هذا الطلب؟
            </p>
            <p className="text-center text-xl text-gray-400 my-7">
              في حالة الضغط علي "موافق" سيتم الموافقة علي هذا الطلب وتنفيذه
            </p>
            <div className="flex items-center gap-7 m-auto w-[50%] justify-center">
              <button className="bg-main text-white px-20 py-2 rounded-xl cursor-pointer">
                موافق
              </button>
              <button
                className="bg-gray-200 px-20 py-2 rounded-xl cursor-pointer"
                onClick={() => setApproved(false)}
              >
                إالغاء
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Rejected Dialog */}
      <Dialog
        open={rejected}
        onClose={() => setRejected(false)}
        className="relative z-50"
      >
        {/* overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-auto max-h-[90vh] overflow-hidden p-8">
            <p className="text-xl">رفض الطلب</p>
            <p className="text-lg text-gray-400 my-4">
              رفض الطلب يعني عدم قبولة ويجب ذكر الأسباب لاتخاذ الأسباب في عين
              الأعتبار
            </p>
            <textarea
              className="bg-gray-100 border border-gray-200 rounded-xl p-4 w-full h-55 mb-4 outline-0"
              placeholder="أسباب الرفض"
              name=""
              id=""
            ></textarea>
            <div className="flex items-center gap-7 m-auto w-[50%] justify-center">
              <button className="bg-red-400 text-white px-20 py-2 rounded-xl cursor-pointer">
                رفض
              </button>
              <button
                className="bg-gray-200 px-20 py-2 rounded-xl cursor-pointer"
                onClick={() => setRejected(false)}
              >
                إالغاء
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={edited}
        onClose={() => setEdited(false)}
        className="relative z-50"
      >
        {/* overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-auto max-h-[90vh] overflow-hidden p-8">
            <p className="text-xl">إعادة للتعديل</p>
            <p className="text-lg text-gray-400 my-4">
              إرجاع الطلب لمقدمة للتعديل يجب كتابة ملاحظات التعديل
            </p>
            <textarea
              className="bg-gray-100 border border-gray-200 rounded-xl p-4 w-full h-55 mb-4 outline-0"
              placeholder="ملاحظات التعديل"
              name=""
              id=""
            ></textarea>
            <div className="flex items-center gap-7 m-auto  justify-center">
              <button className="bg-main text-white px-20 py-2 rounded-xl cursor-pointer">
                إعادة للتعديل
              </button>
              <button
                className="bg-gray-200 px-20 py-2 rounded-xl cursor-pointer"
                onClick={() => setEdited(false)}
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

export default Task;
