"use client";

import React from "react";
import { useRouter } from "next/navigation";

import PersonalInfoCard from "@/app/Prosecution/Case/Create/_components/CreateTransaction/PersonalInfoCard";
import CaseInfoCard from "@/app/Prosecution/Case/Create/_components/CreateTransaction/CaseInfoCard";
import JudgmentInfoCard from "@/app/Prosecution/Case/Create/_components/CreateTransaction/JudgmentInfoCard";
import PenaltySection from "@/app/Prosecution/Case/Create/_components/CreateTransaction/PenaltySection";
import JudgmentApprovalFields from "@/app/Prosecution/Case/Create/_components/CreateTransaction/JudgmentApprovalFields";
import PunishmentsSection from "@/app/Prosecution/Case/Create/_components/CreateTransaction/PunishmentsSection";
import type { Prisoner } from "@/types/Prisoner";
import type { Case } from "@/types/Case";

interface CreateCaseProps {
  prisoner: Prisoner;
  selectedCase?: Case | null;
  mode?: "view" | "create" | "edit";
}

const CreateCase: React.FC<CreateCaseProps> = ({
  prisoner,
  selectedCase,
  mode = "view",
}) => {
  const isReadOnly = mode === "view";
  const isCreate = mode === "create";
  const isEdit = mode === "edit";

  const caseData: Partial<Case> = selectedCase || prisoner.cases?.[0] || {};
  const personalData = { ...prisoner };
  delete (personalData as any).cases;

  const router = useRouter();

  const handleBack = () => {
    router.push("/Prosecution/Case/Create/");
  };

  return (
    <div className="w-full max-w-screen-xl p-3" dir="rtl">
      {/* ✅ البيانات الشخصية - عرض فقط */}
      <PersonalInfoCard {...personalData} />

      {/* ✅ بيانات القضية - عرض فقط */}
      <div className="my-8">
        <CaseInfoCard
          caseNumber={caseData.caseNumber || ""}
          mainType={caseData.caseType || ""}
          subType={caseData.subType || ""}
        />
      </div>

      {/* ✅ بيانات الحكم - تعديل أو قراءة حسب الوضع */}
      <JudgmentInfoCard
        judgmentNumber={isCreate ? "" : caseData.judgmentNumber || ""}
        court={isCreate ? "" : caseData.court || ""}
        judgmentDate={isCreate ? "" : caseData.judgmentDate || ""}
        judgmentType={isCreate ? "" : caseData.judgmentType || ""}
        isReadOnly={isReadOnly}
      />

      {/* ✅ العقوبات - فقط في الوضع القابل للتعديل */}
      <div className="my-8">
        {!isReadOnly ? (
          <PenaltySection />
        ) : (
          <PunishmentsSection
            penalties={caseData.penalties || []}
            isReadOnly={true}
          />
        )}
      </div>

      {/* ✅ حقول التصديق - فقط في التعديل */}
      {isEdit && (
        <JudgmentApprovalFields
          penalty={{ extras: {} }}
          onChange={(field, value) => {
            console.log("Changed:", field, value);
          }}
        />
      )}

      {/* ✅ الأزرار */}
      <div className="flex justify-between mt-6" dir="ltr">
        {(isCreate || isEdit) && (
          <button className="bg-yellow-800 hover:bg-yellow-900 text-white font-semibold px-6 py-2 rounded-xl shadow-md">
            {isCreate ? "إنشاء" : "حفظ التعديلات"}
          </button>
        )}

        <button
          onClick={handleBack}
          className="bg-transparent border border-yellow-900 hover:bg-yellow-900 hover:text-white text-yellow-900 font-semibold px-8 py-3 rounded-xl shadow-sm flex items-center gap-1 transition"
        >
          رجوع
        </button>
      </div>
    </div>
  );
};

export default CreateCase;
