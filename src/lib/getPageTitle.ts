import { sidebarData } from "@/data/sidebarData";

export function getPageTitleByPath(pathname: string) {
  for (const section of sidebarData) {
    for (const item of section.items) {
      if (item.type === "link" && 'path' in item && item.path === pathname) {
        return item.label;
      }
      if (item.type === "dropdown" && 'children' in item) {
        const found = item.children.find((child) => child.path === pathname);
        if (found) return found.label;
      }
    }
  }

  return "لوحة المعلومات";
}
