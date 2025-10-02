// utils/myAxiosFetchFn.ts
import api from "@/lib/axios";

type Params = {
  page: number;
  pageSize: number;
  search: string;
};

export async function myAxiosFetchFn(endpoint: string, params: Params) {
  // تجهيز البراميترز اللي الباك اند بيستقبلها
  const form = new FormData();
  form.append("page", String(params.page));
  form.append("pageSize", String(params.pageSize));
  form.append("search", params.search);

  const res = await api.post(endpoint, form);

  // لازم الريسبونس ييجي بنفس الشكل:
  // {
  //   draw?,
  //   data: Row[],
  //   recordsTotal,
  //   recordsFiltered?
  // }
  return res.data;
}
