import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="
                    flex items-center gap-2 rounded-md
                    px-2 py-1.5 outline-none
                    transition-colors
                    hover:bg-muted
                    data-[state=open]:bg-muted
                "
            >
                <Avatar className="size-9">
                    <AvatarFallback>FS</AvatarFallback>
                </Avatar>

                <div className="hidden min-w-0 text-left lg:block">
                    <p className="truncate text-sm font-medium">Fernando</p>

                    <p className="truncate text-xs text-muted-foreground">
                        Administrador
                    </p>
                </div>

                <ChevronDown
                    className="
                        hidden size-4 text-muted-foreground
                        lg:block
                    "
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <UserRound />
                    Perfil
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Settings />
                    Configurações
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive">
                    <LogOut />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
