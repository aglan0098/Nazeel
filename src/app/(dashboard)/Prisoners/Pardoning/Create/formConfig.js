const formConfig = [
  {
    name: "type",
    label: "نوع العفو",
    type: "select",
    required: true,
    options: [
      { value: "internal", label: "شهر شهرين" },
      { value: "internal", label: "ربع المدة" },
      { value: "royal", label: "ملكي" },
    ],
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

  //   Royal
  {
    name: "pardonNumber",
    label: "رقم العفو",
    type: "text",
    required: true,
    showIf: { name: "type", value: "royal" },
  },
  {
    name: "case",
    label: "القضية",
    type: "select",
    required: true,
    showIf: { name: "type", value: "royal" },
    options: [
      { value: "madina", label: "منطقة المدينة المنورة" },
      { value: "makka", label: "منطقة مكة المكرمة" },
      { value: "qaseem", label: "منطقة القصيم" },
      { value: "haiel", label: "منطقة حائل" },
    ],
  },
  {
    name: "caseType",
    label: "تصنيف القضية",
    type: "select",
    required: true,
    showIf: { name: "type", value: "royal" },
    options: [
      { value: "madina", label: "منطقة المدينة المنورة" },
      { value: "makka", label: "منطقة مكة المكرمة" },
      { value: "qaseem", label: "منطقة القصيم" },
      { value: "haiel", label: "منطقة حائل" },
    ],
  },
];

export default formConfig;
