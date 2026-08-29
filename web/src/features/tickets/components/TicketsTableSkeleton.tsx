import { Skeleton } from "@/components/ui/skeleton";

export const TicketsTableSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-lg border bg-background">
            <div className="space-y-0">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        className="flex items-center gap-6 border-b px-4 py-4 last:border-b-0"
                        key={index}
                    >
                        <Skeleton className="h-4 w-10" />

                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-2/5" />
                            <Skeleton className="h-3 w-3/5" />
                        </div>

                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                ))}
            </div>
        </div>
    );
};
