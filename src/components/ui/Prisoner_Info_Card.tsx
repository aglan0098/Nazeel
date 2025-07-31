import React from "react";

function Prisoner_Info_Card({
  caseName,
  stopDate,
  wingRoom,
  status,
  name,
  identityNumber,
  prisonnumber,
  birthDate,
  tamem,
  gender,
}) {
  return (
    <div className="bg-[#F5F5F5] border border-[#F0E8CC] p-7 rounded-xl my-5">
      <h2 className="text-xl mb-4">البيانات الشخصية</h2>

      <div className="md:flex gap-3 items-center justify-between py-4 px-10 bg-white rounded-lg">
        <div className="flex gap-3 mb-3 md:mb-0">
          <p className="text-gray-500 text-lg">نوع القضية: </p>
          <p className="text-lg">{caseName}</p>
        </div>
        <div className="flex gap-3 mb-3 md:mb-0">
          <p className="text-gray-500 text-lg">تاريخ التوقف:</p>
          <p className="text-lg">{stopDate}</p>
        </div>
        <div className="flex gap-3 mb-3 md:mb-0">
          <p className="text-gray-500 text-lg">الجناح - الغرفة:</p>
          <p className="text-lg">{wingRoom}</p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-500 text-lg">الحالة: </p>
          <p className="text-lg">{status}</p>
        </div>
      </div>

      <div className="md:flex items-center justify-between py-4 px-10">
        {/* image */}
        <div className="rounded-2xl mb-4 md:mb-0 flex items-center justify-center md:justify-start w-full md:w-1/4">
          <img src="/images/prison.png" alt="" />
        </div>

        {/* info */}
        <div className="info flex justify-around w-full gap-5">
          <div>
            <div className="mb-5">
              <p className="text-gray-500 mb-2">الأسم بالعربية</p>
              <p className="text-lg">{name}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">تاريخ الميلاد</p>
              <p>{birthDate}</p>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <p className="text-gray-500 mb-2">رقم الهوية</p>
              <p className="text-lg">{identityNumber}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">هل يوجد تعاميم</p>
              <p>--</p>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <p className="text-gray-500 mb-2">رقم السجن</p>
              <p className="text-lg">{prisonnumber}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">الجنس</p>
              <p>{gender}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prisoner_Info_Card;
