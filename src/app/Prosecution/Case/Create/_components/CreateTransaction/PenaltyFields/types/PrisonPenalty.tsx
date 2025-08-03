"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Info } from "lucide-react";
import { add, differenceInDays, format } from "date-fns";
import { arSA } from "date-fns/locale";

interface Duration {
  years?: number;
  months?: number;
  days?: number;
}

interface PreviousDetention {
  from: Date;
  to: Date;
}

interface PrisonPenaltyProps {
  duration?: Duration;
  isReadOnly?: boolean;
  executionStopped?: boolean;
  executionStopDuration?: Duration;
  previousDetentions?: PreviousDetention[];
}

const PrisonPenalty: React.FC<PrisonPenaltyProps> = ({
  duration,
  isReadOnly = false,
  executionStopped,
  executionStopDuration,
  previousDetentions = [],
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalDays, setTotalDays] = useState<number | null>(null);

  useEffect(() => {
    if (duration) {
      const { years = 0, months = 0, days = 0 } = duration;
      const now = new Date();
      const end = add(now, { years, months, days });

      setStartDate(now);
      setEndDate(end);
      setTotalDays(differenceInDays(end, now));
    }
  }, [duration]);

  if (!duration || !startDate || !endDate) return null;
  const { years = 0, months = 0, days = 0 } = duration;

  const hijriFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fullDurationText = [
    years ? `${years} سنة` : null,
    months ? `${months} شهر` : null,
    days ? `${days} يوم` : null,
  ]
    .filter(Boolean)
    .join(" و ");

  return (
    <div className="border border-gray-100 rounded-2xl bg-white  p-6 text-sm text-gray-800 space-y-6">
      {/* العنوان */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="font-semibold text-lg text-gray-900">عقوبة السجن</h3>
      </div>

      {/* المدة */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-semibold text-gray-700">المدة:</span>
          <span className="bg-yellow-100 text-yellow-900 font-bold px-3 py-1 rounded-md text-sm">
            {years} سنة - {months} شهر - {days} يوم
          </span>
          {totalDays !== null && (
            <span className="text-gray-500 text-sm">(تقريبًا {totalDays} يوم)</span>
          )}
        </div>
        {isReadOnly && fullDurationText && (
          <p className="text-gray-500 text-sm">
            <span className="font-medium text-gray-700">تفصيل:</span> {fullDurationText}
          </p>
        )}
      </div>

      {/* التواريخ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm">
        <div className="flex items-start gap-2">
          <CalendarDays className="w-5 h-5 mt-1 text-gray-500" />
          <div>
            <p>
              <span className="font-medium">تاريخ بداية العقوبة (ميلادي): </span>
              {format(startDate, "d MMMM yyyy", { locale: arSA })}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">هجري: </span>
              {hijriFormatter.format(startDate)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CalendarDays className="w-5 h-5 mt-1 text-gray-500" />
          <div>
            <p>
              <span className="font-medium">تاريخ نهاية العقوبة (ميلادي): </span>
              {format(endDate, "d MMMM yyyy", { locale: arSA })}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">هجري: </span>
              {hijriFormatter.format(endDate)}
            </p>
          </div>
        </div>
      </div>

{isReadOnly && executionStopped !== undefined && (
  <div className="border-t border-gray-100 pt-5 space-y-2">
    <h4 className="text-base font-semibold text-gray-800">إيقاف تنفيذ الحكم</h4>

    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-gray-600">هل تم إيقاف التنفيذ؟</span>
      <span className={`font-bold ${executionStopped ? "text-green-600" : "text-red-600"}`}>
        {executionStopped ? "نعم" : "لا"}
      </span>
    </div>

    {executionStopped && executionStopDuration && (
      <div className="text-sm text-gray-600">
        <span className="font-medium text-gray-700">مدة الإيقاف:</span>{" "}
        {executionStopDuration.years || 0} سنة - {executionStopDuration.months || 0} شهر -{" "}
        {executionStopDuration.days || 0} يوم
      </div>
    )}
  </div>
)}


      {/* مدد التوقيف السابقة */}
{isReadOnly && previousDetentions.length > 0 && (
  <div className="border-t border-gray-200 pt-6 space-y-4">
    <h4 className="text-base font-bold text-gray-900">مدد توقيف سابقة</h4>

{previousDetentions.map((det, idx) => {
  const fromHijri = hijriFormatter.format(det.from);
  const toHijri = hijriFormatter.format(det.to);
  const diff = differenceInDays(det.to, det.from);

  return (
    <div
      key={idx}
      className="bg-gray-50 border border-gray-300 rounded-2xl px-5 py-4 text-sm text-gray-700 space-y-3 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="font-medium text-gray-600">من (ميلادي):</p>
          <p className="text-gray-900">{format(det.from, "yyyy-MM-dd")}</p>
          <p className="text-gray-500 text-xs">هجري: {fromHijri}</p>
        </div>

        <div className="space-y-1">
          <p className="font-medium text-gray-600">إلى (ميلادي):</p>
          <p className="text-gray-900">{format(det.to, "yyyy-MM-dd")}</p>
          <p className="text-gray-500 text-xs">هجري: {toHijri}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-red-700 font-semibold mt-2">
        <Info className="w-4 h-4" />
        <span>سيتم خصم المدة ({diff} يومًا) من فترة المحكومية.</span>
      </div>
    </div>
  );
})}

  </div>
)}

    </div>
  );
};

export default PrisonPenalty;
