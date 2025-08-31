import React from "react";
import { FiCopy } from "react-icons/fi";
import Prison_Info_Card from "@/components/general/Prisoner_Info_Card";
import Request_Info_Card from "@/components/general/Request_Info_Card";
import { prisoners } from "@/data/mockPrisoners";

function page() {
  return (
    <>
      {/* Requwst Details */}
      <Request_Info_Card
        type={"إطلاق سراح سجين"}
        number={34583}
        date={"11/2/2025"}
        area={"الرياض"}
        prison={"الأسم"}
        status={"done"}
      />

      <div className="rounded-xl p-4 border border-gray-300">
        <div className="border border-gray-200 rounded-xl p-3">test</div>

        <h2 className="my-4">تمت الموافقة من:</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 mb-2">
            <p>رقيب أول/ خالد حمود العصيمي</p>
            <span className="text-main text-xl cursor-pointer">
              <FiCopy />
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p>رقيب أول/ خالد حمود العصيمي</p>
            <span className="text-main text-xl cursor-pointer">
              <FiCopy />
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p>رقيب أول/ خالد حمود العصيمي</p>
            <span className="text-main text-xl cursor-pointer">
              <FiCopy />
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p>رقيب أول/ خالد حمود العصيمي</p>
            <span className="text-main text-xl cursor-pointer">
              <FiCopy />
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <p>رقيب أول/ خالد حمود العصيمي</p>
            <span className="text-main text-xl cursor-pointer">
              <FiCopy />
            </span>
          </div>
        </div>
      </div>

      {/* Prison Info */}
      {/* <Prison_Info_Card
        caseName={"اسم القضية"}
        stopDate={"01/01/1997"}
        wingRoom={"ج - 102"}
        status={"داخل السجن - موقوف"}
        name={"محمد"}
        identityNumber={6767843}
        prisonnumber={7690}
        birthDate={"1 / 1 / 2001"}
        tamem={false}
        gender={"ذكر"}
      /> */}

      <Prison_Info_Card data={prisoners[0]} />
    </>
  );
}

export default page;
