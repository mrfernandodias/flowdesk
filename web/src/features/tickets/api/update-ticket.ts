import {
    ticketResponseSchema,
    type Ticket,
} from "@/features/tickets/schemas/ticket-schema";
import type { UpdateTicketData } from "@/features/tickets/schemas/update-ticket-schema";
import { api } from "@/shared/lib/http/api";

type UpdateTicketParams = {
    organizationId: number;
    ticketId: number;
    data: UpdateTicketData;
};

export async function updateTicket({
    organizationId,
    ticketId,
    data,
}: UpdateTicketParams): Promise<Ticket> {
    const response = await api.patch(
        `/api/organizations/${organizationId}/tickets/${ticketId}`,
        data,
    );

    const parsedResponse = ticketResponseSchema.parse(response.data);

    return parsedResponse.data;
}
