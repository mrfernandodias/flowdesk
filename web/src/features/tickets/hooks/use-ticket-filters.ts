import { useSearchParams } from "react-router";

import { useDebounceValue } from "@/shared/hooks/use-debounce";
import { ticketPrioritySchema, ticketStatusSchema } from "../schemas/ticket-schema";

export function useTicketFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = Number(searchParams.get("page") ?? "1");

    const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

    const statusResult = ticketStatusSchema.safeParse(searchParams.get("status"));

    const status = statusResult.success ? statusResult.data : undefined;

    const priorityResult = ticketPrioritySchema.safeParse(searchParams.get("priority"));

    const priority = priorityResult.success ? priorityResult.data : undefined;

    const searchInput = searchParams.get("search") ?? "";

    const debouncedSearch = useDebounceValue(searchInput.trim(), 400);

    const search = debouncedSearch !== "" ? debouncedSearch : undefined;

    const hasActiveFilters =
        status !== undefined || priority !== undefined || searchInput.trim() !== "";

    function changeParam(
        name: string,
        value: string | undefined,
        options?: {
            replace?: boolean;
        },
    ) {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (value === undefined || value === "") {
            nextSearchParams.delete(name);
        } else {
            nextSearchParams.set(name, value);
        }

        nextSearchParams.delete("page");

        setSearchParams(nextSearchParams, options);
    }

    function changePage(nextPage: number) {
        const nextSearchParams = new URLSearchParams(searchParams);

        if (nextPage === 1) {
            nextSearchParams.delete("page");
        } else {
            nextSearchParams.set("page", String(nextPage));
        }

        setSearchParams(nextSearchParams);
    }

    function changeStatus(nextStatus: typeof status | undefined) {
        changeParam("status", nextStatus);
    }

    function changePriority(nextPriority: typeof priority | undefined) {
        changeParam("priority", nextPriority);
    }

    function changeSearch(value: string) {
        changeParam("search", value, {
            replace: true,
        });
    }

    function clearFilters() {
        const nextSearchParams = new URLSearchParams(searchParams);

        nextSearchParams.delete("status");
        nextSearchParams.delete("priority");
        nextSearchParams.delete("search");
        nextSearchParams.delete("page");

        setSearchParams(nextSearchParams);
    }

    return {
        page,
        status,
        priority,
        search,
        searchInput,
        hasActiveFilters,
        changePage,
        changeStatus,
        changePriority,
        changeSearch,
        clearFilters,
    };
}
