"use client";

import Image from "next/image";
// icons
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function UserInfoSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login_test");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-23 left-10 w-80 bg-white shadow-lg transform transition-transform duration-300 z-40 rounded-xl overflow-hidden 
          ${isOpen ? "" : "-translate-x-100"}
          `}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b-1 border-gray-200 p-4 bg-[#F8F4E6]">
            <h2>بيانات المستخدم</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoIosCloseCircleOutline className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Sections */}
          <div className="space-y-4 border-1 border-gray-100 bg-[#F8F4E6]">
            {/* Name */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <div className="border border-amber-600 rounded-full overflow-hidden">
                <Image
                  width={60}
                  height={60}
                  src="/images/profile.png"
                  alt="profile picture"
                  className="scale-125 translate-y-1.5"
                />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 text-md mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500">{user.FullRank}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full p-5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 w-full py-2 px-4 rounded-lg transition-colors bg-red-100 cursor-pointer"
            >
              <CiLogout className="w-5 h-5 mr-2 text-red-500" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600/50 z-30"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}
