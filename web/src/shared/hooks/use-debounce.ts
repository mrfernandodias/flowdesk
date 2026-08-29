import { useEffect, useState } from "react";

export function useDebounceValue<T>(value: T, delay: number): T {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debounceValue;
}
