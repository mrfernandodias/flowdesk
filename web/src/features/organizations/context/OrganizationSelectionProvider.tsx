import { type ReactNode } from "react";

import { useLocation, useNavigate, useParams } from "react-router";
import { useOrganizations } from "../hooks/use-organizations";
import { OrganizationSelectionContext } from "./organization-selection-context";

type OrganizationSelectionProviderProps = {
    children: ReactNode;
};

export function OrganizationSelectionProvider({
    children,
}: OrganizationSelectionProviderProps) {
    const organizationsQuery = useOrganizations();

    const navigate = useNavigate();
    const location = useLocation();

    const { organizationSlug } = useParams<{
        organizationSlug: string;
    }>();

    const organizations = organizationsQuery.data ?? [];

    const selectedOrganization =
        organizations.find(
            (organization) => organization.slug === organizationSlug,
        ) ?? null;

    function selectOrganization(organizationId: number) {
        const organization = organizations.find(
            (item) => item.id === organizationId,
        );

        if (!organization) {
            return;
        }

        const nextPathname = location.pathname.replace(
            /^\/o\/[^/]+/,
            `/o/${organization.slug}`,
        );

        const nextSearchParams = new URLSearchParams(location.search);

        nextSearchParams.delete("page");

        navigate({
            pathname: nextPathname,
            search: nextSearchParams.toString(),
        });
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
