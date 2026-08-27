import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

export function DashboardPage() {
    const currentUserQuery = useCurrentUser();

    console.log("currentUserQuery:", currentUserQuery);

    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

            <p className="mt-1 text-sm text-muted-foreground">
                Visão geral da operação de atendimento.
            </p>

            <div className="mt-6 rounded-lg border bg-background p-4">
                <p className="font-medium">Estado da query do usuário atual</p>

                <div className="mt-3 space-y-1 text-sm">
                    <p>
                        status: <strong>{currentUserQuery.status}</strong>
                    </p>

                    <p>
                        fetchStatus:{" "}
                        <strong>{currentUserQuery.fetchStatus}</strong>
                    </p>

                    <p>
                        isPending:{" "}
                        <strong>{String(currentUserQuery.isPending)}</strong>
                    </p>

                    <p>
                        isFetching:{" "}
                        <strong>{String(currentUserQuery.isFetching)}</strong>
                    </p>

                    <p>
                        isError:{" "}
                        <strong>{String(currentUserQuery.isError)}</strong>
                    </p>

                    <p>
                        isSuccess:{" "}
                        <strong>{String(currentUserQuery.isSuccess)}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
