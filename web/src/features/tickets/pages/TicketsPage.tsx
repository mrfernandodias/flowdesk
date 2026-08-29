import { useOrganizationSelection } from "@/features/organizations/hooks/use-organization-selection";
import { TicketsPagination } from "@/features/tickets/components/TicketsPagination";
import { TicketsTable } from "@/features/tickets/components/TicketsTable";
import { TicketsTableSkeleton } from "@/features/tickets/components/TicketsTableSkeleton";
import { TicketsToolbar } from "@/features/tickets/components/TicketToolbar";
import { useTickets } from "@/features/tickets/hooks/use-tickets";
import {
    ticketPrioritySchema,
    ticketStatusSchema,
} from "@/features/tickets/schemas/ticket-schema";
import { useDebounceValue } from "@/shared/hooks/use-debounce";
import { useSearchParams } from "react-router";

export function TicketsPage() {
    const { selectedOrganization } = useOrganizationSelection();
    const [searchParams, setSearchParams] = useSearchParams();

    const organizationId = selectedOrganization?.id ?? null;

    const pageParam = Number(searchParams.get("page") ?? "1");

    const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

    const statusResult = ticketStatusSchema.safeParse(
        searchParams.get("status"),
    );

    const status = statusResult.success ? statusResult.data : undefined;

    const priorityResult = ticketPrioritySchema.safeParse(
        searchParams.get("priority"),
    );

    const priority = priorityResult.success ? priorityResult.data : undefined;

    const searchInput = searchParams.get("search") ?? "";

    const debounceSearch = useDebounceValue(searchInput.trim(), 400);

    const search = debounceSearch !== "" ? debounceSearch : undefined;

    const ticketsQuery = useTickets({
        organizationId,
        page,
        status,
        priority,
        search,
    });

    const hasActiveFilter =
        status !== undefined ||
        priority !== undefined ||
        searchInput.trim() !== "";

    function handlePageChange(nextPage: number) {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (nextPage === 1) {
            nextSearchParams.delete("page");
        } else {
            nextSearchParams.set("page", String(nextPage));
        }

        setSearchParams(nextSearchParams);
    }

    function handleStatusChange(nextStatus: typeof status | undefined) {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (nextStatus) {
            nextSearchParams.set("status", nextStatus);
        } else {
            nextSearchParams.delete("status");
        }

        nextSearchParams.delete("page");

        setSearchParams(nextSearchParams);
    }

    function handlePriorityChange(nextPriority: typeof priority | undefined) {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (nextPriority) {
            nextSearchParams.set("priority", nextPriority);
        } else {
            nextSearchParams.delete("priority");
        }

        nextSearchParams.delete("page");

        setSearchParams(nextSearchParams);
    }

    function handleClearFilters() {
        const nextSearchParams = new URLSearchParams(searchParams);

        nextSearchParams.delete("status");
        nextSearchParams.delete("priority");
        nextSearchParams.delete("page");
        nextSearchParams.delete("search");

        setSearchParams(nextSearchParams);
    }

    function handleSearchChange(value: string) {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (value === "") {
            nextSearchParams.delete("search");
        } else {
            nextSearchParams.set("search", value);
        }

        nextSearchParams.delete("page");

        setSearchParams(nextSearchParams, {
            replace: true,
        });
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
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Tickets
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Atendimentos de {selectedOrganization.name}.
                </p>
            </div>

            <div className="mt-6">
                <TicketsToolbar
                    status={status}
                    onStatusChange={handleStatusChange}
                    priority={priority}
                    onPriorityChange={handlePriorityChange}
                    hasActiveFilters={hasActiveFilter}
                    onClearFilters={handleClearFilters}
                    searchValue={searchInput}
                    onSearchChange={handleSearchChange}
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
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
