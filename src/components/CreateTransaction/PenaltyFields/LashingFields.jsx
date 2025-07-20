import React from "react";

export default function LashingFields({ penalty, onChange }) {
  const isHadd = penalty.extras?.lashingType === "HADD";

  return (
    <>
      {/* نوع الجلد */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        نوع الجلد  <span className="text-red-600">*</span> 
        </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"          value={penalty.extras?.lashingType || ""}
          onChange={(e) => onChange("lashingType", e.target.value)}
        >
          <option value="">اختر</option>
          <option value="HADD">حد</option>
          <option value="TAZIR">تعزير</option>
        </select>
      </div>

      {/* نوع الحد */}
      {isHadd && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
             نوع الحد <span className="text-red-600">*</span>
          </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"            value={penalty.extras?.haddType || ""}
            onChange={(e) => onChange("haddType", e.target.value)}
          >
            <option value="">اختر</option>
            <option value="ZINA">حد الزنا</option>
            <option value="QADHAF">حد القذف</option>
            <option value="KHAMR">حد المسكر</option>
          </select>
        </div>
      )}

      {/* وصف الحد */}
      {isHadd && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
         وصف الحد   <span className="text-red-600">*</span> 
          </label>
          <input
            type="text"
            value={penalty.extras?.haddDescription || ""}
            onChange={(e) => onChange("haddDescription", e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
          />
        </div>
      )}

      {/* عدد الجلدات لكل دفعة */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
      عدد الجلدات لكل دفعة    <span className="text-red-600">*</span> 
        </label>
        <input
          type="number"
          min="0"
          value={penalty.extras?.lashesPerSession || ""}
          onChange={(e) => onChange("lashesPerSession", e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
        />
      </div>

      {/* عدد الدفعات */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        عدد الدفعات  <span className="text-red-600">*</span> 
        </label>
        <input
          type="number"
          min="0"
          value={penalty.extras?.sessions || ""}
          onChange={(e) => onChange("sessions", e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
        />
      </div>

      {/* مكان الجلد */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        مكان الجلد  <span className="text-red-600">*</span> 
        </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"          value={penalty.extras?.location || ""}
          onChange={(e) => onChange("location", e.target.value)}
        >
          <option value="">اختر</option>
          <option value="INSIDE_PRISON">داخل السجن</option>
          <option value="OUTSIDE_PRISON">خارج السجن</option>
          <option value="PERSONAL">شخصي</option>
        </select>
      </div>
    </>
  );
}
