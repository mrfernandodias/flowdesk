import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
    ticketPrioritySchema,
    ticketStatusSchema,
    type Ticket,
} from "@/features/tickets/schemas/ticket-schema";
import { Search, X } from "lucide-react";

type TicketsToolbarProps = {
    status: Ticket["status"] | undefined;
    onStatusChange: (status: Ticket["status"] | undefined) => void;
    priority: Ticket["priority"] | undefined;
    onPriorityChange: (priority: Ticket["priority"] | undefined) => void;
    hasActiveFilters: boolean;
    onClearFilters: () => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
};

export function TicketsToolbar({
    status,
    onStatusChange,
    priority,
    onPriorityChange,
    hasActiveFilters,
    onClearFilters,
    searchValue,
    onSearchChange,
}: TicketsToolbarProps) {
    function handleValueChange(value: string) {
        if (value === "all") {
            onStatusChange(undefined);

            return;
        }

        const result = ticketStatusSchema.safeParse(value);

        if (result.success) {
            onStatusChange(result.data);
        }
    }

    function handlePriorityChange(value: string) {
        if (value === "all") {
            onPriorityChange(undefined);

            return;
        }

        const result = ticketPrioritySchema.safeParse(value);

        if (result.success) {
            onPriorityChange(result.data);
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    type="search"
                    value={searchValue}
                    onChange={(event) => onSearchChange(event.target.value)}
                    maxLength={255}
                    placeholder="Buscar tickets"
                    className="pl-9"
                />
            </div>

            <Select value={status ?? "all"} onValueChange={handleValueChange}>
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>

                    {ticketStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={priority ?? "all"} onValueChange={handlePriorityChange}>
                <SelectTrigger className="w-44">
                    <SelectValue placeholder="Prioridade" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">Todas as prioridades</SelectItem>

                    {ticketPriorityOptions.map((option) => (
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
