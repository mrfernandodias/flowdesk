import { useQuery } from "@tanstack/react-query";

import { getTickets, type GetTicketsParams } from "../api/get-tickets";

type UseTicketsParams = Omit<GetTicketsParams, "organizationId"> & {
    organizationId: number | null;
};

export function useTickets({
    organizationId,
    page,
    status,
    priority,
    search,
}: UseTicketsParams) {
    return useQuery({
        queryKey: [
            "tickets",
            organizationId,
            {
                page,
                status,
                priority,
                search,
            },
        ],

        queryFn: () =>
            getTickets({
                organizationId: organizationId!,
                page,
                status,
                priority,
                search,
            }),

        enabled: organizationId !== null,

        staleTime: 30_000,

        placeholderData: (previousData, previousQuery) => {
            const previousOrganizationId = previousQuery?.queryKey[1];
            const previousFilter = previousQuery?.queryKey[2] as
                | {
                      status?: unknown;
                      priority?: unknown;
                      search?: unknown;
                  }
                | undefined;

            if (
                previousOrganizationId !== organizationId ||
                previousFilter?.status !== status ||
                previousFilter?.priority !== priority ||
                previousFilter?.search !== search
            ) {
                return undefined;
            }

            return previousData;
        },
    });
}
