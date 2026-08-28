import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TicketsPaginationProps = {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
    isFetching: boolean;
};

export const TicketsPagination = ({
    currentPage,
    lastPage,
    onPageChange,
    isFetching,
}: TicketsPaginationProps) => {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
                Página {currentPage} de {lastPage}
            </p>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1 || isFetching}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft className="size-4" />
                    Anterior
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === lastPage || isFetching}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight className="size-4" />
                    Próxima
                </Button>
            </div>
        </div>
    );
};
