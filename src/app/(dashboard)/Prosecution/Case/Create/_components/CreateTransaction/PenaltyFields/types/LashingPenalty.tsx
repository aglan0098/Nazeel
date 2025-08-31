import React from 'react';

interface LashingDetails {
  type: string;
  rounds: number;
  lashesPerRound: number;
  location: string;
  description: string;
}

interface LashingPenaltyProps {
  lash?: LashingDetails;
  isReadOnly?: boolean;
}

const LashingPenalty: React.FC<LashingPenaltyProps> = ({ lash }) => {
  if (!lash) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">
        تفاصيل عقوبة الجلد
      </h4>
      <div className="text-sm text-gray-800 space-y-1">
        <p>
          <span className="font-medium">النوع:</span> {lash.type}
        </p>
        <p>
          <span className="font-medium">عدد الجولات:</span> {lash.rounds}
        </p>
        <p>
          <span className="font-medium">عدد الجلدات لكل جولة:</span> {lash.lashesPerRound}
        </p>
        <p>
          <span className="font-medium">الموقع:</span> {lash.location}
        </p>
        <p>
          <span className="font-medium">الوصف:</span> {lash.description}
        </p>
      </div>
    </div>
  );
};

export default LashingPenalty;
