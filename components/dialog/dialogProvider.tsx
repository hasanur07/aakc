// DialogProvider.tsx
import { useEffect, useState, ReactNode } from "react";
import { dialog } from "./dialog";
import { Button } from "@heroui/button";

export const DialogProvider = () => {
    const [stack, setStack] = useState<ReactNode[]>([]);

    useEffect(() => {
        if (stack.length === 0 && window.history.state?.dialog) {
            window.history.replaceState({}, "");
            document.body.style.overflow = ""; // restore scrolling
        }
        else if (stack.length > 0) {
            document.body.style.overflow = "hidden"; // prevent background scrolling
        }
        dialog._register({
            push: (c: ReactNode) => {
                setStack((prev) => {
                    // push a new history entry
                    window.history.pushState({ dialog: true }, "");
                    return [...prev, c];
                });
            },
            pop: () => {
                setStack((prev) => prev.slice(0, -1));
                if (window.history.state?.dialog) {
                    window.history.back(); // consume one history entry
                }
            },
            popAll: () => {
                setStack([]);
                // go back as many times as dialogs open
                if (window.history.state?.dialog) {
                    window.history.go(-stack.length);
                }
            },
        });

        const handlePopState = () => {
            setStack((prev) => {
                if (prev.length > 0) {
                    return prev.slice(0, -1); // pop top dialog instead of navigating
                }
                return prev;
            });
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [stack.length]);

    return (
        <>
            {/* Render stacked dialogs */}
            {stack.length > 0 && (
                <div className="fixed w-full h-full inset-0 flex items-center justify-center z-[100] top-0 left-0">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg top-0 left-0 opacity-75" onClick={() => dialog.hide()} />
                    {stack.map((content, idx) => (
                        <div key={idx} className="flex flex-col absolute z-10 justify-center items-center min-w-0 p-0 m-0 max-w-full">
                            {content}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};


export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`flex flex-col bg-muted/80 backdrop-blur-2xl rounded-[40px] p-4 md:p-6 w-96 max-w-[90vw] items-center justify-center scale-90 ${className}`}>
            {children}
        </div>
    );
};

export function Dialog({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`flex flex-col bg-background border border-black/25 max-w-full w-screen h-screen rounded-none sm:rounded-3xl sm:h-auto sm:w-[525px] gap-4 p-6 ${className}`}>
            {children}
        </div>
    );
};

export function DialogTitle({ children }: { children: React.ReactNode }) {
    return (
        <h6 className="font-bold text-[18px] mx-10 text-center">
            {children}
        </h6>
    );
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[16px] text-center mt-3 mx-2">
            {children}
        </p>
    );
}

export function DialogActions({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-4 mt-6 w-full flex-wrap">
            {children}
        </div>
    );
}

export function DialogAction({ children, onPress, isPrimary, isDestructive, isFull }: { children: React.ReactNode; onPress: () => void; isPrimary?: boolean; isDestructive?: boolean; isFull?: boolean }) {
    return (
        <Button variant="solid" color={isDestructive ? "danger" : isPrimary ? "success" : "default"} size="lg" className={isFull ? "w-full" : "w-[calc(50%-0.5rem)]"} radius="full" onPress={onPress}>{children}</Button>
    );
}
