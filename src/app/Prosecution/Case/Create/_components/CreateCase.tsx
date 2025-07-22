"use client";

import React from 'react';
import PersonalInfoCard from "@/app/Prosecution/Case/Create/_components/CreateTransaction/PersonalInfoCard";
import JudgmentInfoCard from "@/app/Prosecution/Case/Create/_components/CreateTransaction/JudgmentInfoCard";
import PenaltySection from "@/app/Prosecution/Case/Create/_components/CreateTransaction/PenaltySection";
import JudgmentApprovalFields from "@/app/Prosecution/Case/Create/_components/CreateTransaction/JudgmentApprovalFields";
import CaseInfoCard from "@/app/Prosecution/Case/Create/_components/CreateTransaction/CaseInfoCard";

function CreateCase({ prisoner }) {
  const [caseData] = prisoner.cases || []; // ← استخراج أول قضية
  const personalData = { ...prisoner };
  delete personalData.cases;

  const isJudgmentApprovalFields = false;

  return (
    <div className="w-full max-w-screen-xl p-3" dir="rtl">
      <PersonalInfoCard {...personalData} />

      <div className="my-8">
        <CaseInfoCard
          caseNumber={caseData.caseNumber}
          mainType={caseData.caseType}
          subType={caseData.subType}
        />
      </div>

      <JudgmentInfoCard />

      <div className="my-8">
        <PenaltySection />
      </div>

      {isJudgmentApprovalFields && (
        <JudgmentApprovalFields
          penalty={{ extras: {} }}
          onChange={(field, value) => {
            console.log("Changed:", field, value);
          }}
        />
      )}

      <div className="flex justify-end gap-2 mt-6" dir="rtl">
        <button className="bg-yellow-800 hover:bg-yellow-900 text-white font-semibold px-6 py-2 rounded-xl shadow-md">
          إنشاء
        </button>

        <button className="bg-yellow-700 hover:bg-yellow-900 text-white font-semibold px-6 py-2 rounded-xl shadow-sm flex items-center gap-1">
          غلق
        </button>
      </div>
    </div>
  );
}

export default CreateCase;
