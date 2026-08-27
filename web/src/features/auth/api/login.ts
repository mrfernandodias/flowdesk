import type { LoginCredentials } from "@/features/auth/types/login-credentials";
import { api } from "@/shared/lib/http/api";

export async function login(credentials: LoginCredentials): Promise<void> {
    await api.get("/sanctum/csrf-cookie");

    await api.post("/login", credentials);
}
