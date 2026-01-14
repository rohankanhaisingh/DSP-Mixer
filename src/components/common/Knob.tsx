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

export default function Knob(props: KnobProperties) {
    const min = props.min;
    const max = props.max;
    const step = props.step;
    const value = props.value;
    const defaultValue = props.defaultValue;
    const onChange = props.onChange;

    const [internalValue, setInternalValue] = useState<number>(defaultValue ?? min);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? (value as number) : internalValue;

    const [isDragging, setIsDragging] = useState(false);
    const startYRef = useRef<number>(0);
    const startValueRef = useRef<number>(currentValue);

    useEffect(function () {
        if (!isControlled && defaultValue !== undefined) setInternalValue(defaultValue);
    }, [defaultValue, isControlled]);

    function updateValue(next: number) {

        let clamped = Math.min(Math.max(next, min), max),
            safeStep = step || 1;

        clamped = Math.round(clamped / safeStep) * safeStep;

        if (!isControlled) setInternalValue(clamped);

        if (onChange) onChange(clamped);
    }

    function handleDragStart(clientY: number) {
        setIsDragging(true);

        startYRef.current = clientY;
        startValueRef.current = currentValue;

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
    }

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();

        if (e.button === 1) return resetValuesOnMiddleMouseClick();

        handleDragStart(e.clientY);
    }

    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        e.preventDefault();
        const touch = e.touches[0];
        handleDragStart(touch.clientY);
    }

    function handleMouseMove(e: MouseEvent) {
        e.preventDefault();
        handleDragMove(e.clientY);
    }

    function handleTouchMove(e: TouchEvent) {
        e.preventDefault();
        const touch = e.touches[0] ?? e.changedTouches[0];
        if (!touch) return;
        handleDragMove(touch.clientY);
    }

    function handleDragMove(clientY: number) {
        const deltaY = startYRef.current - clientY;
        const pixelsForFullRange = 150;
        const range = max - min;
        const deltaValue = (deltaY / pixelsForFullRange) * range;
        const next = startValueRef.current + deltaValue;

        updateValue(next);
    }

    function stopDragging() {
        setIsDragging(false);

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
    }

    function handleMouseUp() {
        stopDragging();
    }

    function handleTouchEnd() {
        stopDragging();
    }

    function resetValuesOnMiddleMouseClick() {
        Ease(internalValue, defaultValue ?? 0, "easeOutExpo", 350, function (easedValue: number) {
            setInternalValue(easedValue);
            if (onChange) onChange(easedValue);
        });
    }

    const normalized: number = (currentValue - min) / (max - min || 1);
    const minAngle: number = 130;
    const maxAngle: number = 410;
    const angle: number = minAngle + normalized * (maxAngle - minAngle);

    let rootClassName = "inline-flex h-10 w-10 select-none items-center justify-center touch-none cursor-pointer group";
    if (isDragging) rootClassName += " is-dragging";

    let bodyClassName =
        "relative rounded-full border bg-[const(--color-panel)] border-[const(--color-accent-soft)] " +
        "w-[calc(100%-2px)] h-[calc(100%-2px)] " +
        "transition-[box-shadow,background] duration-150 ease-in-out " +
        "group-hover:bg-[const(--color-panel-hover)]";

    if (isDragging) bodyClassName += " bg-[const(--color-panel-active)]";

    let handleClassName =
        "absolute left-1/2 top-[calc(50%-1px)] z-[2] h-[2px] bg-[const(--color-accent)] " +
        "origin-left transition-[width] duration-150 ease-in-out";

    if (isDragging) {
        handleClassName += " w-1/2";
    } else {
        handleClassName += " w-[calc(50%-5px)]";
    }

    const centerClassName =
        "absolute inset-0 m-auto z-[1] h-[6px] w-[6px] rounded-[10px] bg-[const(--color-accent)] " +
        "transition-[width,height] duration-150 ease-in-out";

    return (
        <div className={rootClassName} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
            <div className={bodyClassName}>
                <div className={centerClassName}></div>
                <div className={handleClassName} style={{ transform: "rotate(" + angle + "deg)" }}></div>
            </div>
        </div>
    );
}
