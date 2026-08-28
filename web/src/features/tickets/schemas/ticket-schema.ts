import z from "zod";

export const ticketStatusSchema = z.enum([
    "open",
    "in_progress",
    "pending",
    "resolved",
    "closed",
]);

export const ticketPrioritySchema = z.enum(["low", "medium", "high", "urgent"]);

export const ticketSchema = z.object({
    id: z.number(),
    organization_id: z.number(),
    created_by: z.number(),
    subject: z.string(),
    description: z.string(),
    status: ticketStatusSchema,
    priority: ticketPrioritySchema,
    created_at: z.string(),
    updated_at: z.string(),
});

export const ticketsResponseSchema = z.object({
    data: z.array(ticketSchema),

    meta: z.object({
        current_page: z.number(),
        last_page: z.number(),
        per_page: z.number(),
        total: z.number(),
    }),
});

export type Ticket = z.output<typeof ticketSchema>;

export type TicketResponse = z.output<typeof ticketsResponseSchema>;
