import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Ticket } from "@/features/tickets/schemas/ticket-schema";
import { X } from "lucide-react";

type TicketsToolbarProps = {
    status: Ticket["status"] | undefined;
    onStatusChange: (status: Ticket["status"] | undefined) => void;
    priority: Ticket["priority"] | undefined;
    onPriorityChange: (priority: Ticket["priority"] | undefined) => void;
    hasActiveFilters: boolean;
    onClearFilters: () => void;
};

const statusOptions: Array<{
    value: Ticket["status"];
    label: string;
}> = [
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
];

const priorityOptions: Array<{
    value: Ticket["priority"];
    label: string;
}> = [
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
];

export function TicketsToolbar({
    status,
    onStatusChange,
    priority,
    onPriorityChange,
    hasActiveFilters,
    onClearFilters,
}: TicketsToolbarProps) {
    function handleValueChange(value: string) {
        if (value === "all") {
            onStatusChange(undefined);

            return;
        }

        onStatusChange(value as Ticket["status"]);
    }

    function handlePriorityChange(value: string) {
        if (value === "all") {
            onPriorityChange(undefined);

            return;
        }

        onPriorityChange(value as Ticket["priority"]);
    }

    return (
        <div className="flex items-center gap-3">
            <Select value={status ?? "all"} onValueChange={handleValueChange}>
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>

                    {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={priority ?? "all"}
                onValueChange={handlePriorityChange}
            >
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Prioridade" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">Todas as prioridades</SelectItem>

                    {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {hasActiveFilters && (
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="gap-1.5 text-muted-foreground"
                >
                    <X className="size-4" />
                    Limpar filtros
                </Button>
            )}
        </div>
    );
}
