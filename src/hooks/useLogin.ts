// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types/auth";

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/Auth/CreateToken", data);
  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
