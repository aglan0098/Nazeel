"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login: saveToken } = useAuth();
  const mutation = useLogin();

  const [form, setForm] = useState({ UserName: "", Password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { ...form, ReturnUrl: "" },
      {
        onSuccess: (data) => {
          if (data.isSuccess && data.object) {
            saveToken(data.object);
            router.push("/");
          } else {
            alert(data.message || "فشل تسجيل الدخول");
          }
        },
        onError: () => {
          alert("حدث خطأ أثناء تسجيل الدخول");
        },
      }
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen text-white bg-gradient-to-bl from-[#101000] to-[#414334]">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center w-[20%]">
          <img src={"images/logo.png"} className="w-full" />
          <h1 className="mt-5 text-4xl font-semibold">نزيل</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl md:h-[70%] bg-[#252611] p-6 rounded-4xl shadow-md flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl font-bold text-center mb-10">
            بيانات تسجيل الدخول
          </h2>

          <div className="mb-4">
            <input
              type="text"
              id="username"
              className="my-2 w-full p-4 rounded-full bg-[#686A5D] outline-0"
              placeholder="اسم المستخدم"
              value={form.UserName}
              onChange={(e) => setForm({ ...form, UserName: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="my-2 w-full p-4 rounded-full bg-[#686A5D] outline-0"
              placeholder="كلمة المرور"
              value={form.Password}
              onChange={(e) => setForm({ ...form, Password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="bg-[#686A5D] text-white p-4 rounded-full text-xl cursor-pointer"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}
