import type { Ticket } from "../schemas/ticket-schema";

type TicketStatusOption = {
    value: Ticket["status"];
    label: string;
};

type TicketPriorityOption = {
    value: Ticket["priority"];
    label: string;
};

export const ticketStatusOptions = [
    {
        value: "open",
        label: "Aberto",
    },
    {
        value: "in_progress",
        label: "Em andamento",
    },
    {
        value: "pending",
        label: "Pendente",
    },
    {
        value: "resolved",
        label: "Resolvido",
    },
    {
        value: "closed",
        label: "Fechado",
    },
] satisfies TicketStatusOption[];

export const ticketPriorityOptions = [
    {
        value: "low",
        label: "Baixa",
    },
    {
        value: "medium",
        label: "Média",
    },
    {
        value: "high",
        label: "Alta",
    },
    {
        value: "urgent",
        label: "Urgente",
    },
] satisfies TicketPriorityOption[];

export function getTicketStatusLabel(status: Ticket["status"]): string {
    return ticketStatusOptions.find((option) => option.value === status)?.label ?? status;
}

export function getTicketPriorityLabel(priority: Ticket["priority"]): string {
    return ticketPriorityOptions.find((option) => option.value === priority)?.label ?? priority;
}
