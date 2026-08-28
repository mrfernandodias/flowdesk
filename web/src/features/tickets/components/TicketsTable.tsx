import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TicketPriorityBadge } from "@/features/tickets/components/TicketPriorityBadge";
import { TicketStatusBadge } from "@/features/tickets/components/TicketStatusBadge";
import type { Ticket } from "@/features/tickets/schemas/ticket-schema";

type TicketsTableProps = {
    tickets: Ticket[];
};

export const TicketsTable = ({ tickets }: TicketsTableProps) => {
    if (tickets.length === 0) {
        return (
            <div className="rounded-lg border border-dashed bg-background p-10 text-center">
                <p className="font-medium">Nenhum ticket encontrado</p>

                <div className="mt-1 text-sm text-muted-foreground">
                    Não existem tickets para esta organização.
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border bg-background">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-24">ID</TableHead>
                        <TableHead>Ticket</TableHead>
                        <TableHead className="w-40">Status</TableHead>
                        <TableHead className="w-32">Prioridade</TableHead>
                        <TableHead className="w-44">Atualizado em</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket.id} className="cursor-pointer">
                            <TableCell className="font-medium text-muted-foreground">
                                #{ticket.id}
                            </TableCell>
                            <TableCell>
                                <div className="max-w-xl">
                                    <p className="truncate font-medium">
                                        {ticket.subject}
                                    </p>

                                    <p className="mt-1 truncate text-sm text-muted-foreground">
                                        {ticket.description}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <TicketStatusBadge status={ticket.status} />
                            </TableCell>
                            <TableCell>
                                <TicketPriorityBadge
                                    priority={ticket.priority}
                                />
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {new Date(ticket.updated_at).toLocaleString(
                                    "pt-BR",
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
