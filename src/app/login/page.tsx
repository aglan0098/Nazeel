import React from "react";

function login() {
  return (
    <div className="h-dvh md:flex bg-[#0F1002] text-white">
      <div className="w-1/2 flex flex-col justify-center items-center bg-red-100">
        <div className="mb-5">
          <img src="/images/logo.png" />
        </div>
        <p className="text-5xl">نزيل</p>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="form rounded-lg h-[70%] p-10 bg-[#252611] flex items-center justify-center">
          <h2>بيانات تسجيل الدخول</h2>
          <form action="" className="bg-white">
            <div>
              <input type="text" name="" id="" />
            </div>

            <div>
              <input type="password" />
            </div>

            <button type="submit">تسجيل الدخول</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
