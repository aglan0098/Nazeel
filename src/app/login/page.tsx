import React from "react";

function login() {
  return (
    <div className="h-dvh md:flex bg-[#0F1002] text-white">
      <div className="md:w-1/2 flex flex-col justify-center items-center">
        <div className="bg-red-100">
          <img src="/images/logo.png" className="mb-5" />
          <p className="text-5xl">نزيل</p>
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center items-center">
        <div className="form w-[60%] rounded-4xl h-[70%] p-10 bg-[#252611] flex flex-col items-center justify-center">
          <h2 className="mb-10 text-2xl font-bold">بيانات تسجيل الدخول</h2>
          <form action="">
            <div>
              <input
                type="text"
                name=""
                id=""
                className="bg-[#686A5D] p-4 rounded-4xl outline-0 mb-5"
              />
            </div>

            <div>
              <input
                type="password"
                className="bg-[#686A5D] p-4 rounded-4xl outline-0 mb-5"
              />
            </div>

            <button type="submit" className="bg-[#686A5D] p-4 rounded-4xl">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
