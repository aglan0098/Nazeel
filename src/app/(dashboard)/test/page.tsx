// src/app/dashboard/page.tsx
"use client";
import { usePrison } from "@/hooks/usePrison";

export default function DashboardPage() {
  const { data, isLoading, error } = usePrison();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  console.log("data", data.data.object.name);
  return (
    <div>
      <p>دي صفحة الداشبورد.</p>
      <p>{data.data.object.name}</p>

      {/* <p>{reqs.data}</p> */}
    </div>
  );
}

// import { getRequests } from "@/api/getRequests";
// import { useQuery } from "@tanstack/react-query";

// export function useRequests() {
//   return useQuery({
//     queryKey: ["rere"],
//     queryFn: () => getRequests(true),
//     staleTime: 1000 * 60,
//     retry: 1,
//   });
// }

// export default function DashboardPage() {
//   // const { data, isLoading, error } = usePrison();
//   // console.log("data", data.data.object.name)

//   const { data, isLoading, error } = useRequests();

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error loading data: {error.message}</p>;
//   }

//   console.log("dadada", data)

//   return (
//     <div>
//       <p>دي صفحة الداشبورد.</p>
//       <p>{data.data}</p>
//     </div>
//   );
// }   
