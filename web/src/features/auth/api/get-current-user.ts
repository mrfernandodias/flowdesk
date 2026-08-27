import type { CurrentUser } from "@/features/auth/types/current-user";
import { api } from "@/shared/lib/http/api";

export async function getCurrentUser(): Promise<CurrentUser> {
    const response = await api.get<CurrentUser>("/api/me");

    return response.data;
}
