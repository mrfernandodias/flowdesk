import { Badge } from "@/components/ui/badge";
import type { Ticket } from "@/features/tickets/schemas/ticket-schema";

type TicketStatusBadgeProps = {
    status: Ticket["status"];
};

const statusLabels: Record<Ticket["status"], string> = {
    open: "Aberto",
    in_progress: "Em andamento",
    pending: "Pendente",
    resolved: "Resolvido",
    closed: "Fechado",
};

export const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
    return (
        <Badge variant="secondary" className="font-medium">
            {statusLabels[status]}
        </Badge>
    );
};
