import React from "react";
// components
import Prisoner_Info_Card from "@/components/general/Prisoner_Info_Card";
// data
import { prisoners } from "@/data/mockPrisoners";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Table from "@/components/general/table/Table";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function prisoner({ params }) {
  const { id } = params;
  const prisonerData = prisoners.find((p) => p.id === id);

  return (
    <>
      <Prisoner_Info_Card data={prisonerData} />

      {/* البيانات الأساسية */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold">
              بيانات التوقف، أمر الإحالة، الملاحظات العامة
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <h2 className="text-md font-bold">بيانات النهاي الطرفية</h2>
              <p className="text-gray-500">الرقم العشري</p>
              <p className="text-gray-500">654857657</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* الحالة الصحية */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          الحالة الصحية
        </h2>
        <p className="p-4 text-xl font-bold">غير مصاب</p>
      </div>

      {/* الحالة الجسدية */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          الحالة الجسدية
        </h2>
        <p className="p-4 text-xl font-bold">غير مصاب</p>
      </div>

      {/* توصيات الطبيب */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          توصويات الطبيب
        </h2>
        <p className="p-4 text-xl font-bold">التوصيات</p>
      </div>

      {/* الأدوية */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          هل السجين يتناول أي أدوية؟
        </h2>
        <p className="p-4 text-xl font-bold">لا</p>
      </div>

      {/* الفحص النفسي */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          الفحص النفسي
        </h2>
        <p className="p-4 text-xl font-bold"></p>
      </div>

      {/* توصيات الطبيب النفسي */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          توصويات الطبيب النفسي
        </h2>
        <p className="p-4 text-xl font-bold"></p>
      </div>

      {/* المرفقات */}
      <div className="bg-[#F4F4F0] p-4">
        <h2 className="text-center text-2xl font-semibold">المرفقات</h2>
        <div className="">files</div>
      </div>

      {/* القضايا والأحكام */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          القضايا والأحكام
        </h2>
        <p className="p-4 text-xl font-bold"></p>
      </div>

      {/* ============= البيانات التفصيلية ============= */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          البيانات التفصيلية
        </h2>
        {/* tabs */}
        <div className="flex w-full flex-col gap-6 my-5">
          <Tabs defaultValue="1" dir="rtl">
            <TabsList className="bg-transparent">
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="1"
              >
                أوامر التمديد
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="2"
              >
                المحاضر
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="3"
              >
                التابعين
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="4"
              >
                السوابق الجنائية
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="5"
              >
                القيود الأمنية
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="6"
              >
                أوامر الإفراج
              </TabsTrigger>
            </TabsList>

            <TabsContent value="1">{/* <Table /> */}</TabsContent>
            <TabsContent value="2" className="p-5">
              المحاضر
            </TabsContent>
            <TabsContent value="3" className="p-5">
              التابعين
            </TabsContent>
            <TabsContent value="4" className="p-5">
              السوابق الجنائية
            </TabsContent>
            <TabsContent value="5" className="p-5">
              القيود الأمنية
            </TabsContent>
            <TabsContent value="6" className="p-5">
              أوامر الإفراج
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* ============= الإجراءات ============= */}
      <div className="border border-gray-200 rounded-2xl px-5 shadow-md my-7">
        <h2 className="text-xl border-b-2 border-gray-200 p-4 text-gray-700">
          الإجراءات
        </h2>
        {/* tabs */}
        <div className="flex w-full flex-col gap-6 my-5">
          <Tabs defaultValue="1" dir="rtl">
            <TabsList className="bg-transparent">
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="1"
              >
                الرعاية
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="2"
              >
                أوامر النقل
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="3"
              >
                المخالفات والعقوبات
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="4"
              >
                القرآن الكريم
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="5"
              >
                الزيارات
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-5 data-[state=active]:border-b-3 data-[state=active]:border-b-main"
                value="6"
              >
                الأمانات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="1">{/* <Table /> */}</TabsContent>

            <TabsContent value="3" className="p-5">
              أوامر النقل
            </TabsContent>
            <TabsContent value="4" className="p-5">
              المخالفات والعقوبات
            </TabsContent>
            <TabsContent value="5" className="p-5">
              القرآن الكريم
            </TabsContent>
            <TabsContent value="6" className="p-5">
              الزيارات
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default prisoner;
