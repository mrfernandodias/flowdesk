import { api } from "@/shared/lib/http/api";

import {
    organizationsResponseSchema,
    type CurrentUserOrganization,
} from "../schemas/current-user-organization-schema";

export async function getOrganizations(): Promise<CurrentUserOrganization[]> {
    const response = await api.get("/api/organizations");

    const parsedResponse = organizationsResponseSchema.parse(response.data);

    return parsedResponse.data;
}
