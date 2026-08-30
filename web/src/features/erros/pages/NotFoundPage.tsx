import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <div className="max-w-md text-center">
                <p className="text-sm font-medium text-muted-foreground">
                    Erro 404
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                    Página não encontrada
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    O endereço informado não existe ou não está mais disponível.
                </p>

                <Button asChild className="mt-6">
                    <Link to="/">Voltar para o início</Link>
                </Button>
            </div>
        </main>
    );
}
