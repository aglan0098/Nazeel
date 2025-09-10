"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// icons
import { TbArrowBarToRight, TbArrowBarToLeft } from "react-icons/tb";
import { IoMdArrowDropleft } from "react-icons/io";
import { LuFileDown } from "react-icons/lu";
// data
import { sidebarData } from "@/data/sidebarData";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebartest({ isOpen, toggleSidebar }) {
  // Toggle Menus
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  // filtered sidebar items
  const user = useAuth();
  const filteredItems = sidebarData.map((group) => ({
    ...group,
    items: group.items
      .map((item) => {
        if (item.type === "dropdown") {
          return {
            ...item,
            children: item.children.filter(
              (child) =>
                !child.permission ||
                user?.user.permissions.includes(child.permission)
            ),
          };
        }
        return !item.permission ||
          user?.user.permissions.includes(item.permission)
          ? item
          : null;
      })
      .filter(Boolean),
  }));

  return (
    <div
      className={`w-64 h-screen fixed top-0 right-0 text-gray-800 bg-gray-50 flex flex-col px-3 py-5 border-l-2 border-gray-100 transition-transform duration-300 z-20 ${
        isOpen ? "translate-x-0" : "translate-x-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="relative h-16 p-2 flex items-center gap-5 bg-gray-100 rounded-lg">
        <Image src="/images/logo.png" alt="logo" width={50} height={50} />
        <h2 className="text-md font-bold">نظام نزيل</h2>

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
      <nav className="flex-1 overflow-y-auto text-sm text-gray-600 scrollbar-hide">
        <ul className="space-y-2 p-2 text-[15px]">
          {filteredItems.map((section, index) => (
            <div key={index}>
              <p className="font-bold text-sm mt-5 mb-2 p-2 text-gray-500">
                {section.groupLabel ? section.groupLabel : ""}
              </p>

              {section.items.map((item, idx) => {
                const Icon = item.icon;

                if (item.type === "link") {
                  return (
                    <Link href={item.path} key={idx}>
                      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200">
                        <Icon className="text-xl" />
                        {item.label}
                      </li>
                    </Link>
                  );
                }

                if (item.type === "dropdown") {
                  return (
                    <li key={idx}>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                          openMenu === item.id
                            ? "bg-main text-white"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="text-xl" />
                          <span className="ml-3">{item.label}</span>
                        </div>
                        <IoMdArrowDropleft
                          className={`transition-transform ${
                            openMenu === item.id ? "-rotate-90" : "rotate-0"
                          }`}
                        />
                      </button>

                      {openMenu === item.id && (
                        <ul className="pr-10 mt-1 list-disc">
                          {item.children.map((child, cIdx) => (
                            <li key={cIdx}>
                              <Link
                                href={child.path}
                                className="block p-2 rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return null;
              })}
            </div>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <button className="flex items-center gap-4 text-[15px] p-2 bg-red-100 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
        <LuFileDown className="text-xl" />
        <span>تحميل دليل المستخدم</span>
      </button>
    </div>
  );
}
