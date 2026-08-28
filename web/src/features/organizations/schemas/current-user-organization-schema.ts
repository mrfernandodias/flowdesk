import z from "zod";

export const currentUserOrganizationSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    role: z.string(),
});

export const organizationsResponseSchema = z.object({
    data: z.array(currentUserOrganizationSchema),
});

export type CurrentUserOrganization = z.output<typeof currentUserOrganizationSchema>;
