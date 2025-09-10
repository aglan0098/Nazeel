import api from "@/lib/axios";

export const getPrison = async () => {
    const data = await api.get("/Account/GetCurrentPrison")
    return data;
}