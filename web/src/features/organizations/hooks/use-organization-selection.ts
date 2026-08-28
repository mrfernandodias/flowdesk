import { useContext } from "react";

import { OrganizationSelectionContext } from "../context/organization-selection-context";

export function useOrganizationSelection() {
    const context = useContext(OrganizationSelectionContext);

    if (context === undefined) {
        throw new Error(
            "useOrganizationSelection must be used within OrganizationSelectionProvider.",
        );
    }

    return context;
}
