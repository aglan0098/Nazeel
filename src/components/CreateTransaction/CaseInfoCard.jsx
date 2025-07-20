import { Gavel } from 'lucide-react'; // أيقونة القاضي (تحتاج إلى تثبيت lucide-react)

const CaseInfoCard = ({ caseNumber, mainType, subType }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm w-full ">
            <div className="flex justify-start items-center border-b border-gray-50 px-6 py-4">
                <Gavel className="text-yellow-600 w-6 h-6 ml-3" />
                <h2 className="text-lg font-semibold text-gray-800">بيانات القضية</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 text-right">
                <div>
                    <p className="text-sm text-gray-500">رقم القضية</p>
                    <p className="font-medium text-gray-900">{caseNumber}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">تصنيف القضية</p>
                    <p className="font-medium text-gray-900">{mainType}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">تصنيف القضية الفرعي</p>
                    <p className="font-medium text-gray-900">{subType}</p>
                </div>
            </div>
        </div>
    );
};

export default CaseInfoCard;
