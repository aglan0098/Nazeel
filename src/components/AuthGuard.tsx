// src/components/AuthGuard.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { sidebarData } from "@/data/sidebarData";
import { ImSpinner } from "react-icons/im";

interface AuthGuardProps {
  children: React.ReactNode;
}

const flattenSidebar = (data: any[]) => {
  const paths: { path: string; permission: string }[] = [];

  data.forEach((group) => {
    group.items.forEach((item: any) => {
      if (item.type === "link" && item.permission) {
        paths.push({ path: item.path, permission: item.permission });
      }
      if (item.type === "dropdown" && item.children) {
        item.children.forEach((child: any) => {
          if (child.permission) {
            paths.push({ path: child.path, permission: child.permission });
          }
        });
      }
    });
  });

  return paths;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const flatRoutes = useMemo(() => flattenSidebar(sidebarData), []);

  useEffect(() => {
    if (!loading) {
      // 1) لو اليوزر دخل /login وهو عامل login → رجعه للصفحة الرئيسية
      if (user && pathname === "/login") {
        router.replace("/");
        return;
      }

      // 2) لو اليوزر مش عامل login وحاول يفتح أي صفحة → رجعه للـ login
      if (!user && pathname !== "/login") {
        router.replace("/login");
        return;
      }

      // 3) check على الصلاحيات (بما فيها الصفحات الفرعية)
      if (user) {
        const matchedRoute = flatRoutes.find(
          (route) => pathname.startsWith(route.path) // ⬅️ prefix match
        );

        if (
          matchedRoute &&
          !user.permissions.includes(matchedRoute.permission)
        ) {
          router.replace("/not-authorized");
        }
      }
    }
  }, [user, loading, pathname, router, flatRoutes]);

  if (loading || (!user && pathname !== "/login")) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <ImSpinner className="text-9xl text-main animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};
