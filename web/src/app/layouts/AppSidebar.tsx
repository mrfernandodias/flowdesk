import {
    BarChart3,
    LayoutDashboard,
    Settings,
    Ticket,
    Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

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
        path: "/dashboard",
    },
    {
        title: "Tickets",
        icon: Ticket,
        path: "/tickets",
    },
    {
        title: "Equipe",
        icon: Users,
        path: "/team",
    },
    {
        title: "Relatórios",
        icon: BarChart3,
        path: "/reports",
    },
];

const settingsItem = {
    title: "Configurações",
    icon: Settings,
    path: "/settings",
};

function isPathActive(currentPath: string, itemPath: string) {
    return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

export function AppSidebar() {
    const location = useLocation();

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
                            {navigation.map((item) => {
                                const isActive = isPathActive(
                                    location.pathname,
                                    item.path,
                                );

                                return (
                                    <SidebarMenuItem
                                        key={item.path}
                                        className="flex w-full justify-center"
                                    >
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
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
                                            <NavLink to={item.path}>
                                                <item.icon className="size-5 shrink-0" />

                                                <span className="group-data-[collapsible=icon]:hidden">
                                                    {item.title}
                                                </span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem className="flex w-full justify-center">
                                <SidebarMenuButton
                                    asChild
                                    isActive={isPathActive(
                                        location.pathname,
                                        settingsItem.path,
                                    )}
                                    tooltip={settingsItem.title}
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
                                    <NavLink to={settingsItem.path}>
                                        <settingsItem.icon className="size-5 shrink-0" />

                                        <span className="group-data-[collapsible=icon]:hidden">
                                            {settingsItem.title}
                                        </span>
                                    </NavLink>
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
