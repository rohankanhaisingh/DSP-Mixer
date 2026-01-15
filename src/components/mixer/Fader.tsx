import { useState, useRef, type MouseEvent } from "react";
import { Ease } from "@babahgee/easings";

export interface FaderProperties {
    initialValue?: number;
    maximumValue?: number;
    onChange?: (value: number) => void;
}

export default function Fader({ initialValue, maximumValue, onChange }: FaderProperties) {

    const [internalValue, setInternalValue] = useState<number>(initialValue ?? 100);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [maxValue] = useState<number>(maximumValue ?? 120);

    const bodyRef = useRef<HTMLDivElement>(null);

    function handleThumbMovement(event: MouseEvent<HTMLDivElement>): void {

        if (!isDragging || !bodyRef.current) return;

        const bodyBoundary: DOMRect = bodyRef.current.getBoundingClientRect();

        const bottomOffset: number = bodyBoundary.bottom - event.clientY;

        let ratio: number = bottomOffset / bodyBoundary.height;

        if (ratio < 0) ratio = 0;
        if (ratio > 1) ratio = 1;

        const calculatedInternalValue: number = maxValue * ratio;

        const fixedValue: number = Number(calculatedInternalValue.toFixed(1));

        setInternalValue(fixedValue);
        onChange?.(fixedValue);
    }

    function handleThumbMouseDown(event: MouseEvent<HTMLDivElement>): void {

        event.preventDefault();

        if (event.button !== 1) {
            setIsDragging(true);
            return;
        }

        Ease(internalValue, 100, "easeOutExpo", 1000, function (value: number) {

            const fixedValue: number = Number(value.toFixed(1));

            setInternalValue(fixedValue);
            onChange?.(fixedValue);
        });

        setIsDragging(false);
    }

    function stopDragging(): void {
        setIsDragging(false);
    }

    const displayPercentage: number = Math.max(0, Math.min(100, (internalValue / maxValue) * 100));

    return (
        <div
            className="flex h-[220px] items-center justify-center"
            onMouseMove={handleThumbMovement}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
        >
            <div
                ref={bodyRef}
                className="relative h-full w-[5px] rounded-[5px] bg-[var(--color-panel)] transition-[background] duration-[150ms]"
            >
                <div
                    className="absolute bottom-0 left-0 w-[5px] rounded-[5px] bg-[var(--color-accent)] transition-[background] duration-[150ms]"
                    style={{ height: displayPercentage + "%" }}
                >
                    <div className="absolute inset-0">
                        {/* Value label */}
                        <div
                            className={[
                                "pointer-events-none absolute left-[-21px] top-[-60px] z-[1]",
                                "flex h-[20px] w-[40px] items-center justify-center",
                                "rounded-[5px] p-[5px] text-[var(--color-white)]",
                                "bg-[rgba(0,0,0,0.25)] transition-opacity duration-[150ms]",
                                isDragging ? "opacity-100" : "opacity-0"
                            ].join(" ")}
                        >
                            <span className="text-[12px]">{internalValue}%</span>
                        </div>

                        {/* Thumb */}
                        <div
                            className={[
                                "absolute left-[-7px] top-[-20px] z-[1]",
                                "flex h-[40px] w-[20px] cursor-grab flex-col items-center justify-center gap-[5px]",
                                "rounded-[5px] bg-[var(--color-surface-light)] transition-[background] duration-[150ms]"
                            ].join(" ")}
                            onMouseDown={handleThumbMouseDown}
                        >
                            <div className="h-[2px] w-[10px] bg-[var(--color-accent)] transition-[background] duration-[150ms]" />
                            <div className="h-[2px] w-[10px] bg-[var(--color-accent)] transition-[background] duration-[150ms]" />
                            <div className="h-[2px] w-[10px] bg-[var(--color-accent)] transition-[background] duration-[150ms]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
