import { useMutation } from "@tanstack/react-query";
import { authService } from "@/lib/api/services";
import { RegisterRequest } from "@/lib/api/types";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      setUser(response.data.user, response.data.access_token);
      router.push("/admin/dashboard");
    },
  });
};