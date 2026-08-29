import { Badge } from "@/components/ui/badge";
import { getTicketPriorityLabel } from "@/features/tickets/constants/ticket-options";
import type { Ticket } from "@/features/tickets/schemas/ticket-schema";

type TicketPriorityBadgeProps = {
    priority: Ticket["priority"];
};

export const TicketPriorityBadge = ({ priority }: TicketPriorityBadgeProps) => {
    return (
        <Badge variant="outline" className="font-medium">
            {getTicketPriorityLabel(priority)}
        </Badge>
    );
};
