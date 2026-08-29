import type { CreateTicketData } from "@/features/tickets/schemas/create-ticket-schema";
import { ticketResponseSchema, type Ticket } from "@/features/tickets/schemas/ticket-schema";
import { api } from "@/shared/lib/http/api";

type CreateTicketParams = {
    organizationId: number;
    data: CreateTicketData;
};

export async function createTicket({ organizationId, data }: CreateTicketParams): Promise<Ticket> {
    const response = await api.post(`/api/organizations/${organizationId}/tickets`, data);

    const parsedResponse = ticketResponseSchema.parse(response.data);

    return parsedResponse.data;
}
