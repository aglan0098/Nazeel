"use client";

import React, { useState } from "react";
import Prisoner_Info_Card from "@/components/general/Prisoner_Info_Card";
import { Dialog, DialogPanel } from "@headlessui/react";
// icons
import { IoCaretDownSharp } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";

function Create() {
  // check prison has solitary or not
  const [solitary, setSolitary] = useState(false);

  const handelSolitary = (e) => {
    setSolitary(e.target.value === "true");
  };

  // handle confirmation dialog logic
  const [openAskDialog, setOpenAskDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  return (
    <>
      <div className="my-10">
        <label htmlFor="" className="mb-2 block">
          رقم الهوية
          <span className="text-red-500 mr-2">*</span>
        </label>
        <div className="flex gap-5">
          <input
            type="text"
            name="releaseOrderNumber"
            className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-3"
          />

          <button className="text-main bg-[#F4F4F0] border border-main px-10 py-2 rounded-2xl cursor-pointer">
            إضافة إستلام
          </button>
        </div>
      </div>

      {/* <div className="shadow-md border border-gray-100 p-15 text-center">
        <p>قم بإدخال رقم هوية السجين المراد إستلامة</p>
      </div> */}

      {/* Prison Info */}
      {/* <Prisoner_Info_Card
        caseName={"اسم القضية"}
        stopDate={"01/01/1997"}
        wingRoom={"ج - 102"}
        status={"داخل السجن - موقوف"}
        name={"محمد"}
        identityNumber={6767843}
        prisonnumber={7690}
        birthDate={"1 / 1 / 2001"}
        tamem={false}
        gender={"ذكر"}
      /> */}

      {/* رقم السجين */}
      <div className="shadow-md rounded-2xl my-5">
        <h2 className="text-xl border-b-2 border-gray-200 p-4">
          النهاية الطرفية
        </h2>
        <div className="p-7">
          <label htmlFor="" className="mb-2 block">
            الرقم العشري
            <span className="text-red-500 mr-2">*</span>
          </label>
          <input
            type="text"
            name="releaseOrderNumber"
            className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4"
          />
        </div>
      </div>

      {/* بيانات التوقيف */}
      <div className="shadow-md rounded-2xl my-5">
        <h2 className="text-xl border-b-2 border-gray-200 p-4">
          بيانات التوقيف
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full my-7 px-7">
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              رقم التوقيف
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="text"
              name="releaseOrderNumber"
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              تاريخ دخول السجن
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="date"
              name="orderDate"
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              تاريخ التوقيف
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="date"
              name="orderDate"
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              مدة التوقيف بالإيام
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="text"
              name=""
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              تاريخ نهاية أمر التوقيف
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="date"
              name=""
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              سبب التوقيف
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name="releaseReason"
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">اختر..</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              جهة إصدار أمر التوقيف
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name="releaseReason"
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">اختر..</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              جهة التوقف القادم منها السجين
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name="releaseReason"
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">اختر..</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              الدائرة المختصة بالنظر في القضية
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name="releaseReason"
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">اختر..</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              إمكانية الإتصال
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name="releaseReason"
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">نعم</option>
                <option value="option1">لا</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              إمكانية الزيارة
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name="releaseReason"
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">مسموح</option>
                <option value="option1">غير مسموح</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
        </div>

        <div className="px-7 pb-7 md:grid grid-cols-3 lg:grid-cols-4">
          <div className="mb-5 md:mb-0">
            <label htmlFor="" className="mb-2 block">
              هل يحجز انفراديا بأمر النيابة؟
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="flex items-center text-xl gap-5">
              <input
                type="radio"
                name="solo"
                className="w-5 h-5 accent-main"
                value="true"
                onChange={handelSolitary}
              />
              <label htmlFor="">نعم</label>
              <input
                type="radio"
                name="solo"
                className="w-5 h-5 accent-main"
                value="false"
                onChange={handelSolitary}
              />
              <label htmlFor="">لا</label>
            </div>
          </div>

          {solitary && (
            <div>
              <label htmlFor="" className="mb-2 block">
                أيام الحبس الإنفرادي
                <span className="text-red-500 mr-2">*</span>
              </label>
              <input
                type="text"
                name=""
                className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-3"
              />
            </div>
          )}
        </div>
      </div>

      {/* بيانات أمر الإحالة */}
      <div className="shadow-md rounded-2xl my-5">
        <h2 className="text-xl border-b-2 border-gray-200 p-4">
          بيانات أمر الإحالة
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full my-7 px-7">
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              رقم الإحالة
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="text"
              name="releaseOrderNumber"
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              تاريخ الإحالة من الجهة
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="date"
              name="releaseOrderNumber"
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              تاريخ القبض
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="date"
              name="releaseOrderNumber"
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              المنطقة
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name=""
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">اختر..</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
        </div>

        <div className="px-7 pb-7">
          <label htmlFor="" className="mb-2 block">
            مذكرة التوقيف - الامر المستند عليه بإيقاف السجين
            <span className="text-red-500 mr-2">*</span>
          </label>
          <input
            type="file"
            name="file"
            className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full cursor-pointer h-30"
            placeholder="تصفح واختر الملفات التي تريد تحملها من الكمبيوتر الخاص بك"
          />
        </div>
      </div>

      {/* بيانات القضية */}
      <div className="shadow-md rounded-2xl my-5">
        <h2 className="text-xl border-b-2 border-gray-200 p-4">
          بيانات القضية
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full my-7 px-7">
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              رقم القضية
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="text"
              name="releaseOrderNumber"
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              مسمي القضية الأساسي
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name=""
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">اختر..</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              تصنيف القضية
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name=""
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">اختر..</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              مكان القضية
              <span className="text-red-500 mr-2">*</span>
            </label>
            <div className="relative">
              <select
                name=""
                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
              >
                <option value="">اختر..</option>
                <option value="option1">Option One</option>
                <option value="option2">Option Two</option>
                <option value="option3">Option Three</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                <IoCaretDownSharp />
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              تاريخ القضية
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="date"
              name=""
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              عدد المتهمين بالقضية
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="text"
              name=""
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              عدد المحكوم عليهم
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="text"
              name=""
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              عدد المحالين لمحكمة الأحداث
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="text"
              name=""
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
          <div className="mb-5 md:mb-2">
            <label htmlFor="" className="mb-2 block">
              عدد المؤجل الحكم عليهم
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="text"
              name=""
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
            />
          </div>
        </div>

        <div className="px-7 pb-7">
          <label htmlFor="" className="mb-2 block">
            الوصف الجرمي للقضية
            <span className="text-red-500 mr-2">*</span>
          </label>
          <textarea
            name=""
            id=""
            className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full cursor-pointer h-30"
          />
        </div>

        <div className="px-7 pb-7">
          <label htmlFor="" className="mb-2 block">
            ارفاق ملف القضية
            <span className="text-red-500 mr-2">*</span>
          </label>
          <input
            type="file"
            name="file"
            className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full cursor-pointer h-30"
            placeholder="تصفح واختر الملفات التي تريد تحملها من الكمبيوتر الخاص بك"
          />
        </div>
      </div>

      {/* ملاحظات إضافية */}
      <div className="shadow-md p-10 rounded-2xl my-5">
        <h2 className="mb-8 text-xl">
          ملاحظات عامة <span className="text-gray-400">(اختياري)</span>
        </h2>
        <textarea
          name=""
          id=""
          placeholder="الوصف"
          className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full cursor-pointer h-30"
        />
      </div>

      {/* الاستلام */}
      <div className="flex gap-5 justify-end items-center">
        <button
          className="py-3 px-15 rounded-xl cursor-pointer bg-main text-white"
          onClick={() => setOpenAskDialog(true)}
        >
          استلام
        </button>
        <button className="py-3 px-15 rounded-xl cursor-pointer bg-gray-300">
          إلغاء
        </button>
      </div>

      {/* Ask Dialog */}
      <Dialog
        open={openAskDialog}
        onClose={() => setOpenAskDialog(false)}
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
            <BsExclamationCircle className="text-main text-5xl m-auto" />
            <p className="text-center text-xl my-5">لإتمام عملية الإستلام</p>

            <div className="bg-[#F5F5F5] border border-[#F0E8CC] p-5 rounded-xl my-5">
              <label htmlFor="" className="mb-5 text-lg block">
                هل تحتاج موافقة شئون السجناء؟
                <span className="text-red-500 mr-2">*</span>
              </label>
              <div className="flex items-center text-xl gap-5">
                <input
                  type="radio"
                  name=""
                  className="w-5 h-5 accent-main"
                  value="true"
                />
                <label htmlFor="">نعم</label>
                <input
                  type="radio"
                  name=""
                  className="w-5 h-5 accent-main"
                  value="false"
                />
                <label htmlFor="">لا</label>
              </div>
            </div>

            <div className="flex items-center gap-7 m-auto w-[50%] justify-center">
              <button
                className="bg-main text-white px-20 py-2 rounded-xl cursor-pointer"
                onClick={() => {
                  setOpenAskDialog(false);
                  setOpenConfirmDialog(true);
                }}
              >
                إستلام
              </button>
              <button
                className="bg-gray-200 px-20 py-2 rounded-xl cursor-pointer"
                onClick={() => setOpenAskDialog(false)}
              >
                إالغاء
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        className="relative z-50"
      >
        {/* overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* content */}
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-[80%] md:w-[30%] max-h-[90vh] overflow-hidden">
            <FaRegCircleCheck className="text-green-600 text-5xl m-auto my-5" />

            <p className="my-7 text-xl text-center">تم إنشاء الطلب</p>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Create;
