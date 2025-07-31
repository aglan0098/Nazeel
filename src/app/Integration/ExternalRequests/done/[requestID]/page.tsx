import React from "react";
import Prisoner_Info_Card from "@/components/ui/Prisoner_Info_Card";
import Request_Info_Card from "@/components/ui/Request_Info_Card";

function page() {
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

      <div className="rounded-xl p-4 border border-gray-300">
        <h2 className="my-4">تفاصيل الطلب</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">رقم أمر الأفراج:</p>
            <span className="cursor-pointer">32375</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">سبب الإفراج:</p>
            <span className="cursor-pointer">السبب</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">سبب الإفراج الفرعي:</p>
            <span className="cursor-pointer">السبب الفرعي</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">تصنيف سبب إ. الفرعي:</p>
            <span className="cursor-pointer">السبب</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">مرفق الامر:</p>
            <span className="cursor-pointer">
              <p className="text-main underline">عرض الملف</p>
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">تاريخ الأمر:</p>
            <span className="cursor-pointer">10/5/2024</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">تاريخ إطلاق السراح:</p>
            <span className="cursor-pointer">20/6/2024</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">تسليم السجين لجهه إخري:</p>
            <span className="cursor-pointer">نعم</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-500">إسم الجهه المستلمة:</p>
            <span className="text-xl cursor-pointer">اسم الجهة</span>
          </div>
        </div>
      </div>

      <Prisoner_Info_Card
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
      />
    </>
  );
}

export default page;
