import React from "react";
import PreviousSuspend from "./PreviousSuspend";

export default function ImprisonmentFields({
  penalty,
  onChange,
  onAddPreviousSuspend,
  showDurationError, // <- تمرير هذا من الأعلى حسب منطق التحقق
}) {
  const handleInputChange = (field, value) => {
    const numericValue = Math.max(0, parseInt(value || 0));
    onChange(field, numericValue.toString());
  };

  const handleAddPreviousSuspend = () => {
    const newList = [...(penalty.previousSuspends || []), { from: "", to: "" }];
    onChange("previousSuspends", newList);
  };

  const handleSuspendChange = (index, field, value) => {
    const updated = [...(penalty.previousSuspends || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange("previousSuspends", updated);
  };

  const handleSuspendRemove = (index) => {
    const updated = [...(penalty.previousSuspends || [])];
    updated.splice(index, 1);
    onChange("previousSuspends", updated);
  };

  return (
    <>
      {/* مدة العقوبة */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-800 mb-1">
         مدة العقوبة بـ  <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-2">
          {["imprisonmentDays", "imprisonmentMonths", "imprisonmentYears"].map((field, idx) => (
            <input
              key={field}
              type="number"
              min={0}
              placeholder={["يوم", "شهر", "سنة"][idx]}
              className="w-1/3 rounded-md border border-gray-300 bg-gray-100 text-center focus:outline-none"
              value={penalty.extras?.[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
            />
          ))}
        </div>

          <p className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            <span className="font-semibold">تنبيه:</span> برجاء إدخال مدة المحكومية (عدد السنوات)
          </p>
      </div>

      {/* إيقاف تنفيذ الحكم */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
         إيقاف تنفيذ الحكم؟ <span className="text-red-600">*</span> 
        </label>
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-1 text-gray-800">
            <input
              type="radio"
              name={`suspendExecution_${penalty.id}`}
              value="true"
              checked={penalty.extras?.suspendExecution === "true"}
              onChange={(e) => onChange("suspendExecution", e.target.value)}
              className="form-radio text-yellow-700 focus:ring-yellow-700 border-gray-300"
            />
            نعم
          </label>
          <label className="flex items-center gap-1 text-gray-800">
            <input
              type="radio"
              name={`suspendExecution_${penalty.id}`}
              value="false"
              checked={penalty.extras?.suspendExecution === "false"}
              onChange={(e) => onChange("suspendExecution", e.target.value)}
              className="form-radio text-gray-400 focus:ring-gray-400 border-gray-300"
            />
            لا
          </label>
        </div>
      </div>

      {/* مدة إيقاف تنفيذ الحكم */}
      {penalty.extras?.suspendExecution === "true" && (
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-800 mb-1">
          مدة إيقاف تنفيذ الحكم  <span className="text-red-600">*</span> 
          </label>
          <div className="flex gap-2">
            {["suspendDays", "suspendMonths", "suspendYears"].map((field, idx) => (
              <input
                key={field}
                type="number"
                min={0}
                placeholder={["يوم", "شهر", "سنة"][idx]}
                className="w-1/3 rounded-md border border-gray-300 bg-gray-100 text-center focus:outline-none"
                value={penalty.extras?.[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            ))}
          </div>
        </div>
      )}

 

      {/* زر دائم لإضافة مدة توقيف سابقة */}
      <div className="col-span-2 mt-4">
        <button
          type="button"
          onClick={handleAddPreviousSuspend}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 mb-3 rounded-lg flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span>
          <span className="text-sm font-semibold leading-tight">إضافة مدة توقيف سابقة</span>
        </button>
      {(penalty.previousSuspends || []).map((item, index) => (
        <PreviousSuspend
          key={index}
          index={index}
          value={item}
          onChange={handleSuspendChange}
          onRemove={handleSuspendRemove}
        />
      ))}
      </div>
    </>
  );
}