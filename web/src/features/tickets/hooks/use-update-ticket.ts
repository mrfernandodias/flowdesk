import { updateTicket } from "@/features/tickets/api/update-ticket";
import type { Ticket } from "@/features/tickets/schemas/ticket-schema";
import type { UpdateTicketData } from "@/features/tickets/schemas/update-ticket-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseUpdateTicketParams = {
    organizationId: number | null;
    ticketId: number | null;
};

export function useUpdateTicket({
    organizationId,
    ticketId,
}: UseUpdateTicketParams) {
    const queryClient = useQueryClient();

    const detailQueryKey = ["ticket", organizationId, ticketId] as const;

    return useMutation({
        mutationFn: (data: UpdateTicketData) => {
            if (organizationId === null || ticketId === null) {
                throw new Error("Organization and ticket are required.");
            }

            return updateTicket({
                organizationId,
                ticketId,
                data,
            });
        },

        onMutate: async (data) => {
            if (organizationId === null || ticketId === null) {
                return;
            }

            await queryClient.cancelQueries({
                queryKey: detailQueryKey,
                exact: true,
            });

            const previousTicket =
                queryClient.getQueryData<Ticket>(detailQueryKey);

            queryClient.setQueryData<Ticket>(
                detailQueryKey,
                (currentTicket) => {
                    if (!currentTicket) {
                        return currentTicket;
                    }

                    return {
                        ...currentTicket,
                        ...data,
                    };
                },
            );

            return {
                previousTicket,
            };
        },

        onError: (_error, _data, context) => {
            if (context?.previousTicket === undefined) {
                return;
            }

            queryClient.setQueryData(detailQueryKey, context.previousTicket);
        },

        onSuccess: async (updatedTicket) => {
            if (organizationId === null || ticketId === null) {
                return null;
            }

            queryClient.setQueryData<Ticket>(
                detailQueryKey,
                (currentTicket) => ({
                    ...currentTicket,
                    ...updatedTicket,
                }),
            );
        },

        onSettled: async () => {
            if (organizationId === null) {
                return;
            }

            await queryClient.invalidateQueries({
                queryKey: ["tickets", organizationId],
            });
        },
    });
}
