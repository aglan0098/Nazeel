import React from "react";

function Prison_Info_Card() {
  return (
    <div className="bg-[#F5F5F5] border border-[#F0E8CC] p-3 rounded-xl my-4">
      <h2 className="text-xl mb-4">البيانات الشخصية</h2>

      <div className="flex gap-5 items-center justify-around p-4 bg-white rounded-lg">
        <div className="flex gap-3">
          <p className="text-gray-500 text-lg">نوع القضية: </p>
          <p className="text-xl">اسم القضية</p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-500 text-lg">تاريخ التوقف:</p>
          <p className="text-xl">01/01/1997 </p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-500 text-lg">الجناح - الغرفة:</p>
          <p className="text-xl">ج - 102</p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-500 text-lg">الحالة: </p>
          <p className="text-xl">داخل السجن - موقوف</p>
        </div>
      </div>

      <div className="info">
        <div >

        </div>
      </div>
    </div>
  );
}

export default Prison_Info_Card;
