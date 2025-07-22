"use client";

import { usePathname } from "next/navigation";
import { IoPersonCircle } from "react-icons/io5";
import { getPageTitleByPath } from "@/lib/getPageTitle";

function Navbar({ onAvatarClick }) {
  const pathname = usePathname();

  const mainTitle = getPageTitleByPath(pathname);

  return (
    <div className="h-16 py-5 px-6 rounded-lg flex justify-between items-center bg-gray-100">
      <div>
        <h3 className="font-semibold">{mainTitle}</h3>
      </div>

      {/* Icons */}
      <div className="flex gap-5 md:gap-9 relative items-center">
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