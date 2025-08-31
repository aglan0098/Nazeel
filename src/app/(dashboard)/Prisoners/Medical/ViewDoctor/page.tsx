"use client";

import React, { useEffect, useState } from "react";
// components
import Prisoner_Info_Card from "@/components/general/Prisoner_Info_Card";
import Pagination from "@/components/general/pagination";
// data
import { prisoners } from "@/data/mockPrisoners";
// dialogs
import { Dialog, DialogPanel } from "@headlessui/react";
// icons
import { TbListSearch } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { FaArrowUpWideShort, FaTrash } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoCaretDownSharp } from "react-icons/io5";
import { BsFillPlusCircleFill } from "react-icons/bs";

function ViewDoctor() {
  // سجين واحد فقط
  const [selectedPrisoner, setSelectedPrisoner] = useState(null);

  // بيانات السجين
  const selectedData = prisoners.find((p) => p.id === selectedPrisoner);

  // فتح قائمة السجناء
  const [openDialog, setOpenDialog] = useState(false);

  // اختيار سجين
  const togglePrisoner = (id) => {
    setSelectedPrisoner((prev) => (prev === id ? null : id));
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const ITEMS_PER_PAGE = 10;

  const fetchTasks = async (page) => {
    try {
      const res = await fetch(
        `/api/tasks?page=${page}&limit=${ITEMS_PER_PAGE}`
      );

      const { data, total } = await res.json();
      setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  // =========== handle form =================
  const [formData, setFormData] = useState({
    section1: {
      hasCondition: null,
      details: [],
    },
    section2: {
      hasCondition: null,
      details: [],
    },
    section3: {
      hasCondition: null,
      details: [],
    },
    section4: {
      hasCondition: null,
      details: [],
    },
  });

  // حالة جديدة للتحكم بين العرض والتعديل
  const [isEditing, setIsEditing] = useState(true); // false = عرض فقط , true = تعديل

  // handle radio change
  const handleRadioChange = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        hasCondition: value,
        details:
          value === "yes" && prev[section].details.length === 0
            ? [{ description: "", severity: "" }] // يضيف أول مجموعة تلقائي
            : value === "no"
            ? [] // لو لا → يمسح التفاصيل
            : prev[section].details,
      },
    }));
  };

  // handle detail change
  const handleDetailChange = (section, index, field, value) => {
    setFormData((prev) => {
      const newDetails = [...prev[section].details];
      newDetails[index] = { ...newDetails[index], [field]: value };
      return {
        ...prev,
        [section]: { ...prev[section], details: newDetails },
      };
    });
  };

  // add new detail
  const addDetail = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        details: [...prev[section].details, { description: "", severity: "" }],
      },
    }));
  };

  // remove detail
  const removeDetail = (section, index) => {
    setFormData((prev) => {
      const newDetails = prev[section].details.filter((_, i) => i !== index);
      return {
        ...prev,
        [section]: { ...prev[section], details: newDetails },
      };
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data to send:", formData);
    // هنا تبعت للباك اند

    setIsEditing(false); // بعد الحفظ يرجع للوضع عرض فقط
  };

  // cancel selection (إلغاء)
  const handleCancel = () => {
    setSelectedPrisoner(null); // يمسح السجين المختار
    setIsEditing(false); // يرجع للوضع عرض فقط
  };

  return (
    <>
      {/* search */}
      <div className="md:flex justify-between items-center border-gray-200 rounded-2xl p-7 shadow-sm my-5">
        <div className="md:flex items-center justify-center gap-5 text-center">
          <input
            type="text"
            placeholder="رقم الهوية"
            className="border border-gray-200 p-3 rounded-2xl outline-0 mb-5 md:mb-0"
          />
          <button className="px-15 py-3 text-main border border-main rounded-2xl cursor-pointer hover:bg-main hover:text-white transition-colors transition-duration-300 mb-5 md:mb-0">
            بحث
          </button>
        </div>

        <div
          className="flex justify-center items-center gap-2 cursor-pointer border border-gray-200 rounded-2xl p-3 text-main hover:bg-main hover:text-white transition-colors transition-duration-300"
          onClick={() => setOpenDialog(true)}
        >
          <TbListSearch className="text-2xl" />
          <p>اختر من قائمة النزلاء</p>
        </div>
      </div>

      {/* Prison Data */}
      {selectedData && <Prisoner_Info_Card data={selectedData} />}

      {/* ===================== [ Form Section ] ===================== */}
      {selectedData && (
        <form onSubmit={handleSubmit}>
          {/* =========== الحالة الصحية =========== */}
          <div className="border border-gray-200 rounded-2xl p-2 shadow-md my-7">
            <h2 className="text-xl border-b-2 border-gray-200 p-3">
              الحالة الصحية
            </h2>
            {isEditing ? (
              <div className="p-4">
                {/* condition */}
                <div className="flex items-center text-xl gap-5 mb-5">
                  <input
                    type="radio"
                    name="health"
                    className="w-5 h-5 accent-main"
                    value="no"
                    checked={formData.section1.hasCondition === "no"}
                    onChange={(e) =>
                      handleRadioChange("section1", e.target.value)
                    }
                  />
                  <label htmlFor="">سليم</label>
                  <input
                    type="radio"
                    name="health"
                    className="w-5 h-5 accent-main"
                    value="yes"
                    checked={formData.section1.hasCondition === "yes"}
                    onChange={(e) =>
                      handleRadioChange("section1", e.target.value)
                    }
                  />
                  <label htmlFor="">مصاب</label>
                </div>

                {/* data */}
                {formData.section1.hasCondition === "yes" && (
                  <>
                    {formData.section1.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-5 my-7 border-b border-gray-300 pb-5"
                      >
                        <div className="grid grid-cols-2 gap-3 items-center w-[90%] md:w-[70%] lg:w-[50%]">
                          {/* تصنيف المرض */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              تصنيف المرض
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={detail.category || ""}
                                onChange={(e) =>
                                  handleDetailChange(
                                    "section1",
                                    index,
                                    "category",
                                    e.target.value
                                  )
                                }
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

                          {/* المرض */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              المرض
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={detail.disease || ""}
                                onChange={(e) =>
                                  handleDetailChange(
                                    "section1",
                                    index,
                                    "disease",
                                    e.target.value
                                  )
                                }
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
                        </div>

                        {/* زرار الحذف */}
                        <button
                          type="button"
                          onClick={() => removeDetail("section1", index)}
                          className="text-2xl text-red-500 hover:bg-text-600 cursor-pointer flex items-center"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addDetail("section1")}
                      className="bg-[#F4F4F0] text-main text-xl px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <BsFillPlusCircleFill className="text-main" />
                      إضافة مرض
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p>for</p>
            )}
          </div>

          {/* =========== الحالة الجسدية =========== */}
          <div className="border border-gray-200 rounded-2xl p-2 shadow-md my-7">
            <h2 className="text-xl border-b-2 border-gray-200 p-3">
              الحالة الجسدية
            </h2>
            {isEditing ? (
              <div className="p-4">
                {/* condition */}
                <div className="flex items-center text-xl gap-5 mb-5">
                  <input
                    type="radio"
                    name="body"
                    className="w-5 h-5 accent-main"
                    value="no"
                    checked={formData.section2.hasCondition === "no"}
                    onChange={(e) =>
                      handleRadioChange("section2", e.target.value)
                    }
                  />
                  <label htmlFor="">سليم</label>
                  <input
                    type="radio"
                    name="body"
                    className="w-5 h-5 accent-main"
                    value="yes"
                    checked={formData.section2.hasCondition === "yes"}
                    onChange={(e) =>
                      handleRadioChange("section2", e.target.value)
                    }
                  />
                  <label htmlFor="">ذوي الإحتياجات الخاصة</label>
                </div>

                {/* data */}
                {formData.section2.hasCondition === "yes" && (
                  <>
                    {formData.section2.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-5 my-7 border-b border-gray-300 pb-5"
                      >
                        <div className="grid grid-cols-3 gap-5 items-center w-[90%] md:w-[80%] lg:w-[70%]">
                          {/* نوع الإعاقة */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              نوع الإعاقة
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={detail.category || ""}
                                onChange={(e) =>
                                  handleDetailChange(
                                    "section2",
                                    index,
                                    "category",
                                    e.target.value
                                  )
                                }
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

                          {/* أجهزة مساعدة */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              أجهزة مساعدة
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={detail.disease || ""}
                                onChange={(e) =>
                                  handleDetailChange(
                                    "section2",
                                    index,
                                    "disease",
                                    e.target.value
                                  )
                                }
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

                          {/* مرافق */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              هل يحتاج الي مرافق
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                className="w-5 h-5 fill-main"
                              />
                            </div>
                          </div>
                        </div>

                        {/* زرار الحذف */}
                        <button
                          type="button"
                          onClick={() => removeDetail("section2", index)}
                          className="text-2xl text-red-500 hover:bg-text-600 cursor-pointer flex items-center"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addDetail("section2")}
                      className="bg-[#F4F4F0] text-main text-xl px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <BsFillPlusCircleFill className="text-main" />
                      إضافة مرض
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p>tttt</p>
            )}
          </div>

          {/* =========== الأدوية =========== */}
          <div className="border border-gray-200 rounded-2xl p-2 shadow-md my-7">
            <h2 className="text-xl border-b-2 border-gray-200 p-3">
              هل النزيل يتناول أي أدويه؟
            </h2>
            {isEditing ? (
              <div className="p-4">
                {/* condition */}
                <div className="flex items-center text-xl gap-5 mb-5">
                  <input
                    type="radio"
                    name="body"
                    className="w-5 h-5 accent-main"
                    value="no"
                    checked={formData.section3.hasCondition === "yes"}
                    onChange={(e) =>
                      handleRadioChange("section3", e.target.value)
                    }
                  />
                  <label htmlFor="">نعم</label>
                  <input
                    type="radio"
                    name="body"
                    className="w-5 h-5 accent-main"
                    value="yes"
                    checked={formData.section3.hasCondition === "no"}
                    onChange={(e) =>
                      handleRadioChange("section3", e.target.value)
                    }
                  />
                  <label htmlFor="">لا</label>
                </div>

                {/* data */}
                {formData.section3.hasCondition === "yes" && (
                  <>
                    {formData.section3.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-5 my-7 border-b border-gray-300 pb-5"
                      >
                        <div className="grid grid-cols-3 gap-5 items-center w-[90%] md:w-[80%] lg:w-[70%]">
                          {/* تصنيف الدواء */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              تصنيف الدواء
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={detail.category || ""}
                                onChange={(e) =>
                                  handleDetailChange(
                                    "section3",
                                    index,
                                    "category",
                                    e.target.value
                                  )
                                }
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

                          {/* الدواء */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              الدواء
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={detail.disease || ""}
                                onChange={(e) =>
                                  handleDetailChange(
                                    "section3",
                                    index,
                                    "disease",
                                    e.target.value
                                  )
                                }
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

                          {/* التركيز */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              التركيز
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative flex items-center">
                              <input
                                type="text"
                                className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
                              />
                            </div>
                          </div>

                          {/* الشكل الصيدلاني */}
                          <div className="mb-5 md:mb-2">
                            <label htmlFor="" className="mb-2 block">
                              الشكل الصيدلاني
                              <span className="text-red-500 mr-2">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={detail.disease || ""}
                                onChange={(e) =>
                                  handleDetailChange(
                                    "section3",
                                    index,
                                    "disease",
                                    e.target.value
                                  )
                                }
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
                        </div>

                        {/* زرار الحذف */}
                        <button
                          type="button"
                          onClick={() => removeDetail("section3", index)}
                          className="text-2xl text-red-500 hover:bg-text-600 cursor-pointer flex items-center"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addDetail("section3")}
                      className="bg-[#F4F4F0] text-main text-xl px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <BsFillPlusCircleFill className="text-main" />
                      إضافة مرض
                    </button>
                  </>
                )}
              </div>
            ) : (
              <p>tttt</p>
            )}
          </div>

          {/* ============ توصيات الطبيب ======== */}
          <div className="border border-gray-200 rounded-2xl p-2 shadow-md my-7">
            <h2 className="text-xl border-b-2 border-gray-200 p-3">
              توصيات الطبيب
            </h2>
            {isEditing ? (
              <div className="relative">
                <select
                  // onChange={(e) =>
                  //   handleDetailChange(
                  //     "section2",

                  //     "category",
                  //     e.target.value
                  //   )
                  // }
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
            ) : (
              <p>ttt</p>
            )}
          </div>

          {/* =========== submit =========== */}
          <div className="my-5 flex gap-5 justify-end">
            <button
              className="py-3 px-7 rounded-md cursor-pointer text-white bg-main"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "حفظ" : "تحديث"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="py-3 px-7 rounded-md cursor-pointer bg-gray-200"
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

      {/* ============= Dialog ============= */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className="relative z-50"
      >
        {/* overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Table Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-xl shadow-xl w-auto min-w-[80%] max-h-[90vh] overflow-hidden p-8">
            <div className="border border-gray-100 rounded-lg p-5 shadow-md">
              {/* search */}
              <div className="bg-gray-100 border border-gray-200 rounded-2xl p-2 w-full sm:w-1/4 flex items-center gap-1 justify-between mb-5">
                <CiSearch className="text-2xl" />
                <input
                  type="text"
                  placeholder="بحث"
                  className="h-6 w-full px-3 focus:outline-0"
                />
              </div>

              {/* table */}
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full divide-y-2 divide-gray-200 border border-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr className="*:text-gray-700 divide-x divide-gray-200">
                      <th className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <p>رقم الهوية</p>
                          <FaArrowUpWideShort />
                        </div>
                      </th>

                      <th className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <p>اسم السجين</p>
                          <FaArrowUpWideShort />
                        </div>
                      </th>

                      <th className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <p>القضية</p>
                          <FaArrowUpWideShort />
                        </div>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <p>ت.الدخول</p>
                          <FaArrowUpWideShort />
                        </div>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <p>ت.الخروج</p>
                          <FaArrowUpWideShort />
                        </div>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <p>حالة السجن</p>
                          <FaArrowUpWideShort />
                        </div>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <p>اختار</p>
                          <FaArrowUpWideShort />
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {prisoners.map((item) => (
                      <tr
                        key={item.id}
                        className="*:text-gray-900 *:first:font-medium divide-x divide-gray-200 text-center"
                      >
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.fullName}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.cases[0].caseType}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.nationality}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.religion}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.gender}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {item.birthDate}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <button
                            className={`p-2 text-xl cursor-pointer ${
                              selectedPrisoner === item.id
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                            onClick={() => togglePrisoner(item.id)}
                          >
                            {selectedPrisoner === item.id ? (
                              <RiDeleteBin6Fill />
                            ) : (
                              <MdAddCircleOutline />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default ViewDoctor;
