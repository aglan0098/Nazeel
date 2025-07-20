import React from "react";

export default function ExecutionFields({ penalty, onChange }) {
    const predefinedOptions = [20, 40, 60];

    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    نوع القصاص <span className="text-red-600">*</span> 
                </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"
                    value={penalty.extras?.executionType || ""}
                    onChange={(e) => onChange("executionType", e.target.value)}
                >
                    <option value="">اختر</option>
                    <option value="LIMIT">حد</option>
                    <option value="TAZIR">تعزير</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    الأداة المستخدمة <span className="text-red-600">*</span>
                </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"                    value={penalty.extras?.executionTool || ""}
                    onChange={(e) => onChange("executionTool", e.target.value)}
                >
                    <option value="">اختر</option>
                    <option value="SWORD">سيف</option>
                    <option value="HANG">شنق</option>
                    <option value="SHOOT">رمي</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                     الصلب بعد القصاص؟ <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-6 items-center">
                    <label className="flex items-center gap-1 text-gray-800">
                        <input
                            type="radio"
                            name={`crucifixionAfter_${penalty.id}`}
                            value="true"
                            checked={penalty.extras?.crucifixionAfter === "true"}
                            onChange={(e) => onChange("crucifixionAfter", e.target.value)}
                            className="form-radio text-yellow-700 focus:ring-yellow-700 border-gray-300"
                        />
                        نعم
                    </label>
                    <label className="flex items-center gap-1 text-gray-800">
                        <input
                            type="radio"
                            name={`crucifixionAfter_${penalty.id}`}
                            value="false"
                            checked={penalty.extras?.crucifixionAfter === "false"}
                            onChange={(e) => onChange("crucifixionAfter", e.target.value)}
                            className="form-radio text-gray-400 focus:ring-gray-400 border-gray-300"
                        />
                        لا
                    </label>
                </div>
            </div>


            {penalty.extras?.crucifixionAfter === "true" && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                         عدد أيام الصلب <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={99}
                        placeholder="أدخل عدد الأيام"
                        className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
                        value={penalty.extras?.crucifixionDays || ""}
                        onChange={(e) => onChange("crucifixionDays", e.target.value)}
                    />
                </div>

            )}
        </>
    );
}
