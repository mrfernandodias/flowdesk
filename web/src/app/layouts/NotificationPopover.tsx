import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const notifications = [
    {
        id: 1,
        title: "Novo ticket criado",
        description: "Erro ao acessar o painel administrativo.",
        time: "Há 2 min",
    },
    {
        id: 2,
        title: "Ticket atualizado",
        description: "A prioridade foi alterada para urgente.",
        time: "Há 18 min",
    },
];

export function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="
                        relative size-9 rounded-full
                        bg-muted/40 hover:bg-muted
                    "
                    aria-label="Abrir notificações"
                >
                    <Bell className="size-4.5" />

                    <span
                        className="
                            absolute right-1.5 top-1.5
                            size-2 rounded-full
                            bg-red-500 ring-2 ring-background
                        "
                    />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                sideOffset={8}
                className="w-96 overflow-hidden p-0"
            >
                <div className="border-b px-4 py-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Notificações</h3>

                        <span className="text-xs text-muted-foreground">
                            2 novas
                        </span>
                    </div>
                </div>

                <div className="divide-y">
                    {notifications.map((notification) => (
                        <button
                            key={notification.id}
                            type="button"
                            className="
                                w-full px-4 py-3 text-left
                                transition-colors hover:bg-muted/60
                            "
                        >
                            <p className="text-sm font-medium">
                                {notification.title}
                            </p>

                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                {notification.description}
                            </p>

                            <p className="mt-2 text-xs text-muted-foreground">
                                {notification.time}
                            </p>
                        </button>
                    ))}
                </div>

                <div className="border-t p-2">
                    <Button variant="ghost" className="w-full">
                        Ver todas as notificações
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
