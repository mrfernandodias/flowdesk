import { ticketPrioritySchema } from "@/features/tickets/schemas/ticket-schema";
import z from "zod";

export const createTicketSchema = z.object({
    subject: z
        .string()
        .trim()
        .min(3, "Inform um assunto com pelo menos 3 caracteres.")
        .max(255, "O assunto deve ter no máximo 255 caracteres."),

    description: z.string().trim().min(10, "A descrição deve ter pelo menos 10 caracteres."),

    priority: ticketPrioritySchema,
});

export type CreateTicketData = z.output<typeof createTicketSchema>;
