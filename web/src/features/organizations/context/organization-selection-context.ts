import { createContext } from "react";

import type { CurrentUserOrganization } from "../schemas/current-user-organization-schema";

export type OrganizationSelectionContextValue = {
    selectedOrganization: CurrentUserOrganization | null;
    selectOrganization: (organizationId: number) => void;
};

export const OrganizationSelectionContext = createContext<
    OrganizationSelectionContextValue | undefined
>(undefined);
