import { api } from "@/shared/lib/http/api";

export async function logout(): Promise<void> {
    await api.post("/logout");
}
