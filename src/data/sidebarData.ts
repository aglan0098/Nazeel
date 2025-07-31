import { RxDashboard } from "react-icons/rx";
import { LuFileCog } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { BsGraphUp } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

export const sidebarData = [
  {
    groupLabel: "الرئيسية",
    items: [
      {
        type: "link",
        label: "لوحة التحكم",
        path: "/",
        icon: RxDashboard,
      },
    ],
  },
  {
    groupLabel: "الطلبات والمهمات",
    items: [
      {
        type: "link",
        label: "طلباتي",
        path: "/Workflow/Requests",
        icon: LuFileCog,
      },
      {
        type: "link",
        label: "مهامي",
        path: "/Workflow/Tasks",
        icon: LuFileCog,
      },
      {
        type: "link",
        label: "الطلبات الخارجية",
        path: "/Integration/ExternalRequests",
        icon: LuFileCog,
      },
    ],
  },
  {
    groupLabel: "قائمة الخدمات",
    items: [
      {
        type: "dropdown",
        id: "receive",
        label: "استلام سجين",
        icon: LuFileCog,
        children: [
          { label: "إجراء إستلام", path: "/Prisoners/Receives/Create" },
          { label: "تسجيل سجين قديم", path: "/Prisoners/Receives/FastCreate" },
          { label: "قائمة الإجراءات", path: "/Prisoners/Receives/Procedures" },
        ],
      },
      {
        type: "dropdown",
        id: "medical",
        label: "الرعاية الصحية",
        icon: PiUsersThree,
        children: [
          { label: "الفحص الطبي", path: "/Prisoners/Medical/ViewDoctor" },
        ],
      },
      {
        type: "dropdown",
        id: "transfer",
        label: "نقل سجين",
        icon: BsGraphUp,
        children: [
          { label: "إجراء نقل", path: "/Prisoners/Transfers/Create" },
          { label: "قائمة الإجراءات", path: "/Prisoners/Transfers" },
        ],
      },
      {
        type: "dropdown",
        id: "pardoning",
        label: "العفو",
        icon: IoSettingsOutline,
        children: [
          { label: "إجراء العفو", path: "#" },
          { label: "قائمة طلبات العفو", path: "#" },
          { label: "قامة طلبات العفو السابقة", path: "#" },
          { label: "الاختبارات", path: "#" },
          { label: "قائمة الاختبارات", path: "#" },
        ],
      },
      {
        type: "dropdown",
        id: "cases",
        label: "القضايا والأحكام",
        icon: IoSettingsOutline,
        children: [{ label: "إضافة", path: "/Prosecution/Case/Create" }],
      },
    ],
  },
];
