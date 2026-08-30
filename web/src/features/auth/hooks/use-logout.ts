import { logout } from "@/features/auth/api/logout";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            queryClient.clear();
        },
    });
}
