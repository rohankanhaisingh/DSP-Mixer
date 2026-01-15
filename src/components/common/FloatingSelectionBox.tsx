import { type ReactNode, useEffect, useState, useRef } from "react";
import { Ease } from "@babahgee/easings";

import Button from "./Button";

export interface FloatingSelectionBoxItem<T> {
    icon: ReactNode;
    label: string;
    data: T;
}

export interface FloatingSelectionBoxProperties<T> {
    items: FloatingSelectionBoxItem<T>[];
    title: string;
    anchor?: HTMLElement;
    onSelect?: (data: any) => void;
    onCancel?: () => void;
}

export default function FloatingSelectionBox<T>({
    title,
    items,
    anchor,
    onCancel,
    onSelect
}: FloatingSelectionBoxProperties<T>) {

    const [selectionBoxHorizontalPosition, setSelectionBoxHorizontalPosition] = useState<number>(20);
    const [selectionBoxVerticalPosition, setSelectionBoxVerticalPostition] = useState<number>(20);

    const [scale, setScale] = useState<number>(0.95);
    const [opacity, setOpacity] = useState<number>(0);

    const selectionBoxRef = useRef<HTMLDivElement>(null);

    useEffect(function () {

        if (!anchor || !selectionBoxRef.current) return;

        const anchorBoundary: DOMRect = anchor.getBoundingClientRect();
        const selectionBoxBoundary: DOMRect = selectionBoxRef.current.getBoundingClientRect();

        const padding = 8;

        let desiredTop = anchorBoundary.top + (anchorBoundary.height / 2) - (selectionBoxBoundary.height / 2);
        let desiredLeft = anchorBoundary.left;

        const maxTop = window.innerHeight - selectionBoxBoundary.height - padding;
        const maxLeft = window.innerWidth - selectionBoxBoundary.width - padding;

        if (desiredTop < padding) desiredTop = padding;
        if (desiredTop > maxTop) desiredTop = maxTop;

        if (desiredLeft < padding) desiredLeft = padding;
        if (desiredLeft > maxLeft) desiredLeft = padding;

        setSelectionBoxVerticalPostition(desiredTop);
        setSelectionBoxHorizontalPosition(desiredLeft);

        Ease(0, 1, "easeOutExpo", 350, function (_scale) {
            setScale(_scale);
        });

        setOpacity(1);

    }, [anchor]);

    return (
        <div className="fixed inset-0 z-10 w-screen h-screen text-[var(--font-size-small)]">
            <div className="absolute inset-0" onClick={onCancel} />
            <div
                ref={selectionBoxRef}
                className="
                    absolute
                    w-[208px]
                    max-h-[45vh]
                    overflow-y-auto
                    rounded-[5px]
                    border
                    shadow-[0_0_10px_rgba(0,0,0,0.25)]
                    bg-[var(--color-surface)]
                    border-[var(--color-surface-light)]
                    transition-[transform,opacity]
                "
                style={{
                    left: selectionBoxHorizontalPosition + "px",
                    top: selectionBoxVerticalPosition + "px",
                    transform: `scale(${scale})`,
                    opacity
                }}
            >
                <div className="flex w-full flex-col gap-5 p-5">
                    <p className="whitespace-nowrap uppercase font-[var(--font-semibold)]">
                        {title}
                    </p>

                    <div className="flex flex-col gap-2.5">
                        {items.map(function (item, index) {
                            return (
                                <Button
                                    key={index}
                                    icon={item.icon}
                                    title={item.label}
                                    text={item.label}
                                    onClick={function () {
                                        onSelect?.(item.data);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
