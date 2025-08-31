"use client";

import { useRouter } from "next/navigation";
import LayoutWrapper from "../../components/layout/LayoutWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
