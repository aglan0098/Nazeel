"use client";

import { useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrisonerStore } from "@/store/usePrisonerStore";
// import PrisonerSearchWrapper from "@/app/Prosecution/Case/Create/_components/PrisonerSearchWrapper";
// import CasesTableSkeleton from "@/app/Prosecution/Case/Create/_components/CasesTableSkeleton";
// import PersonalInfoSkeleton from "@/app/Prosecution/Case/Create/_components/PersonalInfoSkeleton";
import { Search, OctagonX } from "lucide-react";
import PrisonerSearchWrapper from "./_components/PrisonerSearchWrapper";
import PersonalInfoSkeleton from "./_components/PersonalInfoSkeleton";
import CasesTableSkeleton from "./_components/CasesTableSkeleton";

interface CaseData {
  [key: string]: any;
}

export interface Prisoner {
  fullName: string;
  idNumber: string;
  nationality: string;
  gender: string;
  religion: string;
  birthDate: string;
  imageUrl?: string;
  cases: CaseData[];
}

const PersonalInfoCard = lazy(
  () => import("./_components/CreateTransaction/PersonalInfoCard")
);
const CasesTable = lazy(() => import("./_components/CasesTable"));

const Page: React.FC = () => {
  const { selectedPrisoner, notFound, resetNotFound } = usePrisonerStore();

  useEffect(() => {
    if (notFound) {
      const timer = setTimeout(() => {
        resetNotFound();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notFound, resetNotFound]);

  return (
    <PrisonerSearchWrapper>
      <AnimatePresence mode="wait">
        {selectedPrisoner ? (
          <div key="data" className="space-y-6">
            <Suspense fallback={<PersonalInfoSkeleton />}>
              <PersonalInfoCard {...selectedPrisoner} />
            </Suspense>

            <Suspense fallback={<CasesTableSkeleton />}>
              <CasesTable
                cases={selectedPrisoner.cases}
                prisonerIdNumber={selectedPrisoner.idNumber}
              />
            </Suspense>
          </div>
        ) : notFound ? (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 text-center text-red-700"
          >
            <div className="bg-red-100 text-red-800 p-4 rounded-full mb-4">
              <OctagonX className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-semibold mb-1">السجين غير موجود</h2>
            <p className="text-sm text-red-700 max-w-md">
              لم يتم العثور على سجين برقم الهوية المدخل
              <br />
              الرجاء التأكد من صحة الرقم أو اختيار سجين من القائمة
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-24 text-center text-gray-500"
          >
            <div className="bg-amber-50 text-amber-800 p-4 rounded-full mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-semibold mb-1">
              لا يوجد بيانات لعرضها
            </h2>
            <p className="text-sm text-gray-500 max-w-md">
              الرجاء إدخال رقم الهوية في حقل البحث أو اختيار سجين من القائمة
              لعرض البيانات الشخصية والقضايا المرتبطة به
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </PrisonerSearchWrapper>
  );
};
export default Page;
