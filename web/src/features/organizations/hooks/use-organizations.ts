import { getOrganizations } from "@/features/organizations/api/get-organizations";
import { useQuery } from "@tanstack/react-query";

export function useOrganizations() {
    return useQuery({
        queryKey: ["organizations"],
        queryFn: getOrganizations,
    });
}
