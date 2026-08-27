import { Navigate, Route, Routes } from "react-router";

import { AppShell } from "@/app/layouts/AppShell";
import { RequireAuth } from "@/features/auth/components/RequireAuth";
import { RequireGuest } from "@/features/auth/components/RequireGuest";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ReportsPage } from "@/features/reports/pages/ReportsPage";
import { SettingsPage } from "@/features/settings/pages/SettingsPage";
import { TeamPage } from "@/features/team/pages/TeamPage";
import { TicketsPage } from "@/features/tickets/pages/TicketsPage";

export function AppRouter() {
    return (
        <Routes>
            <Route element={<RequireGuest />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route element={<AppShell />}>
                    <Route path="/dashboard" element={<DashboardPage />} />

                    <Route path="/tickets" element={<TicketsPage />} />

                    <Route path="/team" element={<TeamPage />} />

                    <Route path="/reports" element={<ReportsPage />} />

                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
