import { createTicket } from "@/features/tickets/api/create-ticket";
import type { CreateTicketData } from "@/features/tickets/schemas/create-ticket-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTicket(organizationId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTicketData) =>
            createTicket({
                organizationId,
                data,
            }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["tickets", organizationId],
            });
        },
    });
}
