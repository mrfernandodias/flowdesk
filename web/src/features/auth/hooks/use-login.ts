import { login } from "@/features/auth/api/login";
import type { LoginCredentials } from "@/features/auth/types/login-credentials";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => login(credentials),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["current-user"],
            });
        },
    });
}
