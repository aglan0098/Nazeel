"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// icons
import { TbArrowBarToRight, TbArrowBarToLeft } from "react-icons/tb";
import { IoMdArrowDropleft } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { LuFileCog } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { BsGraphUp } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFileDown } from "react-icons/lu";

export default function Sidebar({ isOpen, toggleSidebar }) {
  // Toggle Menus
  const [openMenus, setOpenMenus] = useState([]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    );
  };

  return (
    <>
      <div
        className={`w-60 h-screen fixed top-0 right-0 text-gray-800 bg-gray-50 flex flex-col px-3 py-5 border-l-2 border-gray-100 transition-transform duration-300 z-20 ${
          isOpen ? "translate-x-0" : "translate-x-60"
        }`}
      >
        {/* Sidebar Header */}
        <div className=" relative h-16 p-2 flex items-center gap-5 bg-gray-100 rounded-lg">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} />
          <h2 className="text-md font-bold">نظام منجز</h2>

          {/* toggle button */}
          <button
            onClick={toggleSidebar}
            className={`absolute bg-white text-main p-1 rounded-lg z-30 transition-all duration-300 shadow shadow-gray-300 cursor-pointer ${
              isOpen ? "-left-[35px]" : "-left-[50px]"
            }`}
          >
            {isOpen ? (
              <TbArrowBarToRight className="w-6 h-6" />
            ) : (
              <TbArrowBarToLeft className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto py-5 text-sm text-gray-600">
          <ul className="space-y-2 p-2 text-[15px]">
            <Link href="/">
              <li className="flex items-center gap-3">
                <RxDashboard className="text-xl" />
                لوحة المعلومات
              </li>
            </Link>

            <p className="font-bold text-sm mt-7 mb-3 p-2 text-gray-800">
              القوائم
            </p>

            {/* Menu Items */}
            <li className="mb-4">
              <button
                onClick={() => toggleMenu("dashboard")}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  openMenus.includes("dashboard")
                    ? "bg-main text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LuFileCog className="text-xl" />
                  <span className="ml-3">إدارة الداخلي</span>
                </div>
                <IoMdArrowDropleft
                  className={`${
                    openMenus.includes("dashboard") ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </button>
              {openMenus.includes("dashboard") && (
                <ul className="pr-6 space-y-1 mt-1">
                  <li>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      الرئيسية
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      الإحصائيات
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-4">
              <button
                onClick={() => toggleMenu("users")}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  openMenus.includes("users")
                    ? "bg-main text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <PiUsersThree className="text-xl" />
                  <span className="ml-3">إدارة المستخدمين</span>
                </div>
                <IoMdArrowDropleft
                  className={`${
                    openMenus.includes("users") ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </button>
              {openMenus.includes("users") && (
                <ul className="pr-6 space-y-1 mt-1">
                  <li>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      إدارة المستخدمين
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      إضافة مستخدم
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-4">
              <button
                onClick={() => toggleMenu("reports")}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  openMenus.includes("reports")
                    ? "bg-main text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BsGraphUp className="text-xl" />
                  <span className="ml-3">التقارير</span>
                </div>
                <IoMdArrowDropleft
                  className={`${
                    openMenus.includes("reports") ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </button>
              {openMenus.includes("reports") && (
                <ul className="pr-6 space-y-1 mt-1">
                  <li>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      إدارة المستخدمين
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      إضافة مستخدم
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li className="mb-4">
              <button
                onClick={() => toggleMenu("settings")}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  openMenus.includes("settings")
                    ? "bg-main text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IoSettingsOutline className="text-xl" />
                  <span className="ml-3">الإعدادات</span>
                </div>
                <IoMdArrowDropleft
                  className={`${
                    openMenus.includes("settings") ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </button>
              {openMenus.includes("settings") && (
                <ul className="pr-6 space-y-1 mt-1">
                  <li>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      إعدادات الحساب
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      إعدادات النظام
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <button className="flex items-center gap-4 text-[15px] p-2 bg-red-100 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
          <LuFileDown className="text-xl" />
          <span>تحميل دليل المستخدم</span>
        </button>
      </div>
    </>
  );
}