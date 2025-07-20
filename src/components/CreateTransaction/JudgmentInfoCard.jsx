import { Upload, Calendar, ChevronDown } from "lucide-react";

const JudgmentInfoCard = () => {
    return (
        <div className="w-full bg-white border border-gray-50 rounded-xl shadow-sm" dir="rtl">
            {/* العنوان */}
            <div className="flex justify-between items-center border-b border-gray-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800">بيانات الحكم</h2>
            </div>

            {/* الحقول */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 text-right">
                {/* رقم الحكم */}
                <div>
                    <label className="text-sm text-gray-700 font-medium block mb-1">
                     رقم الحكم <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder=""
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 focus:outline-none"
                    />
                </div>

                {/* المحكمة */}
                <div>
                    <label className="text-sm text-gray-700 font-medium block mb-1">
                        المحكمة <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"
                            defaultValue=""
                        >
                            <option value="">يرجى الاختيار</option>
                            <option>المحكمة العامة بدومة الجندل</option>
                            <option>المحكمة العامة بالعريجاء</option>
                            <option>المحكمة العامة بسمراء</option>
                            <option>المحكمة العامة بالإبداع</option>
                            <option>دوائر التنفيذ والأحوال الشخصية</option>
                            <option>المحكمة الجزائية بعريع</option>
                            <option>مجمع المحاكم الشرعية بالقطيف</option>
                        </select>
                        <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* التاريخ */}
                <div>
                    <label className="text-sm text-gray-700 font-medium block mb-1">
                       تاريخ الحكم  <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="29/12/1446" // هنا التاريخ يوضع يدوي أو يتم ربطه لاحقًا بمكون هجري حقيقي
                            className="w-full rounded-r-md border-t border-b border-r border-gray-300 bg-gray-100 p-2 focus:outline-none"
                        />
                        <div className="bg-gray-100 border border-gray-300 px-2 py-2 rounded-l-md">
                            <Calendar className="w-6 h-6 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* نوع الحكم */}
                <div>
                    <label className="text-sm text-gray-700 font-medium block mb-1">
                   نوع الحكم <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]"
                      defaultValue="final"
                        >
                            <option value="initial">حكم ابتدائي</option>
                            <option value="final">حكم نهائي</option>
                        </select>
                        <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* مرفق الحكم */}
            <div className="px-6 pb-6">
                <label className="text-sm text-gray-700 font-medium block mb-2">
                    إرفاق ملف الحكم <span className="text-red-600">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-400 bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center text-center text-gray-500">
                    <Upload className="w-6 h-6 text-blue-400 mb-2" />
                    <p>تصفح واختر الملفات التي تريد تحميلها من الكمبيوتر الخاص بك</p>
                </div>
            </div>
        </div>
    );
};

export default JudgmentInfoCard;
