const ConfiscationFields = ({ penalty, onChange }) => {
    const { id, extras = {} } = penalty;

    return (
        <>
            {/* نوع المصادرة */}
            <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    نوع المصادرة <span className="text-red-600">*</span>
                </label>
                <select dir="rtl"
                    className="appearance-none w-full p-2 pr-4 rounded-md border border-gray-300 bg-gray-100 bg-[url('data:image/svg+xml,<svg fill=\'none\' stroke=\'%23333\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M19 9l-7 7-7-7\'></path></svg>')] bg-no-repeat bg-left bg-[length:1.25rem_1.25rem]" value={extras.confiscationType || ""}
                    onChange={(e) => onChange(id, "confiscationType", e.target.value)}
                >
                    <option value="">-- اختر --</option>
                    <option value="جوال">جوال</option>
                    <option value="مركبة">مركبة</option>
                    <option value="مبلغ مالي">مبلغ مالي</option>
                </select>
            </div>

            {/* الوصف */}
            <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    الوصف (عربي) <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none"
                    value={extras.descriptionAr || ""}
                    onChange={(e) => onChange(id, "descriptionAr", e.target.value)}
                />
            </div>
        </>
    );
};

export default ConfiscationFields;
