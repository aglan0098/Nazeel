const formConfig = [
  {
    name: "type",
    label: "نوع النقل",
    type: "select",
    required: true,
    options: [
      { value: "internal", label: "نقل داخل المنطقة" },
      { value: "external", label: "نقل خارج المنطقة" },
    ],
  },
  //   internal
  {
    name: "prisonName",
    label: "اسم السجن",
    type: "text",
    required: true,
    showIf: { name: "type", value: "internal" },
  },
  {
    name: "dateInternal",
    label: "تاريخ النقل",
    type: "date",
    required: true,
    showIf: { name: "type", value: "internal" },
  },
  //   external
  {
    name: "areaName",
    label: "اسم المنطقة",
    type: "select",
    required: true,
    showIf: { name: "type", value: "external" },
    options: [
      { value: "madina", label: "منطقة المدينة المنورة" },
      { value: "makka", label: "منطقة مكة المكرمة" },
      { value: "qaseem", label: "منطقة القصيم" },
      { value: "haiel", label: "منطقة حائل" },
    ],
  },
  {
    name: "prisonNameExternal",
    label: "اسم السجن",
    type: "text",
    required: true,
    showIf: { name: "type", value: "external" },
  },
  {
    name: "dateExternal",
    label: "تاريخ النقل",
    type: "date",
    required: true,
    showIf: { name: "type", value: "external" },
  },
];

export default formConfig;
