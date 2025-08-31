import React from "react";

export default function FinancialAmountsFields({ penalty, onChange }) {
    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                 صاحب الحق   <span className="text-red-600">*</span> 
                </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]" value={penalty.extras?.ownerType || ""}
                    onChange={(e) => onChange("ownerType", e.target.value)}
                >
                    <option value="">اختر</option>
                    <option value="INDIVIDUAL">فرد</option>
                    <option value="INSTITUTION">مؤسسة</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهوية  <span className="text-red-600">*</span> 
                </label>
                <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
                    value={penalty.extras?.nationalId || ""}
                    onChange={(e) => onChange("nationalId", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الجوال  <span className="text-red-600">*</span> 
                </label>
                <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
                    value={penalty.extras?.mobile || ""}
                    onChange={(e) => onChange("mobile", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    المبلغ <span className="text-red-600">*</span>
                </label>
                <input
                    type="number"
                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
                    value={penalty.extras?.amount || ""}
                    onChange={(e) => onChange("amount", e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                   السبب  <span className="text-red-600">*</span>
                </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"                    value={penalty.extras?.reason || ""}
                    onChange={(e) => onChange("reason", e.target.value)}
                >
                    <option value="">اختر</option>
                    <option value="THEFT">سرقة</option>
                    <option value="DAMAGE">دين</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    رقم الفاتورة <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
                    value={penalty.extras?.invoiceNumber || ""}
                    onChange={(e) => onChange("invoiceNumber", e.target.value)}
                />
            </div>
        </>
    );
}
