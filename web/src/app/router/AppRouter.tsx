import { Navigate, Route, Routes } from "react-router";

import { AppShell } from "@/app/layouts/AppShell";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { ReportsPage } from "@/features/reports/pages/ReportsPage";
import { SettingsPage } from "@/features/settings/pages/SettingsPage";
import { TeamPage } from "@/features/team/pages/TeamPage";
import { TicketsPage } from "@/features/tickets/pages/TicketsPage";

export function AppRouter() {
    return (
        <Routes>
            <Route element={<AppShell />}>
                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="/tickets" element={<TicketsPage />} />

                <Route path="/team" element={<TeamPage />} />

                <Route path="/reports" element={<ReportsPage />} />

                <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
