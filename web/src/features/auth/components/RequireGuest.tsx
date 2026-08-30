import axios from "axios";
import { Navigate, Outlet } from "react-router";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

export function RequireGuest() {
    const currentUserQuery = useCurrentUser();

    if (currentUserQuery.isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-sm text-muted-foreground">
                    Verificando autenticação...
                </p>
            </div>
        );
    }

    if (currentUserQuery.isSuccess) {
        return <Navigate to="/" replace />;
    }

    const isUnauthorized =
        axios.isAxiosError(currentUserQuery.error) &&
        currentUserQuery.error.response?.status === 401;

    if (isUnauthorized) {
        return <Outlet />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="text-center">
                <p className="font-medium">
                    Não foi possível verificar sua sessão.
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                    Tente novamente em alguns instantes.
                </p>
            </div>
        </div>
    );
}
