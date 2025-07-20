"use client";

import { useEffect, Suspense, lazy } from "react";
import { usePrisonerStore } from "@/store/usePrisonerStore";
import PrisonerSearchWrapper from "../Create/PrisonerSearchWrapper";
import CasesTableSkeleton from "./CasesTableSkeleton";
import PersonalInfoSkeleton from "./PersonalInfoSkeleton";
import { Search, OctagonX } from "lucide-react";

const PersonalInfoCard = lazy(() =>
  import("@/components/CreateTransaction/PersonalInfoCard")
);
const CasesTable = lazy(() => import("./CasesTable"));

export default function Page() {
  const { selectedPrisoner, notFound, resetNotFound } = usePrisonerStore();

  // ⏱️ عند ظهور notFound، أخفيها بعد 5 ثوانٍ
  useEffect(() => {
    if (notFound) {
      const timer = setTimeout(() => {
        resetNotFound();
      }, 5000);
      return () => clearTimeout(timer); // تنظيف المؤقت عند الخروج
    }
  }, [notFound, resetNotFound]);

  return (
    <PrisonerSearchWrapper>
      {selectedPrisoner ? (
        <div className="space-y-6">
          <Suspense fallback={<PersonalInfoSkeleton />}>
            <PersonalInfoCard
              fullName={selectedPrisoner.fullName}
              idNumber={selectedPrisoner.idNumber}
              nationality={selectedPrisoner.nationality}
              gender={selectedPrisoner.gender}
              religion={selectedPrisoner.religion}
              birthDate={selectedPrisoner.birthDate}
              imageUrl={selectedPrisoner.imageUrl}
            />
          </Suspense>

          <Suspense fallback={<CasesTableSkeleton />}>
            <CasesTable cases={selectedPrisoner.cases} />
          </Suspense>
        </div>
      ) : notFound ? (
        <div className="flex flex-col items-center justify-center py-24 text-center text-red-700 transition-opacity duration-500">
          <div className="bg-red-100 text-red-800 p-4 rounded-full mb-4">
            <OctagonX className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold mb-1">السجين غير موجود</h2>
          <p className="text-sm text-red-700 max-w-md">
            لم يتم العثور على سجين برقم الهوية المدخل<br />
            الرجاء التأكد من صحة الرقم أو اختيار سجين من القائمة
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-500">
          <div className="bg-amber-50 text-amber-800 p-4 rounded-full mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold mb-1">لا يوجد بيانات لعرضها</h2>
          <p className="text-sm text-gray-500 max-w-md">
            الرجاء إدخال رقم الهوية في حقل البحث أو اختيار سجين من القائمة
            لعرض البيانات الشخصية والقضايا المرتبطة به
          </p>
        </div>
      )}
    </PrisonerSearchWrapper>
  );
}
