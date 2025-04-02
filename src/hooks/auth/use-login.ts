import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/api/services";
import { LoginRequest } from "@/lib/api/types";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { USE_CURRENT_USER_QUERY_KEY } from "./use-current-user";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      setUser(response.data.user, response.data.access_token);
      
      queryClient.setQueryData(USE_CURRENT_USER_QUERY_KEY, {
        user: response.data.user
      });
      
      router.push("/admin/dashboard");
    },
  });
};