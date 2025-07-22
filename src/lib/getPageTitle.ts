// import { sidebarData } from "@/data/sidebarData";
import { sidebarData } from "../data/sidebarData";

export function getPageTitleByPath(pathname) {
  for (const section of sidebarData) {
    for (const item of section.items) {
      if (item.type === "link" && item.path === pathname) {
        return item.label;
      }
      if (item.type === "dropdown") {
        const found = item.children.find((child) => child.path === pathname);
        if (found) return found.label;
      }
    }
  }

  return "لوحة المعلومات";
}
