// src/app/not-authorized/page.tsx
import Link from "next/link";

export default function NotAuthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-5">غير مسموح 🚫</h1>
      <p className="text-xl mb-6">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
      <Link
        href="/"
        className="text-lg px-5 py-3 bg-main text-white rounded-lg"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
