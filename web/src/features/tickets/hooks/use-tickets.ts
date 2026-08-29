import { useQuery } from "@tanstack/react-query";

import { getTickets, type GetTicketsParams } from "../api/get-tickets";

type UseTicketsParams = Omit<GetTicketsParams, "organizationId"> & {
    organizationId: number | null;
};

export function useTickets({ organizationId, page, status, priority }: UseTicketsParams) {
    return useQuery({
        queryKey: [
            "tickets",
            organizationId,
            {
                page,
                status,
                priority,
            },
        ],

        queryFn: () =>
            getTickets({
                organizationId: organizationId!,
                page,
                status,
                priority,
            }),

        enabled: organizationId !== null,

        staleTime: 30_000,

        placeholderData: (previousData, previousQuery) => {
            const previousOrganizationId = previousQuery?.queryKey[1];

            if (previousOrganizationId !== organizationId) {
                return undefined;
            }

            return previousData;
        },
    });
}
