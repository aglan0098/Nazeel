import { RxDashboard } from "react-icons/rx";
import { LuFileCog, LuUserRoundCheck } from "react-icons/lu";
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
        // permission: "Permission.Dashboard.View",
      },
    ],
  },
  {
    groupLabel: "الطلبات والمهمات",
    items: [
      {
        type: "link",
        label: "تيست",
        path: "/test",
        icon: LuFileCog,
        // permission: "Permission.Workflow.Requests.View",
      },
      {
        type: "link",
        label: "طلباتي",
        path: "/Workflow/Requests",
        icon: LuFileCog,
        permission: "Permission.Workflow.Requests.View",
      },
      {
        type: "link",
        label: "مهامي",
        path: "/Workflow/Tasks",
        icon: LuFileCog,
        // permission: "Permission.Workflow.Tasks.View",
      },
      {
        type: "link",
        label: "الطلبات الخارجية",
        path: "/Integration/ExternalRequests",
        icon: LuFileCog,
        // permission: "Permission.Integration.ExternalRequests",
      },
    ],
  },
  {
    groupLabel: "قائمة الخدمات",
    items: [
      {
        type: "dropdown",
        id: "search",
        label: "استعلام",
        icon: LuFileCog,
        children: [
          {
            label: "قائمة النزلاء",
            path: "/Prisoners/List",
            permission: "Permission.Prisoners.List.View",
          },
          {
            label: "بحث شامل",
            path: "/Prisoners/All",
            permission: "Permission.Prisoners.All.View",
          },
        ],
      },
      {
        type: "dropdown",
        id: "receive",
        label: "استلام سجين",
        icon: LuFileCog,
        children: [
          {
            label: "إجراء إستلام",
            path: "/Prisoners/Receives/Create",
            permission: "Permission.PrisonerRelease.Create",
          },
          {
            label: "تسجيل سجين قديم",
            path: "/Prisoners/Receives/FastCreate",
            permission: "Permission.Prisoners.Receives.FastCreate",
          },
          {
            label: "قائمة الإجراءات",
            path: "/Prisoners/Receives/Procedures",
            permission: "Permission.Prisoners.Receives.Procedures.View",
          },
        ],
      },
      {
        type: "dropdown",
        id: "medical",
        label: "الرعاية الصحية",
        icon: PiUsersThree,
        children: [
          {
            label: "الفحص الطبي",
            path: "/Prisoners/Medical/ViewDoctor",
            permission: "Permission.Prisoners.Medical.ViewDoctor",
          },
        ],
      },
      {
        type: "dropdown",
        id: "transfer",
        label: "نقل سجين",
        icon: BsGraphUp,
        children: [
          {
            label: "إجراء نقل",
            path: "/Prisoners/Transfers/Create",
            permission: "Permission.Prisoners.Transfers.Create",
          },
          {
            label: "قائمة الإجراءات",
            path: "/Prisoners/Transfers",
            permission: "Permission.Prisoners.Transfers.View",
          },
        ],
      },
      {
        type: "dropdown",
        id: "pardoning",
        label: "العفو",
        icon: IoSettingsOutline,
        children: [
          {
            label: "إجراء العفو",
            path: "/Prisoners/Pardoning/Create",
            permission: "Permission.Prisoners.Pardoning.Create",
          },
          {
            label: "قائمة طلبات العفو",
            path: "/Prisoners/Pardoning/PardoningList",
            permission: "Permission.Prisoners.Pardoning.List.View",
          },
          {
            label: "قامة طلبات العفو السابقة",
            path: "#",
            permission: "Permission.Prisoners.Pardoning.Previous.View",
          },
          {
            label: "الاختبارات",
            path: "#",
            permission: "Permission.Prisoners.Pardoning.Tests.Create",
          },
          {
            label: "قائمة الاختبارات",
            path: "#",
            permission: "Permission.Prisoners.Pardoning.Tests.View",
          },
        ],
      },
      {
        type: "dropdown",
        id: "cases",
        label: "القضايا والأحكام",
        icon: IoSettingsOutline,
        children: [
          {
            label: "إضافة",
            path: "/Prosecution/Case/Create",
            permission: "Permission.Prosecution.Case.Create",
          },
        ],
      },
      {
        type: "dropdown",
        id: "Release",
        label: "إطلاق سراح",
        icon: LuUserRoundCheck,
        children: [
          {
            label: "إجراء إفراج",
            path: "/Prisoners/Releases/Create",
            permission: "Permission.Prisoners.Releases.Create",
          },
          {
            label: "قائمة طلبات الإفراج",
            path: "#",
            permission: "Permission.Prisoners.Releases.List.View",
          },
          {
            label: "إعادة تسجين",
            path: "#",
            permission: "Permission.Prisoners.Releases.ReImprison",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "إدارة النظام",
    items: [
      {
        type: "dropdown",
        id: "prisons",
        label: "إداره السجون",
        icon: LuFileCog,
        children: [
          {
            label: "السجون",
            path: "/Lookups/Prisons",
            // permission: "Permission.Prisoners.List.View",
          },
          {
            label: "تصنيفات السجون",
            path: "/Lookups/PrisonClassifications",
            // permission: "Permission.Prisoners.All.View",
          },
          {
            label: "أنواع السجون",
            path: "/Lookups/PrisonTypes",
            // permission: "Permission.Prisoners.All.View",
          },
        ],
      },
    ],
  },
];
