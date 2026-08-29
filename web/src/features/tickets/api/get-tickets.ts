import { api } from "@/shared/lib/http/api";

import {
    ticketsResponseSchema,
    type Ticket,
    type TicketsResponse,
} from "../schemas/ticket-schema";

export type GetTicketsParams = {
    organizationId: number;
    page: number;
    status?: Ticket["status"];
    priority?: Ticket["priority"];
    search?: string;
};

export async function getTickets({
    organizationId,
    page,
    status,
    priority,
    search,
}: GetTicketsParams): Promise<TicketsResponse> {
    const response = await api.get(
        `/api/organizations/${organizationId}/tickets`,
        {
            params: {
                page,
                status,
                priority,
                search,
            },
        },
    );

    return ticketsResponseSchema.parse(response.data);
}
