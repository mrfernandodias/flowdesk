import { useState, type ReactNode } from "react";

import { useOrganizations } from "../hooks/use-organizations";
import { OrganizationSelectionContext } from "./organization-selection-context";

type OrganizationSelectionProviderProps = {
    children: ReactNode;
};

export function OrganizationSelectionProvider({ children }: OrganizationSelectionProviderProps) {
    const organizationsQuery = useOrganizations();

    const [selectedOrganizationId, setSelectedOrganizationId] = useState<number | null>(null);

    const organizations = organizationsQuery.data ?? [];

    const effectiveSelectedOrganizationId = selectedOrganizationId ?? organizations[0]?.id ?? null;

    const selectedOrganization =
        organizations.find((organization) => organization.id === effectiveSelectedOrganizationId) ??
        null;

    function selectOrganization(organizationId: number) {
        setSelectedOrganizationId(organizationId);
    }

    return (
        <OrganizationSelectionContext.Provider
            value={{
                selectedOrganization,
                selectOrganization,
            }}
        >
            {children}
        </OrganizationSelectionContext.Provider>
    );
}
