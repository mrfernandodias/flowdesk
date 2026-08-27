import type { CSSProperties } from "react";
import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

export function AppShell() {
    return (
        <SidebarProvider
            defaultOpen
            style={
                {
                    "--sidebar-width": "16rem",
                    "--sidebar-width-icon": "4.5rem",
                } as CSSProperties
            }
        >
            <AppSidebar />

            <SidebarInset className="bg-slate-50">
                <Topbar />

                <main className="flex-1 p-4 sm:p-6 lg:p-7">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
