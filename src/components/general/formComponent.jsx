import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoCaretDownSharp } from "react-icons/io5";

function generateValidationSchema(config) {
  const shape = {};

  config.forEach((field) => {
    let validator;

    // تحديد نوع الفاليديشن الأساسي
    switch (field.type) {
      case "email":
        validator = yup.string().email("البريد الإلكتروني غير صالح");
        break;
      case "number":
        validator = yup
          .number()
          .typeError("يجب إدخال رقم")
          .transform((value, originalValue) =>
            String(originalValue).trim() === "" ? undefined : value
          );
        break;
      default:
        validator = yup.string();
    }

    // شرط الإظهار
    if (field.required) {
      if (field.showIf) {
        validator = validator.when(field.showIf.name, {
          is: (val) => val === field.showIf.value,
          then: (schema) => schema.required("هذا الحقل مطلوب"),
          otherwise: (schema) => schema.notRequired(),
        });
      } else {
        validator = validator.required("هذا الحقل مطلوب");
      }
    }

    shape[field.name] = validator;
  });

  return yup.object().shape(shape);
}

export default function SmartForm({ config, onSubmit }) {
  const schema = generateValidationSchema(config);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const watchedValues = watch();

  // مسح قيم الحقول المخفية
  React.useEffect(() => {
    config.forEach((field) => {
      if (field.showIf) {
        const parentValue = methods.getValues(field.showIf.name);
        const shouldShow = parentValue === field.showIf.value;

        if (!shouldShow && methods.getValues(field.name) !== undefined) {
          setValue(field.name, undefined);
        }
      }
    });
  }, [
    config,
    setValue,
    ...config.filter((f) => f.showIf).map((f) => watch(f.showIf.name)),
  ]);

  const shouldShow = (field) => {
    if (!field.showIf) return true;
    return watchedValues[field.showIf.name] === field.showIf.value;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
          {config.map((field) => {
            if (!shouldShow(field)) return null;

            return (
              <div key={field.name} className="mb-5 md:mb-0">
                <label className="mb-2 block">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 mr-2">*</span>
                  )}
                </label>

                {field.type === "select" ? (
                  <div className="relative">
                    <select
                      {...register(field.name)}
                      className="appearance-none w-full p-4 bg-gray-100 border border-gray-200 rounded-2xl outline-0 text-default"
                    >
                      <option value="">اختر..</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                      <IoCaretDownSharp />
                    </div>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    {...register(field.name)}
                    className="bg-gray-100 border border-gray-200 rounded-2xl text-gray-500 outline-0 p-4 w-full"
                  />
                )}

                {errors[field.name] && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-5 mt-5">
          <button
            type="submit"
            className="bg-main text-white px-18 py-3 rounded-2xl cursor-pointer"
          >
            إرسال
          </button>

          <button
            type="button"
            onClick={() => methods.reset()}
            className="bg-gray-200 px-18 py-3 rounded-2xl cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
