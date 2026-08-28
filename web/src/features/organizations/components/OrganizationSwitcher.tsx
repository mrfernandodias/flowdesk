import { Building2, Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrganizationSelection } from "@/features/organizations/hooks/use-organization-selection";
import { useOrganizations } from "@/features/organizations/hooks/use-organizations";

export function OrganizationSwitcher() {
    const organizationsQuery = useOrganizations();

    const { selectedOrganization, selectOrganization } = useOrganizationSelection();

    const organizations = organizationsQuery.data ?? [];

    if (organizationsQuery.isPending) {
        return (
            <Button variant="ghost" className="h-9 gap-2" disabled>
                <Building2 className="size-4" />

                <span className="hidden sm:inline">Carregando...</span>
            </Button>
        );
    }

    if (organizationsQuery.isError) {
        return (
            <Button variant="ghost" className="h-9 gap-2" disabled>
                <Building2 className="size-4" />

                <span className="hidden sm:inline">Organizações indisponíveis</span>
            </Button>
        );
    }

    if (!selectedOrganization) {
        return (
            <Button variant="ghost" className="h-9 gap-2" disabled>
                <Building2 className="size-4" />

                <span className="hidden sm:inline">Sem organização</span>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="
                        h-9 max-w-56 justify-between
                        gap-2 rounded-md px-2.5
                    "
                >
                    <Building2 className="size-4 shrink-0 text-muted-foreground" />

                    <span className="hidden truncate font-medium sm:block">
                        {selectedOrganization.name}
                    </span>

                    <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>Organização</DropdownMenuLabel>

                <DropdownMenuSeparator />

                {organizations.map((organization) => {
                    const isSelected = organization.id === selectedOrganization.id;

                    return (
                        <DropdownMenuItem
                            key={organization.id}
                            onSelect={() => selectOrganization(organization.id)}
                            className="flex items-center gap-2"
                        >
                            <Building2 className="size-4 text-muted-foreground" />

                            <div className="min-w-0 flex-1">
                                <p className="truncate">{organization.name}</p>

                                <p className="truncate text-xs text-muted-foreground">
                                    {organization.role}
                                </p>
                            </div>

                            {isSelected && <Check className="size-4" />}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
