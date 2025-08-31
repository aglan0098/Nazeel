"use client";

import { ChangeEvent } from "react";
import { Upload, Calendar, ChevronDown, FileText } from "lucide-react";

interface JudgmentInfoCardProps {
  judgmentNumber?: string;
  court?: string;
  judgmentDate?: string;
  judgmentType?: string;
  isReadOnly?: boolean;
}

const JudgmentInfoCard: React.FC<JudgmentInfoCardProps> = ({
  judgmentNumber,
  court,
  judgmentDate,
  judgmentType,
  isReadOnly = false,
}) => {
  return (
    <div className="rounded-xl border border-[#F3EDE3] bg-white shadow-sm p-4">
      {/* العنوان */}
      <div className="flex justify-between items-center border-b border-gray-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">بيانات الحكم</h2>
      </div>

      {/* الحقول */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 text-right">
        {/* رقم الحكم */}
        <div>
          <label className="text-sm text-gray-700 font-medium block mb-1">
            رقم الحكم <span className="text-red-600">*</span>
          </label>
          {isReadOnly ? (
            <p className="p-2 rounded-md text-md text-gray-700">
              {judgmentNumber || "لايوجد"}
            </p>
          ) : (
            <input
              type="text"
              value={judgmentNumber || ""}
              onChange={() => {}}
              className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 focus:outline-none"
            />
          )}
        </div>

        {/* المحكمة */}
        <div>
          <label className="text-sm text-gray-700 font-medium block mb-1">
            المحكمة <span className="text-red-600">*</span>
          </label>
          {isReadOnly ? (
            <p className="p-2 rounded-md text-sm text-gray-700">
              {court || "لايوجد"}
            </p>
          ) : (
            <div className="relative">
              <select
                value={court || ""}
                onChange={() => {}}
                className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100"
              >
                <option value="">يرجى الاختيار</option>
                <option>المحكمة العامة بدومة الجندل</option>
                <option>المحكمة العامة بالعريجاء</option>
                <option>المحكمة العامة بسمراء</option>
                <option>المحكمة العامة بالإبداع</option>
                <option>دوائر التنفيذ والأحوال الشخصية</option>
                <option>المحكمة الجزائية بعريع</option>
                <option>مجمع المحاكم الشرعية بالقطيف</option>
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>

        {/* التاريخ */}
        <div>
          <label className="text-sm text-gray-700 font-medium block mb-1">
            تاريخ الحكم <span className="text-red-600">*</span>
          </label>
          {isReadOnly ? (
            <p className="p-2 rounded-md text-sm text-gray-700">
              {judgmentDate || "لايوجد"}
            </p>
          ) : (
            <div className="flex items-center">
              <input
                type="text"
                value={judgmentDate || ""}
                onChange={() => {}}
                className="w-full rounded-r-md border-t border-b border-r border-gray-300 bg-gray-100 p-2 focus:outline-none"
              />
              <div className="bg-gray-100 border border-gray-300 px-2 py-2 rounded-l-md">
                <Calendar className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* نوع الحكم */}
        <div>
          <label className="text-sm text-gray-700 font-medium block mb-1">
            نوع الحكم <span className="text-red-600">*</span>
          </label>
          {isReadOnly ? (
            <p className="p-2 rounded-md text-sm text-gray-700">
              {judgmentType || "لايوجد"}
            </p>
          ) : (
            <div className="relative">
              <select
                value={judgmentType === "محكوم حكم نهائي" ? "final" : "initial"}
                onChange={() => {}}
                className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100"
              >
                <option value="initial">حكم ابتدائي</option>
                <option value="final">حكم نهائي</option>
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {/* مرفق الحكم */}
      <div className="px-6 pb-6">
        <label className="text-sm text-gray-700 font-medium block mb-2">
          مرفق الحكم <span className="text-red-600">*</span>
        </label>
        {isReadOnly ? (
          <div className="p-6 rounded-md">
            <div className="flex justify-start">
              <div className="bg-white transition-shadow duration-200 rounded-xl p-5 w-full text-center">
                <div className="flex justify-center mb-3">
                  <FileText className="w-12 h-12 text-amber-800" />
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-snug truncate">
                  مشروع تطوير نظام السجون الحالي - نسخة أخيرة.pdf
                </p>
                <p className="text-xs text-gray-500 mt-1">7 يوليو 2025</p>
                <a
                  href="/tst.pdf"
                  target="_blank"
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-amber-800 bg-amber-50 rounded-md hover:bg-amber-100 transition-colors duration-200"
                >
                  عرض الملف
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-400 bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center text-center text-gray-500">
            <Upload className="w-6 h-6 text-blue-400 mb-2" />
            <p>تصفح واختر الملفات التي تريد تحميلها من الكمبيوتر الخاص بك</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JudgmentInfoCard;