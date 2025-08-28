"use client";

import React, { useState } from "react";
import Request_Info_Card from "@/components/general/Request_Info_Card";
import Prisoner_Info_Card from "@/components/general/Prisoner_Info_Card";
import { prisoners } from "@/data/mockPrisoners";
// icons
import { IoCaretDownSharp } from "react-icons/io5";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { HiMiniEye } from "react-icons/hi2";

function page() {
  // State for all form fields
  const [formData, setFormData] = useState({
    releaseOrderNumber: "",
    releaseReason: "",
    subReleaseReason: "",
    classification: "",
    orderDate: "",
    releaseDate: "",
    receivingOrganization: "",
    file: null,
  });

  // toggle whether it’s an external transfer or not
  const [external, setExternal] = useState(false);

  const handleToggle = () => {
    setExternal((prev) => !prev);
  };

  // Update state for each input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the file input
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData instance if you plan to send file data
    const dataToSend = new FormData();
    dataToSend.append("releaseOrderNumber", formData.releaseOrderNumber);
    dataToSend.append("releaseReason", formData.releaseReason);
    dataToSend.append("subReleaseReason", formData.subReleaseReason);
    dataToSend.append("classification", formData.classification);
    dataToSend.append("orderDate", formData.orderDate);
    dataToSend.append("releaseDate", formData.releaseDate);
    dataToSend.append("external", external);
    if (external) {
      dataToSend.append(
        "receivingOrganization",
        formData.receivingOrganization
      );
    }
    if (formData.file) {
      dataToSend.append("file", formData.file);
    }

    try {
      const response = await fetch("API_ENDPOINT", {
        method: "POST",
        body: dataToSend,
      });
      // Handle API response here
      console.log("API Response:", response);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <>
      {/* Requwst Details */}
      <Request_Info_Card
        type={"إطلاق سراح سجين"}
        number={34583}
        date={"11/2/2025"}
        area={"الرياض"}
        prison={"الأسم"}
        status={""}
      />

      {/* Prison Info */}
      <Prisoner_Info_Card data={prisoners[0]} />

      {/* القضايا */}
      <div className="border border-gray-200 rounded-2xl p-5 shadow-md mb-7">
        <h3 className="mb-8 text-xl">القضايا</h3>

        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full divide-y-2 divide-gray-200 border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr className="*:text-gray-700 divide-x divide-gray-200">
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>تسلسل</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>

                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>رقم القضية</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>

                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>نوع القضية</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>

                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>تاريخ القضية</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>

                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>الأحكام</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <p>المحكومية</p>
                    <FaArrowUpWideShort />
                  </div>
                </th>
                <th className="px-3 py-2 whitespace-nowrap"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {/* {cases.map((item) => ( */}
              <tr
                //   key={item.id}
                className="*:text-gray-900 *:first:font-medium divide-x divide-gray-200 text-center"
              >
                <td className="px-3 py-2 whitespace-nowrap">1</td>
                <td className="px-3 py-2 whitespace-nowrap">4453</td>

                <td className="px-3 py-2 whitespace-nowrap">
                  الأسلحة والمتفجرات
                </td>
                <td className="px-3 py-2 whitespace-nowrap">10/3/2024</td>
                <td className="px-3 py-2 whitespace-nowrap">3 عقوبات</td>
                <td className="px-3 py-2 whitespace-nowrap">3 سنوات</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button className="cursor-pointer text-gray-400 text-2xl">
                    <HiMiniEye />
                  </button>
                </td>
              </tr>
              <tr
                //   key={item.id}
                className="*:text-gray-900 *:first:font-medium divide-x divide-gray-200 text-center"
              >
                <td className="px-3 py-2 whitespace-nowrap">2</td>
                <td className="px-3 py-2 whitespace-nowrap">4453</td>

                <td className="px-3 py-2 whitespace-nowrap">
                  الأسلحة والمتفجرات
                </td>
                <td className="px-3 py-2 whitespace-nowrap">10/3/2024</td>
                <td className="px-3 py-2 whitespace-nowrap">3 عقوبات</td>
                <td className="px-3 py-2 whitespace-nowrap">3 سنوات</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button className="cursor-pointer text-gray-400 text-2xl">
                    <HiMiniEye />
                  </button>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </div>

      {/* بيانات الإفراج */}
      <form action="" onSubmit={handleSubmit}>
        <div className="border border-gray-200 rounded-2xl p-5 shadow-md">
          <h3 className="mb-8 text-xl">بيانات الإفراج</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
            <div className="mb-5 md:mb-0">
              <label htmlFor="" className="mb-2 block">
                رقم أمر الإفراج
                <span className="text-red-500 mr-2">*</span>
              </label>
              <input
                type="text"
                name="releaseOrderNumber"
                value={formData.releaseOrderNumber}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
              />
            </div>
            <div className="mb-5 md:mb-0">
              <label htmlFor="" className="mb-2 block">
                سبب الإفراج
                <span className="text-red-500 mr-2">*</span>
              </label>
              <div className="relative">
                <select
                  name="releaseReason"
                  value={formData.releaseReason}
                  onChange={handleChange}
                  className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
                >
                  <option value="">اختر..</option>
                  <option value="option1">Option One</option>
                  <option value="option2">Option Two</option>
                  <option value="option3">Option Three</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <IoCaretDownSharp />
                </div>
              </div>
            </div>
            <div className="mb-5 md:mb-0">
              <label htmlFor="" className="mb-2 block">
                سبب الإفراج الفرعي
                <span className="text-red-500 mr-2">*</span>
              </label>
              <div className="relative">
                <select
                  name="subReleaseReason"
                  value={formData.subReleaseReason}
                  onChange={handleChange}
                  className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
                >
                  <option value="">اختر..</option>
                  <option value="option1">Option One</option>
                  <option value="option2">Option Two</option>
                  <option value="option3">Option Three</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <IoCaretDownSharp />
                </div>
              </div>
            </div>
            <div className="mb-5 md:mb-0">
              <label htmlFor="" className="mb-2 block">
                تصنيف سبب الإفراج الفرعي
                <span className="text-red-500 mr-2">*</span>
              </label>
              <div className="relative">
                <select
                  name="classification"
                  value={formData.classification}
                  onChange={handleChange}
                  className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
                >
                  <option value="">اختر..</option>
                  <option value="option1">Option One</option>
                  <option value="option2">Option Two</option>
                  <option value="option3">Option Three</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <IoCaretDownSharp />
                </div>
              </div>
            </div>
            <div className="mb-5 md:mb-0">
              <label htmlFor="" className="mb-2 block">
                تاريخ الأمر
                <span className="text-red-500 mr-2">*</span>
              </label>
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
              />
            </div>
            <div className="mb-5 md:mb-0">
              <label htmlFor="" className="mb-2 block">
                تاريخ إطلاق السراح
                <span className="text-red-500 mr-2">*</span>
              </label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
              />
            </div>
            <div className="mb-5 md:mb-0">
              <label htmlFor="" className="mb-2 block">
                تسليم السجين لجهة أخري
                <span className="text-red-500 mr-2">*</span>
              </label>
              <div className="flex justify-center items-center h-fit">
                <label
                  htmlFor="AcceptConditions"
                  className="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-main"
                >
                  <input
                    type="checkbox"
                    id="AcceptConditions"
                    className="peer sr-only"
                    checked={external}
                    onChange={handleToggle}
                  />

                  <span className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>

            {external && (
              <div className="mb-5 md:mb-0">
                <label htmlFor="" className="mb-2 block">
                  اسم الجهة المستلمة
                  <span className="text-red-500 mr-2">*</span>
                </label>
                <div className="relative">
                  <select
                    name="receivingOrganization"
                    value={formData.receivingOrganization}
                    onChange={handleChange}
                    className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
                  >
                    <option value="">اختر..</option>
                    <option value="option1">Option One</option>
                    <option value="option2">Option Two</option>
                    <option value="option3">Option Three</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <IoCaretDownSharp />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="my-5 md:mb-0">
            <label htmlFor="" className="mb-2 block">
              إرفاق ملف الإفراج
              <span className="text-red-500 mr-2">*</span>
            </label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full cursor-pointer h-30"
              placeholder="تصفح واختر الملفات التي تريد تحملها من الكمبيوتر الخاص بك"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-main text-white px-18 py-3 rounded-2xl mt-5 cursor-pointer"
          >
            إفراج
          </button>
        </div>
      </form>
    </>
  );
}

export default page;
