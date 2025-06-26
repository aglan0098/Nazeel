"use client";

import { usePathname } from "next/navigation";
import {
  IoChatbubblesOutline,
  IoNotificationsOutline,
  IoPersonCircle,
} from "react-icons/io5";

function Navbar({ onAvatarClick }) {
  const pathname = usePathname();

  // routes names
  const pageTitles = {
    "/transactions": "الوارد",
    "/add": "إضافة",
  };

  // main title and subtitle
  let mainTitle = "لوحة المعلومات";
  let subtitle = null;

  if (pathname !== "/") {
    mainTitle = pageTitles[pathname] || ""; // Current page name
    subtitle = "لوحة المعلومات";
  }

  return (
    <div className="h-16 py-5 px-6 rounded-lg flex justify-between items-center bg-gray-100">
      <div>
        <h3 className="font-semibold">{mainTitle}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {/* Icons */}
      <div className="flex gap-5 md:gap-9 relative items-center">
        {/* <p className="relative">
          <IoChatbubblesOutline className="text-2xl" />
          <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            5
          </span>
        </p>
        <p className="relative">
          <IoNotificationsOutline className="text-2xl" />
          <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            5
          </span>
        </p> */}
        <p className="relative p-2 bg-white text-main rounded-lg">
          <IoPersonCircle
            className="text-2xl cursor-pointer"
            onClick={onAvatarClick}
          />
        </p>
      </div>
    </div>
  );
}

export default Navbar;