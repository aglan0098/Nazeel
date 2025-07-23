'use client';

import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { add, differenceInDays } from 'date-fns';

interface Duration {
  years?: number;
  months?: number;
  days?: number;
}

interface PrisonPenaltyProps {
  duration?: Duration;
  isReadOnly?: boolean;
}

const PrisonPenalty: React.FC<PrisonPenaltyProps> = ({ duration }) => {
  const [endDateStr, setEndDateStr] = useState<string | null>(null);
  const [totalDays, setTotalDays] = useState<number | null>(null);

  useEffect(() => {
    if (duration) {
      const { years = 0, months = 0, days = 0 } = duration;
      const now = new Date();
      const end = add(now, { years, months, days });

      const formatted = end.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setEndDateStr(formatted);
      setTotalDays(differenceInDays(end, now));
    }
  }, [duration]);

  if (!duration) return null;
  const { years = 0, months = 0, days = 0 } = duration;

  return (
    <div className="border rounded-xl bg-white shadow-sm p-5 text-sm text-gray-800 space-y-4">
      <div className="flex items-center gap-2 border-b pb-2">
        <h3 className="font-semibold text-base">عقوبة السجن</h3>
      </div>

      <div className="text-right space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-semibold text-gray-700">المدة:</span>
          <span className="bg-yellow-100 text-yellow-900 font-bold px-3 py-1 rounded-md text-sm">
            {years} سنة - {months} شهر - {days} يوم
          </span>
          {totalDays !== null && (
            <span className="text-gray-500 text-sm">
              (تقريبًا {totalDays} يوم)
            </span>
          )}
        </div>

        {endDateStr && (
          <div className="flex items-center gap-2 text-[14px] text-gray-600 mt-2">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span>
              تاريخ نهاية العقوبة المتوقع:{' '}
              <span className="font-semibold text-gray-800">{endDateStr}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrisonPenalty;
