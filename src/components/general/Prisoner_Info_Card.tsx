import React from "react";

type CardProps = {
  data: {
    cases?: any;
    stopDate?: string;
    wingRoom?: string;
    status?: string;
    fullName?: string;
    idNumber?: string;
    id?: string;
    birthDate?: string;
    tamem?: string;
    gender?: string;
    [key: string]: any;
  };
};

function Prisoner_Info_Card({ data }: CardProps) {
  return (
    <div className="bg-[#F5F5F5] border border-[#F0E8CC] p-7 rounded-xl my-5">
      <h2 className="text-xl mb-4">البيانات الشخصية</h2>

      <div className="md:flex gap-3 items-center justify-between py-4 px-10 bg-white rounded-lg">
        <div className="flex gap-3 mb-3 md:mb-0">
          <p className="text-gray-500 text-lg">نوع القضية: </p>
          <p className="text-lg">{data?.cases?.[0]?.caseType || "--"}</p>
        </div>
        <div className="flex gap-3 mb-3 md:mb-0">
          <p className="text-gray-500 text-lg">تاريخ التوقف:</p>
          <p className="text-lg">{data?.stopDate || "--"}</p>
        </div>
        <div className="flex gap-3 mb-3 md:mb-0">
          <p className="text-gray-500 text-lg">الجناح - الغرفة:</p>
          <p className="text-lg">{data?.wingRoom || "--"}</p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-500 text-lg">الحالة: </p>
          <p className="text-lg">{data?.status || "--"}</p>
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
              <p className="text-lg">{data?.fullName || "--"}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">تاريخ الميلاد</p>
              <p>{data?.birthDate || "--"}</p>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <p className="text-gray-500 mb-2">رقم الهوية</p>
              <p className="text-lg">{data?.idNumber || "--"}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">هل يوجد تعاميم</p>
              <p>{data?.tamem || "--"}</p>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <p className="text-gray-500 mb-2">رقم السجن</p>
              <p className="text-lg">{data?.id || "--"}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-2">الجنس</p>
              <p>{data?.gender || "--"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prisoner_Info_Card;
