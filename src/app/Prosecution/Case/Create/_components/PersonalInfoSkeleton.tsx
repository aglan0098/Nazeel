"use client";
import { Skeleton } from "@/components/ui/skeleton";

const labels = [
  "الاسم بالعربية",
  "رقم هوية",
  "الجنسية",
  "الجنس",
  "الديانة",
  "تاريخ الميلاد",
];

const PersonalInfoSkeleton = () => {
  return (
    <div className="rounded-xl bg-white shadow-sm p-4 animate-pulse">
      <div className="border-b border-[#F3EDE3] px-4 pb-2">
        <h2 className="text-lg font-semibold text-right text-gray-800">
          البيانات الشخصية
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 pt-4">
        <div className="mb-4 sm:mb-0 sm:ml-6">
          <Skeleton className="w-36 h-36 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-right w-full">
          {labels.map((label, i) => (
            <div key={i} className="space-y-1">
              <p className="text-sm text-gray-500">{label}</p>
              <Skeleton className="h-5 w-32 bg-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSkeleton;
