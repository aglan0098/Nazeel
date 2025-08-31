import React from 'react';

interface ExecutionDetails {
  type: string;
  tool: string;
  crucifixion: boolean;
}

interface ExecutionPenaltyProps {
  execution?: ExecutionDetails;
  isReadOnly?: boolean; // لإضافة دعم القراءة لاحقًا إن رغبت
}

const ExecutionPenalty: React.FC<ExecutionPenaltyProps> = ({ execution }) => {
  if (!execution) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">
        تفاصيل عقوبة القصاص / الحد
      </h4>
      <div className="text-sm text-gray-800 space-y-1">
        <p>
          <span className="font-medium">النوع:</span> {execution.type}
        </p>
        <p>
          <span className="font-medium">أداة التنفيذ:</span> {execution.tool}
        </p>
        <p>
          <span className="font-medium">الصلب:</span>{' '}
          {execution.crucifixion ? 'نعم' : 'لا'}
        </p>
      </div>
    </div>
  );
};

export default ExecutionPenalty;
