import { getCurrentUser } from "@/features/auth/api/get-current-user";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
        retry: false,
    });
}
