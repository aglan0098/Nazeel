"use client";


import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function PreviousSuspend({ index, value, onChange, onRemove }) {
    const [daysCount, setDaysCount] = useState(0);

    useEffect(() => {
        if (value.from && value.to) {
            const fromDate = new Date(value.from);
            const toDate = new Date(value.to);
            const diffInMs = toDate - fromDate;
            const diffInDays = Math.max(0, Math.ceil(diffInMs / (1000 * 60 * 60 * 24)));
            setDaysCount(diffInDays);
        } else {
            setDaysCount(0);
        }
    }, [value.from, value.to]);

    return (
        <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm p-4 mb-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-medium">من</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={value.from || ""}
                        onChange={(e) => onChange(index, "from", e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-700 font-medium">إلى</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={value.to || ""}
                        onChange={(e) => onChange(index, "to", e.target.value)}
                    />
                </div>
            </div>

            <div className="relative border border-red-300 bg-red-50 text-red-800 px-4 py-3 rounded-md">
                <p className="font-semibold">سيتم خصم مدة التوقيف من فترة المحكومية</p>
                <p className="text-xs mt-1 font-normal">
                    المدة المحسوبة:{" "}
                    <span className="font-bold text-neutral-700">
                        {daysCount === 0
                            ? "لم يتم التحديد"
                            : daysCount === 1
                                ? "يوم واحد"
                                : daysCount === 2
                                    ? "يومين"
                                    : daysCount >= 3 && daysCount <= 10
                                        ? `${daysCount} أيام`
                                        : `${daysCount} يومًا`}
                    </span>
                </p>


                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="absolute top-3 left-3 text-yellow-700 hover:text-red-600 transition"
                    title="حذف مدة التوقيف"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
