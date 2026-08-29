import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ticketPriorityOptions } from "@/features/tickets/constants/ticket-options";
import { useCreateTicket } from "@/features/tickets/hooks/use-create-ticket";
import {
    createTicketSchema,
    type CreateTicketData,
} from "@/features/tickets/schemas/create-ticket-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type CreateTicketSheetProps = {
    organizationId: number;
    organizationName: string;
};

export const CreateTicketSheet = ({
    organizationId,
    organizationName,
}: CreateTicketSheetProps) => {
    const [open, setOpen] = useState(false);

    const createTicketMutation = useCreateTicket(organizationId);

    const form = useForm<CreateTicketData>({
        resolver: zodResolver(createTicketSchema),
        defaultValues: {
            subject: "",
            description: "",
            priority: "medium",
        },
    });

    async function handleCreateTicket(data: CreateTicketData) {
        try {
            await createTicketMutation.mutateAsync(data);

            form.reset();
            setOpen(false);
        } catch {}
    }

    function handleOpenChange(nextOpen: boolean) {
        setOpen(nextOpen);

        if (!nextOpen) {
            form.reset();
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button>
                    <Plus className="size-4" />
                    Novo ticket
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
                <SheetHeader>
                    <SheetTitle>Novo ticket</SheetTitle>

                    <SheetDescription>
                        Crie um novo atendimento para {organizationName}
                    </SheetDescription>
                </SheetHeader>

                <form
                    onSubmit={form.handleSubmit(handleCreateTicket)}
                    className="flex flex-1 flex-col gap-6 px-4"
                    noValidate
                >
                    <Field
                        data-invalid={Boolean(form.formState.errors.subject)}
                    >
                        <FieldLabel htmlFor="subject">Assunto</FieldLabel>

                        <Input
                            id="subject"
                            placeholder="Ex.: Erro ao acessar o sistema"
                            aria-invalid={Boolean(
                                form.formState.errors.subject,
                            )}
                            {...form.register("subject")}
                        />

                        {form.formState.errors.subject && (
                            <FieldError
                                errors={[form.formState.errors.subject]}
                            />
                        )}
                    </Field>

                    <Field
                        data-invalid={Boolean(
                            form.formState.errors.description,
                        )}
                    >
                        <FieldLabel htmlFor="description">Descrição</FieldLabel>

                        <Textarea
                            id="description"
                            rows={7}
                            placeholder="Descreva o problema ou solicitação com o máximo de contexto possível."
                            aria-invalid={Boolean(
                                form.formState.errors.description,
                            )}
                            {...form.register("description")}
                        />

                        {form.formState.errors.description && (
                            <FieldError
                                errors={[form.formState.errors.description]}
                            />
                        )}
                    </Field>

                    <Controller
                        name="priority"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Prioridade</FieldLabel>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder="Selecione a prioridade" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {ticketPriorityOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {createTicketMutation.isError && (
                        <p className="text-sm text-destructive">
                            Não foi possível criar o ticket. Tente novamente.
                        </p>
                    )}

                    <SheetFooter className="mt-auto px-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            disabled={createTicketMutation.isPending}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            disabled={createTicketMutation.isPending}
                        >
                            {createTicketMutation.isPending
                                ? "Criando..."
                                : "Criar ticket"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};
