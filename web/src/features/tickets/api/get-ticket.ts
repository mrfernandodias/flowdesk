import {
    ticketResponseSchema,
    type Ticket,
} from "@/features/tickets/schemas/ticket-schema";
import { api } from "@/shared/lib/http/api";

type GetTicketParams = {
    organizationId: number;
    ticketId: number;
};

export async function getTicket({
    organizationId,
    ticketId,
}: GetTicketParams): Promise<Ticket> {
    const response = await api.get(
        `/api/organizations/${organizationId}/tickets/${ticketId}`,
    );

    const parsedResponse = ticketResponseSchema.parse(response.data);

    return parsedResponse.data;
}
