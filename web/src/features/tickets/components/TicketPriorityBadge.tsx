import { Badge } from "@/components/ui/badge";
import type { Ticket } from "@/features/tickets/schemas/ticket-schema";

type TicketPriorityBadgeProps = {
    priority: Ticket["priority"];
};

const priorityLabels: Record<Ticket["priority"], string> = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
    urgent: "Urgente",
};

export const TicketPriorityBadge = ({ priority }: TicketPriorityBadgeProps) => {
    return (
        <Badge variant="outline" className="font-medium">
            {priorityLabels[priority]}
        </Badge>
    );
};
