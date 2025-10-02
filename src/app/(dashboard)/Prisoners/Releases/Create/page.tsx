"use client";

import { useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrisonerStore } from "@/store/usePrisonerStore";
import IdentitySearchWrapper from "./_components/IdentitySearchWrapper";
import ReleaseFormSection from "./_components/ReleaseFormSection";
import { Search, OctagonX } from "lucide-react";


import PersonalInfoSkeleton from "@/app/(dashboard)/Prosecution/Case/Create/_components/PersonalInfoSkeleton";
import PersonalInfoCard from "@/app/(dashboard)/Prosecution/Case/Create/_components/CreateTransaction/PersonalInfoCard";
import CasesTableSkeleton from "@/app/(dashboard)/Prosecution/Case/Create/_components/CasesTableSkeleton";
import CasesTable from "@/app/(dashboard)/Prosecution/Case/Create/_components/CasesTable";

// const PersonalInfoCard = lazy(() => import("@/app/Prosecution/Case/Create/_components/CreateTransaction/PersonalInfoCard"));
// const CasesTable = lazy(() => import("@/app/Prosecution/Case/Create/_components/CasesTable"));
// const PersonalInfoSkeleton = lazy(() => import("@/app/Prosecution/Case/Create/_components/PersonalInfoSkeleton"));
// const CasesTableSkeleton = lazy(() => import("@/app/Prosecution/Case/Create/_components/CasesTableSkeleton"));

export default function CreateReleases() {
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
    <div className="mt-4 space-y-4">
      <IdentitySearchWrapper>
        <AnimatePresence mode="wait">
          {selectedPrisoner ? (
            <div key="data" className="space-y-6">
              <Suspense fallback={<PersonalInfoSkeleton />}>
                <PersonalInfoCard {...selectedPrisoner} />
              </Suspense>

              {/* <Suspense fallback={<CasesTableSkeleton />}>
                <CasesTable
                  cases={selectedPrisoner.cases}
                  prisonerIdNumber={selectedPrisoner.idNumber}
                />
                <ReleaseFormSection/>
              </Suspense> */}
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
<h2 className="text-lg font-semibold mb-1">تعذر العثور على السجين</h2>
<p className="text-sm text-red-700 max-w-md">
  لا يوجد سجين مسجل برقم الهوية المدخل.<br />
  تأكد من صحة الرقم أو اختر السجين من قائمة السجناء.
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
<h2 className="text-lg font-semibold mb-1">ابدأ إجراء الإفراج</h2>
<p className="text-sm text-gray-500 max-w-md">
  لإتمام إجراءات الإفراج، الرجاء إدخال رقم الهوية أو اختيار السجين من القائمة لعرض معلوماته
</p>

            </motion.div>
          )}
        </AnimatePresence>
      </IdentitySearchWrapper>
    </div>
  );
}