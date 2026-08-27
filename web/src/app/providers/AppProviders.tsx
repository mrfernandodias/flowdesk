import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type AppProvidersProps = {
    children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>{children}</TooltipProvider>
        </QueryClientProvider>
    );
}
