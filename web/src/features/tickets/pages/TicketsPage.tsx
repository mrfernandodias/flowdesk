import { useEffect, useState } from "react";

import { useOrganizationSelection } from "@/features/organizations/hooks/use-organization-selection";
import { TicketsPagination } from "@/features/tickets/components/TicketsPagination";
import { TicketsTable } from "@/features/tickets/components/TicketsTable";
import { useTickets } from "@/features/tickets/hooks/use-tickets";

export function TicketsPage() {
    const [page, setPage] = useState(1);

    const { selectedOrganization } = useOrganizationSelection();

    const ticketsQuery = useTickets(selectedOrganization?.id ?? null, page);

    useEffect(() => {
        setPage(1);
    }, [selectedOrganization?.id]);

    if (!selectedOrganization) {
        return (
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Tickets
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Nenhuma organização disponível.
                </p>
            </div>
        );
    }

    if (ticketsQuery.isPending && !ticketsQuery.data) {
        return (
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Tickets
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Carregando tickets de {selectedOrganization.name}...
                </p>
            </div>
        );
    }

    if (ticketsQuery.isError) {
        return (
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Tickets
                </h1>

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
                <h1 className="text-2xl font-semibold tracking-tight">
                    Tickets
                </h1>

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
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}
