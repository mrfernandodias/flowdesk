import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { NotificationPopover } from "./NotificationPopover";
import { ProfileMenu } from "./ProfileMenu";

export function Topbar() {
    return (
        <header
            className="
                sticky top-0 z-30 flex h-16 shrink-0 items-center
                border-b bg-background/95 px-4 backdrop-blur
                sm:px-5
            "
        >
            <div className="flex w-full items-center gap-2.5">
                <div className="flex h-9 shrink-0 items-center gap-2">
                    <SidebarTrigger
                        className="
                            size-9 rounded-md
                            border border-border
                            hover:bg-muted
                        "
                    />

                    <div aria-hidden="true" className="h-4 w-px bg-border" />
                </div>

                <div className="relative hidden w-full max-w-lg md:block">
                    <Search
                        className="
                            absolute left-3 top-1/2 size-4
                            -translate-y-1/2 text-muted-foreground
                        "
                    />

                    <Input
                        placeholder="Buscar tickets, usuários..."
                        className="
                            h-9 rounded-lg
                            border-transparent bg-muted/60 pl-9
                            transition-colors
                            focus-visible:bg-background
                        "
                    />
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <NotificationPopover />

                    <ProfileMenu />
                </div>
            </div>
        </header>
    );
}
