import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { useNavigate } from "react-router";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useLogout } from "@/features/auth/hooks/use-logout";

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();
}

export function ProfileMenu() {
    const navigate = useNavigate();

    const currentUserQuery = useCurrentUser();
    const logoutMutation = useLogout();

    const currentUser = currentUserQuery.data;

    async function handleLogout() {
        try {
            await logoutMutation.mutateAsync();

            navigate("/login", {
                replace: true,
            });
        } catch {
            // O erro está disponível em logoutMutation.error.
        }
    }

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
                    <AvatarFallback>
                        {currentUser ? getInitials(currentUser.name) : "--"}
                    </AvatarFallback>
                </Avatar>

                <div className="hidden min-w-0 text-left lg:block">
                    <p className="truncate text-sm font-medium">{currentUser?.name ?? "Usuário"}</p>

                    <p className="truncate text-xs text-muted-foreground">
                        {currentUser?.email ?? ""}
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

                <DropdownMenuItem
                    variant="destructive"
                    disabled={logoutMutation.isPending}
                    onSelect={() => {
                        void handleLogout();
                    }}
                >
                    <LogOut />

                    {logoutMutation.isPending ? "Saindo..." : "Sair"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
