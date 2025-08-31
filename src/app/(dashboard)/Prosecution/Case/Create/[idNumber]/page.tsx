"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CreateCase from "@/app/Prosecution/Case/Create/_components/CreateCase";
import { usePrisonerStore } from "@/store/usePrisonerStore";

export default function DynamicCasePage() {
  const { idNumber } = useParams();
  const searchParams = useSearchParams();
  const mode = searchParams?.get("mode") ?? "create";
  const isReadOnly = mode === "view";

  const { selectedPrisoner, selectPrisonerById } = usePrisonerStore();

  // نحدد السجين عند الدخول للصفحة إن لم يكن موجودًا مسبقًا
  useEffect(() => {
    if (idNumber && !selectedPrisoner) {
      selectPrisonerById(String(idNumber));
    }
  }, [idNumber, selectedPrisoner, selectPrisonerById]);

  if (!selectedPrisoner) {
    return (
      <div className="text-center text-red-600 p-10 font-bold text-lg">
        لا توجد بيانات للسجين بالمعرف: {idNumber}
      </div>
    );
  }

  return (
    <CreateCase
      key={mode}
      prisoner={selectedPrisoner}
      selectedCase={selectedPrisoner.cases?.[0] || null}
      mode={mode}
    />
  );
}
