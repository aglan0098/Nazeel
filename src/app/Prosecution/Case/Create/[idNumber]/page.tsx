'use client';

import { useParams } from 'next/navigation';
import { prisoners } from '@/data/mockPrisoners';
import CreateCase from '@/app/Prosecution/Case/Create/_components/CreateCase';

export default function DynamicCasePage() {
  const { idNumber } = useParams();

  const prisoner = prisoners.find(p => String(p.idNumber) === String(idNumber));

  if (!prisoner) {
    return (
      <div className="text-center text-red-600 p-10 font-bold text-lg">
         لا توجد بيانات للسجين بالمعرف: {idNumber}
      </div>
    );
  }

  return <CreateCase prisoner={prisoner} />;
}
