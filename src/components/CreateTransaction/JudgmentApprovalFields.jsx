import React from "react";
import { Plus } from "lucide-react";

export default function JudgmentApprovalFields({ penalty, onChange }) {
  const extras = penalty?.extras || {};

  return (
    <div className="bg-white border border-gray-50 rounded-xl shadow-sm p-4 space-y-6" dir="rtl">
      {/* العنوان */}
      <div className="flex justify-between items-center border-b border-gray-50 pb-2">
        <h2 className="text-lg font-semibold text-gray-800">تأييد الحكم</h2>
        {/* لو احتجت زر إضافة مستقبلاً */}
        {/* <button className="flex items-center gap-1 bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 rounded-full text-sm shadow transition">
          <Plus className="w-4 h-4" />
          إضافة
        </button> */}
      </div>

      {/* الحقول */}
      <div className="grid grid-cols-12 gap-4 items-end">
        {/* رقم التأييد */}
        <div className="col-span-12 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            رقم التأييد <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
            value={extras.approvalNumber || ""}
            onChange={(e) => onChange("approvalNumber", e.target.value)}
          />
        </div>

        {/* تاريخ التأييد */}
        <div className="col-span-12 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
        تاريخ التأييد <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
            value={extras.approvalDate || ""}
            onChange={(e) => onChange("approvalDate", e.target.value)}
          />
        </div>

        {/* جهة التأييد */}
        <div className="col-span-12 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            جهة التأييد <span className="text-red-600">*</span>
          </label>
                        <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"
                      value={extras.approvalEntity || ""}
            onChange={(e) => onChange("approvalEntity", e.target.value)}
          >
            <option value="">يرجى الاختيار</option>
            <option value="وزارة العدل">وزارة العدل</option>
            <option value="محكمة الاستئناف">محكمة الاستئناف</option>
            <option value="المحكمة العليا">المحكمة العليا</option>
          </select>
        </div>

        {/* استثناء العفو */}
        <div className="col-span-12 md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
         استثناء العفو <span className="text-red-600">*</span>
          </label>
                       <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"
                     value={extras.amnestyException || ""}
            onChange={(e) => onChange("amnestyException", e.target.value)}
          >
            <option value="" disabled>اختر</option>
            <option value="1">ربع المدة</option>
            <option value="2">العفو الملكي</option>
            <option value="3">عفوا القرأن</option>
          </select>
        </div>
      </div>
    </div>
  );
}
