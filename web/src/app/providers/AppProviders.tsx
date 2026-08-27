import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

type AppProvidersProps = {
    children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
    return <TooltipProvider>{children}</TooltipProvider>;
}
