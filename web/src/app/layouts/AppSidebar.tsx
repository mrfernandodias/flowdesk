import {
    BarChart3,
    LayoutDashboard,
    Settings,
    Ticket,
    Users,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const navigation = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        active: true,
    },
    {
        title: "Tickets",
        icon: Ticket,
    },
    {
        title: "Equipe",
        icon: Users,
    },
    {
        title: "Relatórios",
        icon: BarChart3,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div
                    className="
                        flex h-14 w-full items-center gap-3 px-2
                        group-data-[collapsible=icon]:justify-center
                        group-data-[collapsible=icon]:px-0
                    "
                >
                    <div
                        className="
                            flex size-9 shrink-0 items-center justify-center
                            rounded-md bg-slate-950
                            text-sm font-semibold text-white
                        "
                    >
                        FD
                    </div>

                    <div
                        className="
                            grid flex-1 text-left leading-tight
                            group-data-[collapsible=icon]:hidden
                        "
                    >
                        <span className="truncate text-base font-semibold">
                            FlowDesk
                        </span>

                        <span className="truncate text-xs text-muted-foreground">
                            Service Management
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel
                        className="
                            text-[11px] font-medium uppercase
                            tracking-wider text-muted-foreground/70
                        "
                    >
                        Menu
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => (
                                <SidebarMenuItem
                                    key={item.title}
                                    className="flex w-full justify-center"
                                >
                                    <SidebarMenuButton
                                        asChild
                                        isActive={item.active}
                                        tooltip={item.title}
                                        className="
                                            h-9 w-full rounded-[6px] px-3
                                            hover:bg-muted
                                            data-[active=true]:bg-primary/10
                                            data-[active=true]:font-medium
                                            data-[active=true]:text-primary
                                            group-data-[collapsible=icon]:size-10!
                                            group-data-[collapsible=icon]:justify-center
                                            group-data-[collapsible=icon]:p-0!
                                        "
                                    >
                                        <a href="#">
                                            <item.icon className="size-5 shrink-0" />

                                            <span className="group-data-[collapsible=icon]:hidden">
                                                {item.title}
                                            </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem className="flex w-full justify-center">
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Configurações"
                                    className="
            h-9 w-full rounded-[6px] px-3
            hover:bg-muted
            group-data-[collapsible=icon]:size-10!
            group-data-[collapsible=icon]:justify-center
            group-data-[collapsible=icon]:p-0!
        "
                                >
                                    <a href="#">
                                        <Settings className="size-5 shrink-0" />

                                        <span className="group-data-[collapsible=icon]:hidden">
                                            Configurações
                                        </span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
