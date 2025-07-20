
// await new Promise(res => setTimeout(res, 20000));

import Image from "next/image";

const PersonalInfoCard = ({
  fullName,
  idNumber,
  nationality,
  gender,
  religion,
  birthDate,
  imageUrl,
}) => {
  return (
    <div className="rounded-xl border border-[#F3EDE3] bg-white shadow-sm p-4">
      <div className="border-b border-[#F3EDE3] px-4 pb-2">
        <h2 className="text-lg font-semibold text-right text-gray-800">البيانات الشخصية</h2>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 pt-4">
        <div className="mb-4 sm:mb-0 sm:ml-6">
          <div className="w-36 h-36 overflow-hidden rounded  ">
            <Image
              src={imageUrl}
              alt="صورة المستخدم"
              width={112}
              height={144}
              className="object-cover w-full h-full"
            />
          </div>
        </div>        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-right w-full">
          <div>
            <p className="text-sm text-gray-500">الاسم بالعربية</p>
            <p className="font-medium text-gray-900">{fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">رقم هوية</p>
            <p className="font-medium text-gray-900">{idNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">الجنسية</p>
            <p className="font-medium text-gray-900">{nationality}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">الجنس</p>
            <p className="font-medium text-gray-900">{gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">الديانة</p>
            <p className="font-medium text-gray-900">{religion}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تاريخ الميلاد</p>
            <p className="font-medium text-gray-900">{birthDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
