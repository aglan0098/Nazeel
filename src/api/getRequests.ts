import api from "@/lib/axios";

export const getRequests = async (finishedTasks: boolean,) => {
  const reqs = await api.get("RequestApp/GetUserGroupsRequests", {
    params: {
      finishedTasks ,
    },
  });

  return reqs;
};
