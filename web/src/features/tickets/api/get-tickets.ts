import {
    ticketsResponseSchema,
    type TicketResponse,
} from "@/features/tickets/schemas/ticket-schema";
import { api } from "@/shared/lib/http/api";

type GetTicketsParams = {
    organizationId: number;
    page: number;
};

export async function getTickets({
    organizationId,
    page,
}: GetTicketsParams): Promise<TicketResponse> {
    const response = await api.get(
        `/api/organizations/${organizationId}/tickets`,
        {
            params: {
                page,
            },
        },
    );

    return ticketsResponseSchema.parse(response.data);
}
