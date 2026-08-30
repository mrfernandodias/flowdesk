import { useOrganizations } from "@/features/organizations/hooks/use-organizations";
import { Navigate } from "react-router";

export function OrganizationEntryRedirect() {
    const organizationsQuery = useOrganizations();

    if (organizationsQuery.isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Carregando organizações...
                </p>
            </div>
        );
    }

    if (organizationsQuery.isError) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-destructive">
                    Não foi possível carregar suas organizações.
                </p>
            </div>
        );
    }

    const organization = organizationsQuery.data[0];

    if (!organization) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Nenhuma organização disponível.
                </p>
            </div>
        );
    }

    return <Navigate to={`/o/${organization.slug}/dashboard`} />;
}
