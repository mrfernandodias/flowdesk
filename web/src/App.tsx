import { AppShell } from "@/app/layouts/AppShell";

function App() {
    return (
        <AppShell>
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Visão geral da operação de atendimento.
                </p>
            </div>
        </AppShell>
    );
}

export default App;
