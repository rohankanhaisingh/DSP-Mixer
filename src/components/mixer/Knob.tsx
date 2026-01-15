import React, { useEffect, useRef, useState } from "react";
import { Ease } from "@babahgee/easings";

export interface KnobProperties {
    min: number;
    max: number;
    step: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
}

export default function Knob({ min, max, step, value, defaultValue, onChange }: KnobProperties) {

    const [internalValue, setInternalValue] = useState<number>(defaultValue ?? min);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? (value as number) : internalValue;

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const startYRef = useRef<number>(0);
    const startValueRef = useRef<number>(currentValue);

    useEffect(function () {
        if (!isControlled && defaultValue !== undefined) setInternalValue(defaultValue);
    }, [defaultValue, isControlled]);

    function updateValue(next: number): void {

        let clamped = Math.min(Math.max(next, min), max);
        const safeStep = step || 1;

        clamped = Math.round(clamped / safeStep) * safeStep;

        if (!isControlled) setInternalValue(clamped);

        onChange?.(clamped);
    }

    function handleDragStart(clientY: number): void {

        setIsDragging(true);

        startYRef.current = clientY;
        startValueRef.current = currentValue;

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
    }

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>): void {
        e.preventDefault();

        if (e.button === 1) {
            resetValuesOnMiddleMouseClick();
            return;
        }

        handleDragStart(e.clientY);
    }

    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>): void {
        e.preventDefault();
        const touch = e.touches[0];
        handleDragStart(touch.clientY);
    }

    function handleMouseMove(e: MouseEvent): void {
        e.preventDefault();
        handleDragMove(e.clientY);
    }

    function handleTouchMove(e: TouchEvent): void {
        e.preventDefault();
        const touch = e.touches[0] ?? e.changedTouches[0];
        if (!touch) return;
        handleDragMove(touch.clientY);
    }

    function handleDragMove(clientY: number): void {

        const deltaY = startYRef.current - clientY;
        const pixelsForFullRange = 150;
        const range = max - min;
        const deltaValue = (deltaY / pixelsForFullRange) * range;
        const next = startValueRef.current + deltaValue;

        updateValue(next);
    }

    function stopDragging(): void {

        setIsDragging(false);

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
    }

    function handleMouseUp(): void {
        stopDragging();
    }

    function handleTouchEnd(): void {
        stopDragging();
    }

    function resetValuesOnMiddleMouseClick(): void {

        Ease(internalValue, defaultValue ?? 0, "easeOutExpo", 350, function (easedValue: number) {
            setInternalValue(easedValue);
            onChange?.(easedValue);
        });
    }

    const normalized: number = (currentValue - min) / (max - min || 1);
    const minAngle: number = 130;
    const maxAngle: number = 410;
    const angle: number = minAngle + normalized * (maxAngle - minAngle);

    return (
        <div
            className={[
                "inline-flex h-[40px] w-[40px] select-none items-center justify-center touch-none cursor-pointer",
                "group"
            ].join(" ")}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <div
                className={[
                    "relative h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-full",
                    "bg-[var(--color-panel)] border border-[var(--color-accent-soft)]",
                    "transition-[box-shadow,background] duration-[150ms]",
                    isDragging ? "bg-[var(--color-panel-active)]" : "group-hover:bg-[var(--color-panel-hover)]"
                ].join(" ")}
            >
                <div
                    className={[
                        "absolute left-1/2 top-[calc(50%-1px)] z-[2] h-[2px]",
                        "bg-[var(--color-accent)] origin-[0%_50%] transition-[width] duration-[150ms]",
                        isDragging ? "w-1/2" : "w-[calc(50%-5px)]"
                    ].join(" ")}
                    style={{ transform: "rotate(" + angle + "deg)" }}
                />

                <div
                    className="absolute inset-0 m-auto h-[6px] w-[6px] rounded-[10px] bg-[var(--color-accent)] z-[1] transition-[width,height] duration-[150ms]"
                />
            </div>
        </div>
    );
}
