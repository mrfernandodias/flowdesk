import { getTicket } from "@/features/tickets/api/get-ticket";
import { useQuery } from "@tanstack/react-query";

type UseTicketParams = {
    organizationId: number | null;
    ticketId: number | null;
};

export function useTicket({ organizationId, ticketId }: UseTicketParams) {
    return useQuery({
        queryKey: ["ticket", organizationId, ticketId],

        queryFn: () =>
            getTicket({
                organizationId: organizationId!,
                ticketId: ticketId!,
            }),

        enabled: organizationId !== null && ticketId !== null,

        staleTime: 30_000,
    });
}
