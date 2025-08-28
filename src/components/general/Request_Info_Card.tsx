import React from "react";

function Request_Info_Card({ type, number, date, area, prison, status }) {
  return (
    <div className="md:flex gap-5 items-center justify-between my-5 border border-gray-300 py-5 px-10 rounded-xl">
      <div className="md:flex gap-4">
        <img src="/images/icons/request_icon.png" className="mb-4 md:mb-0" />
        <div className="mb-4 md:mb-0">
          <p className="text-gray-400 mb-2">نوع الطلب</p>
          <p>{type}</p>
        </div>
      </div>

      <div className="mb-4 md:mb-0">
        <p className="text-gray-400 mb-2">رقم الطلب</p>
        <p>{number}</p>
      </div>

      <div className="mb-4 md:mb-0">
        <p className="text-gray-400 mb-2">تاريخ الإرسال</p>
        <p>{date}</p>
      </div>

      <div className="mb-4 md:mb-0">
        <p className="text-gray-400 mb-2">المنطقة</p>
        <p>{area}</p>
      </div>

      <div className="mb-4 md:mb-0">
        <p className="text-gray-400 mb-2">اسم السجن</p>
        <p>{prison}</p>
      </div>
      {status === "done" ? (
        <p className="text-green-500 text-green-500s px-8 py-4 rounded-4xl bg-green-200 text-center cursor-pointer">
          تم قبول طلبك
        </p>
      ) : (
        <p className="text-main px-8 py-4 rounded-4xl bg-[#E8AF1138] text-center cursor-pointer">
          قيد المراجعة
        </p>
      )}
    </div>
  );
}

export default Request_Info_Card;
