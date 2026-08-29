import { Badge } from "@/components/ui/badge";
import { getTicketStatusLabel } from "@/features/tickets/constants/ticket-options";
import type { Ticket } from "@/features/tickets/schemas/ticket-schema";

type TicketStatusBadgeProps = {
    status: Ticket["status"];
};

export const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
    return (
        <Badge variant="secondary" className="font-medium">
            {getTicketStatusLabel(status)}
        </Badge>
    );
};
