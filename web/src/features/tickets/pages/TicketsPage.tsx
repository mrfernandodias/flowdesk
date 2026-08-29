import { useOrganizationSelection } from "@/features/organizations/hooks/use-organization-selection";
import { TicketsPagination } from "@/features/tickets/components/TicketsPagination";
import { TicketsTable } from "@/features/tickets/components/TicketsTable";
import { TicketsTableSkeleton } from "@/features/tickets/components/TicketsTableSkeleton";
import { TicketsToolbar } from "@/features/tickets/components/TicketToolbar";
import { useTicketFilters } from "@/features/tickets/hooks/use-ticket-filters";
import { useTickets } from "@/features/tickets/hooks/use-tickets";

export function TicketsPage() {
    const { selectedOrganization } = useOrganizationSelection();
    const organizationId = selectedOrganization?.id ?? null;
    const filters = useTicketFilters();

    const ticketsQuery = useTickets({
        organizationId,
        page: filters.page,
        status: filters.status,
        priority: filters.priority,
        search: filters.search,
    });

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

    return (
        <div>
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Atendimentos de {selectedOrganization.name}.
                </p>
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
                    <TicketsTable tickets={ticketsQuery.data.data} />
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
        </div>
    );
}
