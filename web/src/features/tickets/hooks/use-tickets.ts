import { getTickets } from "@/features/tickets/api/get-tickets";
import { useQuery } from "@tanstack/react-query";

export function useTickets(organizationId: number | null, page: number) {
    return useQuery({
        queryKey: ["tickets", organizationId, page],

        queryFn: () => getTickets({ organizationId: organizationId!, page }),

        enabled: organizationId !== null,

        staleTime: 30_000,

        placeholderData: (previousData) => previousData,
    });
}
