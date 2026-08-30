import {
    ticketPrioritySchema,
    ticketStatusSchema,
} from "@/features/tickets/schemas/ticket-schema";
import z from "zod";

export const updateTicketSchema = z.object({
    status: ticketStatusSchema.optional(),
    priority: ticketPrioritySchema.optional(),
});

export type UpdateTicketData = z.output<typeof updateTicketSchema>;
