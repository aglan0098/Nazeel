"use client";

import { useEffect, useRef, useState } from "react";
import { UploadCloud, ChevronsUpDown } from "lucide-react";

const reasons = [
  { value: "release", label: "إطلاق سراح" },
  { value: "escape", label: "هروب" },
  { value: "death", label: "وفاة" },
];

export default function ReleaseFormSection() {
  const [releaseReason, setReleaseReason] = useState("");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredReasons = reasons.filter((r) =>
    r.label.includes(query)
  );

  const handleSelect = (value: string) => {
    setReleaseReason(value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!inputRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 space-y-6">
      {/* سبب الإفراج */}
      <div className="relative w-full md:w-[320px]">
        <label className="block text-sm font-medium mb-1 text-right text-black">
          سبب الإفراج <span className="text-red-600">*</span>
        </label>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={
              reasons.find((r) => r.value === releaseReason)?.label ?? query
            }
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setReleaseReason(""); // clear selection
              setIsOpen(true);
            }}
            placeholder="يرجى الاختيار"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
            readOnly={false}
          />
          <ChevronsUpDown
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>

        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {filteredReasons.length === 0 ? (
              <li className="px-4 py-2 text-sm text-gray-500">لا يوجد نتائج</li>
            ) : (
              filteredReasons.map((reason) => (
                <li
                  key={reason.value}
                  onClick={() => handleSelect(reason.value)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {reason.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* نموذج الإفراج */}
      <div>
        <label className="block text-sm font-medium mb-1 text-right text-black">
          نموذج الإفراج <span className="text-red-600">*</span>
        </label>
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-yellow-500 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <UploadCloud className="w-8 h-8 text-blue-500 mb-2" />
          <p className="text-sm text-gray-500 text-center">
            تصفح واختر الملفات التي تريد تحميلها من الكمبيوتر الخاص بك
          </p>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
          />
        </label>
        {file && (
          <p className="mt-2 text-sm text-green-600 font-medium">
            تم اختيار الملف: {file.name}
          </p>
        )}
      </div>
    </div>
  );
}
