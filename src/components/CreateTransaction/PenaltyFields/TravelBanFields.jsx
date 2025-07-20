export default function TravelBanFields({ penalty, onChange }) {
  const extras = penalty?.extras || {};

  return (
    <div className="grid grid-cols-12 gap-4" dir="rtl">
      {/* مدة منع السفر */}
      <div className="col-span-12">
        <label className="block text-sm font-medium text-gray-700 mb-2">
        مدة منع السفر  <span className="text-red-600">*</span> 
        </label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="يوم"
            className="p-2 rounded-md border border-gray-300 bg-gray-100 text-center"
            value={extras.banDays || ""}
            onChange={(e) => onChange("banDays", e.target.value)}
          />
          <input
            type="number"
            placeholder="شهر"
            className="p-2 rounded-md border border-gray-300 bg-gray-100 text-center"
            value={extras.banMonths || ""}
            onChange={(e) => onChange("banMonths", e.target.value)}
          />
          <input
            type="number"
            placeholder="سنة"
            className="p-2 rounded-md border border-gray-300 bg-gray-100 text-center"
            value={extras.banYears || ""}
            onChange={(e) => onChange("banYears", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
