import { useOrganizationSelection } from "@/features/organizations/hooks/use-organization-selection";
import { CreateTicketSheet } from "@/features/tickets/components/CreateTicketSheet";
import { TicketDetailSheet } from "@/features/tickets/components/TicketDetailSheet";
import { TicketsPagination } from "@/features/tickets/components/TicketsPagination";
import { TicketsTable } from "@/features/tickets/components/TicketsTable";
import { TicketsTableSkeleton } from "@/features/tickets/components/TicketsTableSkeleton";
import { TicketsToolbar } from "@/features/tickets/components/TicketToolbar";
import { useTicketFilters } from "@/features/tickets/hooks/use-ticket-filters";
import { useTickets } from "@/features/tickets/hooks/use-tickets";
import { useState } from "react";

type TicketSelection = {
    organizationId: number;
    ticketId: number;
} | null;

export function TicketsPage() {
    const { selectedOrganization } = useOrganizationSelection();
    const organizationId = selectedOrganization?.id ?? null;
    const filters = useTicketFilters();

    const [ticketSelection, setTicketSelection] =
        useState<TicketSelection>(null);

    const selectedTicketId =
        ticketSelection?.organizationId === organizationId
            ? ticketSelection.ticketId
            : null;

    const ticketsQuery = useTickets({
        organizationId,
        page: filters.page,
        status: filters.status,
        priority: filters.priority,
        search: filters.search,
    });

    function handleTicketSelect(ticketId: number) {
        if (organizationId === null) {
            return;
        }

        setTicketSelection({
            organizationId,
            ticketId,
        });
    }

    function handleTicketClose() {
        setTicketSelection(null);
    }

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

    return (
        <div>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Tickets
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Atendimentos de {selectedOrganization.name}.
                    </p>
                </div>

                <CreateTicketSheet
                    organizationId={selectedOrganization.id}
                    organizationName={selectedOrganization.name}
                />
            </div>

            <div className="mt-6">
                <TicketsToolbar
                    status={filters.status}
                    onStatusChange={filters.changeStatus}
                    priority={filters.priority}
                    onPriorityChange={filters.changePriority}
                    hasActiveFilters={filters.hasActiveFilters}
                    onClearFilters={filters.clearFilters}
                    searchValue={filters.searchInput}
                    onSearchChange={filters.changeSearch}
                />
            </div>

            <div className="mt-4">
                {ticketsQuery.isPending ? (
                    <TicketsTableSkeleton />
                ) : ticketsQuery.data ? (
                    <TicketsTable
                        tickets={ticketsQuery.data.data}
                        onTicketSelect={handleTicketSelect}
                    />
                ) : null}
            </div>

            {ticketsQuery.data && (
                <div className="mt-4">
                    <TicketsPagination
                        currentPage={ticketsQuery.data.meta.current_page}
                        lastPage={ticketsQuery.data.meta.last_page}
                        isFetching={ticketsQuery.isFetching}
                        onPageChange={filters.changePage}
                    />
                </div>
            )}

            <TicketDetailSheet
                organizationId={organizationId}
                ticketId={selectedTicketId}
                onClose={handleTicketClose}
            />
        </div>
    );
}
