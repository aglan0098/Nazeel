import React from "react";

export default function DamageWithoutLifeFields({ penalty, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
               موضوع الإتلاف <span className="text-red-600">*</span> 
            </label>
            <select dir="rtl"
                className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]" value={penalty.extras?.damageArea || ""}
                onChange={(e) => onChange("damageArea", e.target.value)}
            >
                <option value="">اختر</option>
                <option value="RIGHT_FOOT">قدم يمين</option>
                <option value="LEFT_FOOT">قدم يسار</option>
                <option value="RIGHT_HAND">يد يمين</option>
                <option value="LEFT_HAND">يد يسار</option>
            </select>
        </div>
    );
}
