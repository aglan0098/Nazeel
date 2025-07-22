export default function PenaltyTypeSelect({ penalty, onChange }) {
  const extras = penalty?.extras || {};

  return (
    <div className="grid grid-cols-2 gap-4" dir="rtl">
      {/* اسم الجهة */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          اسم الجهة <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
          value={extras.entityName || ""}
          onChange={(e) => onChange("entityName", e.target.value)}
        />
      </div>

      {/* السبب */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        السبب  <span className="text-red-600">*</span> 
        </label>
        <input
          type="text"
          className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
          value={extras.reason || ""}
          onChange={(e) => onChange("reason", e.target.value)}
        />
      </div>

      {/* المبلغ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
         المبلغ  <span className="text-red-600">*</span>
        </label>
        <input
          type="number"
          className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
          value={extras.amount || ""}
          onChange={(e) => onChange("amount", e.target.value)}
        />
      </div>

      {/* نوع الغرامة */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
         نوع الغرامة  <span className="text-red-600">*</span>
        </label>
        <select
          value={extras.penaltyType || ""}
          onChange={(e) => onChange("penaltyType", e.target.value)}
          className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 
            bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'/></svg>')] 
            bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"
        >
          <option value="" disabled hidden>اختر</option>
          <option value="GENERAL">عامة</option>
          <option value="CUSTOM">جمركية</option>
        </select>
      </div>
    </div>
  );
}
