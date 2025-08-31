"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import PrisonPenalty from "./PenaltyFields/types/PrisonPenalty";
import ExecutionPenalty from "./PenaltyFields/types/ExecutionPenalty";
import LashingPenalty from "./PenaltyFields/types/LashingPenalty";

interface BasePenalty {
  penaltyType: string;
  rightType?: "حق عام" | "حق خاص";
}

interface PrisonPenaltyType extends BasePenalty {
  penaltyType: "سجن";
  duration: string;
  suspended?: boolean;
}

interface LashingPenaltyType extends BasePenalty {
  penaltyType: "الجلد";
  lash: number;
}

interface ExecutionPenaltyType extends BasePenalty {
  penaltyType: "القصاص";
  execution: string;
}

type Penalty = PrisonPenaltyType | LashingPenaltyType | ExecutionPenaltyType;

interface PunishmentsSectionProps {
  penalties?: Penalty[];
  isReadOnly: boolean;
}

const tabs = [
  { name: "حق عام", key: "حق عام" },
  { name: "حق خاص", key: "حق خاص" },
];

export default function PunishmentsSection({
  penalties = [],
  isReadOnly,
}: PunishmentsSectionProps) {
  const [activeTab, setActiveTab] = useState<"حق عام" | "حق خاص">("حق عام");

  const grouped: Record<"حق عام" | "حق خاص", Penalty[]> = {
    "حق عام": [],
    "حق خاص": [],
  };

  penalties.forEach((penalty) => {
    const group = penalty.rightType === "حق خاص" ? "حق خاص" : "حق عام";
    grouped[group].push(penalty);
  });

  return (
    <div
      className="bg-white border border-gray-50 rounded-xl shadow-sm p-4 space-y-4"
      dir="rtl"
    >
      <h2 className="text-lg font-semibold text-gray-800">العقوبات</h2>
      <div className="flex justify-between items-center">
        <div className="relative flex rounded-xl bg-[#F5F5F5] p-1 w-full h-[48px]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "حق عام" | "حق خاص")}
              className={`relative flex-1 text-center text-xl rounded-lg px-4 py-2 transition-colors duration-200 z-10 ${
                activeTab === tab.key ? "text-yellow-700" : "text-gray-500"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* محتوى العقوبات */}
      <div className="space-y-4">
        {grouped[activeTab]?.length > 0 ? (
          grouped[activeTab].map((penalty, index) => {
            const key = `${penalty.penaltyType}-${index}`;

            switch (penalty.penaltyType) {
case "سجن":
  return (
    <PrisonPenalty
      key={key} // ✅ أضف هذا السطر
      duration={{ years: 0, months: 3, days: 0 }}
      isReadOnly={true}
      executionStopped={true}
      executionStopDuration={{ years: 1, months: 2, days: 0 }}
      previousDetentions={[
        {
          from: new Date("2022-04-01"),
          to: new Date("2022-04-15"),
        },
        {
          from: new Date("2023-06-10"),
          to: new Date("2023-06-25"),
        },
      ]}
    />
  );

              case "الجلد":
                return (
                  <LashingPenalty
                    key={key}
                    lash={(penalty as LashingPenaltyType).lash}
                    isReadOnly={isReadOnly}
                  />
                );
              case "القصاص":
                return (
                  <ExecutionPenalty
                    key={key}
                    execution={(penalty as ExecutionPenaltyType).execution}
                    isReadOnly={isReadOnly}
                  />
                );
              default:
                return (
                  <div key={key} className="text-red-600">
                    نوع العقوبة غير معروف: {penalty.penaltyType}
                  </div>
                );
            }
          })
        ) : (
          <p className="text-gray-500 text-sm text-center">
            لا توجد عقوبات لهذا النوع
          </p>
        )}
      </div>
    </div>
  );
}
