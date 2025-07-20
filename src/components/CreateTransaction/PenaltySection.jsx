"use client";

import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import ConfiscationFields from "./PenaltyFields/ConfiscationFields";
import ExecutionFields from "./PenaltyFields/ExecutionFields";
import FinancialAmountsFields from "./PenaltyFields/FinancialAmountsFields";
import DamageWithoutLifeFields from "./PenaltyFields/DamageWithoutLifeFields";
import LashingFields from "./PenaltyFields/LashingFields";
import ImprisonmentFields from "./PenaltyFields/ImprisonmentFields";
import PenaltyTypeSelect from "./PenaltyFields/PenaltyTypeSelect";
import TravelBanFields from "./PenaltyFields/TravelBanFields";

const penaltiesByRightType = {
    PUBLIC: [
        { id: "PRISON", label: "سجن" },
        { id: "EXECUTION", label: "القصاص" },
        { id: "LASHING", label: "الجلد" },
        { id: "DAMAGE_WITHOUT_LIFE", label: "إتلاف ما دون النفس" },
        { id: "DENIAL", label: "عدم الإفادة" },
        { id: "FIN", label: "الغرامات" },
        { id: "DEPORTATION", label: "الإبعاد" },
        { id: "CONFISCATION", label: "المصادرة" },
        { id: "TRAVEL_BAN", label: "منع السفر" },
        { id: "TIME_SERVED", label: "الاكتفاء بما مضى عليه من سجن" },
        { id: "CHARGES_DROPPED", label: "حفظ الاتهام" },
    ],
    PRIVATE: [
        { id: "PRISON", label: "سجن" },
        { id: "EXECUTION", label: "القصاص" },
        { id: "LASHING", label: "الجلد" },
        { id: "DAMAGE_WITHOUT_LIFE", label: "إتلاف ما دون النفس" },
        { id: "DENIAL", label: "عدم الإفادة" },
        { id: "FINES", label: "المبالغ المالية" },
    ],
};

const penaltyComponentMap = {
    CONFISCATION: ConfiscationFields,
    EXECUTION: ExecutionFields,
    FINES: FinancialAmountsFields,
    FIN: PenaltyTypeSelect,
    DAMAGE_WITHOUT_LIFE: DamageWithoutLifeFields,
    PRISON: ImprisonmentFields,
    LASHING: LashingFields,
    TRAVEL_BAN: TravelBanFields

};

export default function PenaltiesSection() {
    const [penalties, setPenalties] = useState([]);

    const addPenalty = () => {
        setPenalties((prev) => [
            ...prev,
            {
                id: Date.now(),
                rightType: "PUBLIC",
                penaltyType: "",
                extras: {},
            },
        ]);
    };

    const removePenalty = (id) => {
        setPenalties((prev) => prev.filter((p) => p.id !== id));
    };

    const updateField = (id, field, value) => {
        setPenalties((prev) =>
            prev.map((p) => {
                if (p.id !== id) return p;
                const updated = { ...p };
                if (field === "rightType") {
                    updated.rightType = value;
                    updated.penaltyType = "";
                    updated.extras = {};
                } else if (field === "penaltyType") {
                    updated.penaltyType = value;
                    updated.extras = {};
                }
                return updated;
            })
        );
    };

    const updateExtra = (id, field, value) => {
  setPenalties((prev) =>
    prev.map((p) =>
      p.id === id
        ? {
            ...p,
            ...(field === "previousSuspends"
              ? { previousSuspends: value }
              : { extras: { ...p.extras, [field]: value } }),
          }
        : p
    )
  );
};


    const handleDelete = (id, penaltyLabel) => {
        Swal.fire({
            title: "تأكيد الحذف",
            text: `هل ترغب في حذف "${penaltyLabel}"؟`,
            showCancelButton: true,
            confirmButtonText: "نعم، احذفها",
            cancelButtonText: "إلغاء",
            confirmButtonColor: "#b30000",
            cancelButtonColor: "#404040",
        }).then((result) => {
            if (result.isConfirmed) {
                removePenalty(id);
                Swal.fire({
                    title: "تم الحذف",
                    text: `تم حذف العقوبة "${penaltyLabel}" بنجاح.`,
                    showConfirmButton: false,
                    timer: 1600,
                });
            }
        });
    };

    return (
        <div className="bg-white border border-gray-50 rounded-xl shadow-sm p-4 space-y-4" dir="rtl">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">العقوبات</h2>
                <button
                    onClick={addPenalty}
                    className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded-full text-sm shadow transition"
                >
                    <Plus className="w-4 h-4" /> إضافة
                </button>
            </div>
            {penalties.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-8">
                    لا توجد أي عقوبات مضافة حاليًا
                </div>
            )}
            {penalties.map((penalty) => {
                const rightKey = penalty.rightType;
                const options = penaltiesByRightType[rightKey];
                const PenaltyFields = penaltyComponentMap[penalty.penaltyType];
                const penaltyLabel =
                    options.find((opt) => opt.id === penalty.penaltyType)?.label || "غير معروف=ف";

                return (
                    <div
                        key={penalty.id}
                        className="border border-gray-100 rounded-md p-4 bg-gray-50 relative space-y-4"
                    >
                        <button
                            onClick={() => handleDelete(penalty.id, penaltyLabel)}
                            className="absolute top-2 left-2 text-gray-400 hover:text-red-500"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    نوع الحق <span className="text-red-600">*</span> 
                                </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"                                    value={penalty.rightType}
                                    onChange={(e) => updateField(penalty.id, "rightType", e.target.value)}
                                >
                                    <option value="PUBLIC">حق عام</option>
                                    <option value="PRIVATE">حق خاص</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  نوع العقوبة <span className="text-red-600">*</span> 
                                </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"                                    value={penalty.penaltyType}
                                    onChange={(e) => updateField(penalty.id, "penaltyType", e.target.value)}
                                >
 <option disabled value="">
    اختر
  </option>                                    {options.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {PenaltyFields ? (
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <PenaltyFields
  penalty={penalty}
  onChange={(field, value) => updateExtra(penalty.id, field, value)}
  showDurationError={false} // لو كنت تتحقق من الخطأ لاحقًا
/>

                                </div>
                            ) : (
                                <div className="md:col-span-2 text-sm text-gray-600 bg-amber-50   rounded-md p-3">
                                    هذه العقوبة لا تتطلب إدخال بيانات إضافية
                                </div>
                            )}

                        </div>
                    </div>
                );
            })}
        </div>
    );
}
