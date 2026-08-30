import { CalendarDays, UserRound } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ticketPriorityOptions,
    ticketStatusOptions,
} from "@/features/tickets/constants/ticket-options";
import { useUpdateTicket } from "@/features/tickets/hooks/use-update-ticket";
import {
    ticketPrioritySchema,
    ticketStatusSchema,
} from "@/features/tickets/schemas/ticket-schema";
import { useTicket } from "../hooks/use-ticket";
import { TicketPriorityBadge } from "./TicketPriorityBadge";
import { TicketStatusBadge } from "./TicketStatusBadge";

type TicketDetailSheetProps = {
    organizationId: number | null;
    ticketId: number | null;
    onClose: () => void;
};

function formatDateTime(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

export function TicketDetailSheet({
    organizationId,
    ticketId,
    onClose,
}: TicketDetailSheetProps) {
    const ticketQuery = useTicket({
        organizationId,
        ticketId,
    });

    const updateTicketMutation = useUpdateTicket({
        organizationId,
        ticketId,
    });

    function handleStatusChange(value: string) {
        const result = ticketStatusSchema.safeParse(value);

        if (!result.success) {
            return;
        }

        updateTicketMutation.mutate({
            status: result.data,
        });
    }

    function handlePriorityChange(value: string) {
        const result = ticketPrioritySchema.safeParse(value);

        if (!result.success) {
            return;
        }

        updateTicketMutation.mutate({
            priority: result.data,
        });
    }

    return (
        <Sheet
            open={ticketId !== null}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
                {ticketQuery.isPending && (
                    <>
                        <SheetHeader>
                            <SheetTitle>Carregando ticket...</SheetTitle>

                            <SheetDescription>
                                Aguarde enquanto buscamos os detalhes.
                            </SheetDescription>
                        </SheetHeader>

                        <div className="space-y-5 px-4">
                            <Skeleton className="h-7 w-3/4" />
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-16 w-full" />
                        </div>
                    </>
                )}

                {ticketQuery.isError && (
                    <>
                        <SheetHeader>
                            <SheetTitle>
                                Não foi possível carregar o ticket
                            </SheetTitle>

                            <SheetDescription>
                                Tente novamente em alguns instantes.
                            </SheetDescription>
                        </SheetHeader>
                    </>
                )}

                {ticketQuery.data && (
                    <>
                        <SheetHeader>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>#{ticketQuery.data.id}</span>

                                <TicketStatusBadge
                                    status={ticketQuery.data.status}
                                />

                                <TicketPriorityBadge
                                    priority={ticketQuery.data.priority}
                                />
                            </div>

                            <SheetTitle className="text-xl">
                                {ticketQuery.data.subject}
                            </SheetTitle>

                            <SheetDescription>
                                Detalhes do atendimento.
                            </SheetDescription>
                        </SheetHeader>

                        <div className="space-y-6 px-4">
                            <section>
                                <h3 className="text-sm font-medium">
                                    Descrição
                                </h3>

                                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                    {ticketQuery.data.description}
                                </p>
                            </section>
                            <section>
                                <h3 className="text-sm font-medium">
                                    Atendimento
                                </h3>

                                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-xs text-muted-foreground">
                                            Status
                                        </p>

                                        <Select
                                            value={ticketQuery.data.status}
                                            onValueChange={handleStatusChange}
                                            disabled={
                                                updateTicketMutation.isPending
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {ticketStatusOptions.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs text-muted-foreground">
                                            Prioridade
                                        </p>

                                        <Select
                                            value={ticketQuery.data.priority}
                                            onValueChange={handlePriorityChange}
                                            disabled={
                                                updateTicketMutation.isPending
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {ticketPriorityOptions.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {updateTicketMutation.isError && (
                                    <p className="mt-2 text-sm text-destructive">
                                        Não foi possível atualizar o ticket.
                                    </p>
                                )}
                            </section>

                            <Separator />

                            <section className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <UserRound className="mt-0.5 size-4 text-muted-foreground" />

                                    <div>
                                        {ticketQuery.data.creator ? (
                                            <div className="mt-1">
                                                <p className="text-sm font-medium">
                                                    {
                                                        ticketQuery.data.creator
                                                            .name
                                                    }
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        ticketQuery.data.creator
                                                            .email
                                                    }
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="mt-1 text-sm font-medium">
                                                Usuário #
                                                {ticketQuery.data.created_by}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CalendarDays className="mt-0.5 size-4 text-muted-foreground" />

                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Atualizado em
                                        </p>

                                        <p className="mt-1 text-sm font-medium">
                                            {formatDateTime(
                                                ticketQuery.data.updated_at,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
