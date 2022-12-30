import { useState, useEffect, RefObject } from 'react';

export const useResize = (ref: RefObject<HTMLElement>, callback: (size: { width: number, height: number }) => void) => {
    const [dimensions, setDimensions] = useState({
        width: ref.current?.offsetWidth ?? 0,
        height: ref.current?.offsetHeight ?? 0
    });

    useEffect(() => {
        if (ref.current) {
            const element = ref.current;
            const observer = new ResizeObserver(entries => {
                const newDimensions = {
                    width: entries[0].contentRect.width,
                    height: entries[0].contentRect.height
                };
                setDimensions(newDimensions);
                callback(newDimensions);
            });
            observer.observe(element);

            return () => observer.disconnect();
        }
    }, [ref]);

    return dimensions;
}