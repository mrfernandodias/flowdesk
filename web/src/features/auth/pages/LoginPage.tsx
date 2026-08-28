import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/auth/hooks/use-login";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas/login-schema";

export function LoginPage() {
    const navigate = useNavigate();

    const loginMutation = useLogin();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function handleLogin(data: LoginFormData) {
        try {
            await loginMutation.mutateAsync(data);

            navigate("/dashboard");
        } catch {
            // O erro da mutation está disponível em loginMutation.error.
        }
    }

    const emailError = form.formState.errors.email;
    const passwordError = form.formState.errors.password;

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <div
                        className="
                            mx-auto flex size-11 items-center justify-center
                            rounded-lg bg-slate-950
                            font-semibold text-white
                        "
                    >
                        FD
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                        Entrar no FlowDesk
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Informe suas credenciais para acessar a plataforma.
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(handleLogin)}
                    noValidate
                    className="space-y-4 rounded-xl border bg-background p-6 shadow-sm"
                >
                    <Field data-invalid={Boolean(emailError)}>
                        <FieldLabel htmlFor="email">E-mail</FieldLabel>

                        <Input
                            id="email"
                            type="email"
                            placeholder="voce@empresa.com"
                            autoComplete="email"
                            aria-invalid={Boolean(emailError)}
                            {...form.register("email")}
                        />

                        {emailError && <FieldError errors={[emailError]} />}
                    </Field>

                    <Field data-invalid={Boolean(passwordError)}>
                        <FieldLabel htmlFor="password">Senha</FieldLabel>

                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            aria-invalid={Boolean(passwordError)}
                            {...form.register("password")}
                        />

                        {passwordError && <FieldError errors={[passwordError]} />}
                    </Field>

                    {loginMutation.isError && (
                        <p className="text-sm text-destructive">E-mail ou senha inválidos.</p>
                    )}

                    <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                        {loginMutation.isPending ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </div>
        </main>
    );
}
