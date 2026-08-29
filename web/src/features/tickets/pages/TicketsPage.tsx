import { useState } from "react";

import { useOrganizationSelection } from "@/features/organizations/hooks/use-organization-selection";
import { TicketsPagination } from "@/features/tickets/components/TicketsPagination";
import { TicketsTable } from "@/features/tickets/components/TicketsTable";
import { useTickets } from "@/features/tickets/hooks/use-tickets";

type PaginationState = {
    organizationId: number | null;
    page: number;
};

export function TicketsPage() {
    const { selectedOrganization } = useOrganizationSelection();

    const organizationId = selectedOrganization?.id ?? null;

    const [pagination, setPagination] = useState<PaginationState>({
        organizationId: null,
        page: 1,
    });

    const page = pagination.organizationId === organizationId ? pagination.page : 1;

    const ticketsQuery = useTickets({ organizationId, page });

    function handlePageChange(nextPage: number) {
        setPagination({
            organizationId,
            page: nextPage,
        });
    }

    if (!selectedOrganization) {
        return (
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Nenhuma organização disponível.
                </p>
            </div>
        );
    }

    if (ticketsQuery.isPending && !ticketsQuery.data) {
        return (
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Carregando tickets de {selectedOrganization.name}...
                </p>
            </div>
        );
    }

    if (ticketsQuery.isError) {
        return (
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>

                <p className="mt-1 text-sm text-destructive">
                    Não foi possível carregar os tickets.
                </p>
            </div>
        );
    }

    if (!ticketsQuery.data) {
        return null;
    }

    return (
        <div>
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Atendimentos de {selectedOrganization.name}.
                </p>
            </div>

            <div className="mt-6">
                <TicketsTable tickets={ticketsQuery.data.data} />
            </div>

            <div className="mt-4">
                <TicketsPagination
                    currentPage={ticketsQuery.data.meta.current_page}
                    lastPage={ticketsQuery.data.meta.last_page}
                    isFetching={ticketsQuery.isFetching}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
